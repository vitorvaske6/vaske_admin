import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProfileGroupModel, { ProfileGroupDocument, ProfileGroupInput } from "../../models/profile/profileGroup.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";


export async function createProfileGroup(input: ProfileGroupInput) {
    const metricsLabels = {
        operation: "createProfileGroup",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileGroupModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findProfileGroup(query: FilterQuery<ProfileGroupDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findProfileGroup",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileGroupModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAndUpdateProfileGroup(query: FilterQuery<ProfileGroupDocument>, update: UpdateQuery<ProfileGroupDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateProfileGroup",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileGroupModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAllProfileGroup( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllProfileGroup",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileGroupModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function deleteProfileGroup(query: FilterQuery<ProfileGroupDocument>) {
    const metricsLabels = {
        operation: "deleteProfileGroup",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileGroupModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}