import { dbResponseTimeHistogram } from "../../utils/metrics";
import NonceGenerator from 'a-nonce-generator';

import config from "../../../config/deafult";
import { C4mDocument, C4mInput } from "../../models/integrations/c4m.model";

import CryptoJS from 'crypto-js'

interface JsonAuthentication {
    consumer_key: string;
    nonce: string;
    signature: string;
    timestamp: number;
    version: string;
}

export default async function getC4mAuth(c4mAuth: C4mInput) {
    const metricsLabels = {
        operation: `executeScript_${c4mAuth.function}`,
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        let ng = new NonceGenerator();
        let nonce = ng.generate();
        let dateTimeNow = new Date().getTime()

        let token = await getBearerToken(c4mAuth, nonce);

        return {
            "nonce": nonce,
            "token": token,
            "timestamp": Math.floor(dateTimeNow / 1000),
        }        
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }

}

async function getBearerToken(c4mAuth: C4mInput, nonce: Number) {

    let dateTimeNow = new Date().getTime()

    let jsonAuth : JsonAuthentication = { 
        consumer_key: c4mAuth.consumerKey,
        nonce: `${nonce}`,
        timestamp: Math.floor(dateTimeNow / 1000),
        version: '1.0',
        signature: ''
    }

    let input = c4mAuth.consumerSecret + c4mAuth.consumerKey + 
                    jsonAuth.nonce + jsonAuth.timestamp + jsonAuth.version + c4mAuth.method.toUpperCase() + c4mAuth.url.toUpperCase()

    jsonAuth.signature = await getSha256Hash(c4mAuth.consumerSecret, input)

    let token = CryptoJS.enc.Utf8.parse(JSON.stringify(jsonAuth));

    return CryptoJS.enc.Base64.stringify(token);
}

async function getSha256Hash(key: string, input: string) {
    return CryptoJS.HmacSHA256(input, key).toString(CryptoJS.enc.Base64);
}