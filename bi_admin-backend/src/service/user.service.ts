import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import qs from "qs"
import config from "../../config/deafult"
import axios from "axios"
import log from '../utils/logger';
import { dbResponseTimeHistogram } from "../utils/metrics";


export async function createUser(input: DocumentDefinition<UserInput>) {
    const metricsLabels = {
        operation: "createUser",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const user = await UserModel.create(input);
        timer({...metricsLabels, success: "true"});
        return omit(user.toJSON(), "password");
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function validatePassword({user, password}: {user: string; password: string}) {
    const metricsLabels = {
        operation: "validatePassword",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const userSearch = await UserModel.findOne({user});
        if(!userSearch){
            return null;
        }

        const isValid = await userSearch.comparePassword(password);
        if(!isValid) {
            return null;
        }

        timer({...metricsLabels, success: "true"});
        return userSearch;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }

}

export async function findUser(query: FilterQuery<UserDocument>){
    const metricsLabels = {
        operation: "findUser",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await UserModel.findOne(query).lean();
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAllUser(options: QueryOptions = { lean: true }){
    const metricsLabels = {
        operation: "findAllUser",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await UserModel.find({}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

interface GoogleTokensResult{
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export async function getGoogleOAuthTokens({code}: {code:string}): Promise<GoogleTokensResult>{
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: config.google.clientId,
        client_secret: config.google.clientSecret,
        redirect_uri: config.google.redirectUrl,
        grant_type: "authorization_code",
    };

    try{
        const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values),{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        });

        return res.data;
    }catch(e: any){
        throw new Error(e.message);
    }
}

export async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument> , options: QueryOptions = {}){
    const metricsLabels = {
        operation: "findAndUpdateUser",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await UserModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
    
}