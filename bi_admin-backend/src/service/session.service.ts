import { get } from "lodash";
import config from "../../config/deafult";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import { dbResponseTimeHistogram } from "../utils/metrics";


export async function  createSession(user_Id: string, userAgent: string) {
    //const session = await SessionModel.create({ user: user_Id, userAgent })
    
    const metricsLabels = {
        operation: "createSession",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await SessionModel.create({ user: user_Id, userAgent })
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    const metricsLabels = {
        operation: "findSessions",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await SessionModel.find(query).lean();
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    const metricsLabels = {
        operation: "updateSession",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await SessionModel.updateOne(query, update)
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const metricsLabels = {
        operation: "reIssueAccessToken",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {

        const { decoded } = verifyJwt(refreshToken);
        if (!decoded || !get(decoded, 'session')){
            return null;
        } 

        const session = await SessionModel.findById(get(decoded, "session"));
        if(!session || !session.valid) { 
            return null;
        } 

        const user = await findUser({_id: session.user});
        if(!user) {
            return null;
        } 

        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.accessTokenTimeToExpire } // 15 minutos
        );

        if(!accessToken){
            return null;
        }

        timer({...metricsLabels, success: "true"});
        return accessToken;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 

}