import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProfileFunctionModel, { ProfileFunctionDocument, ProfileFunctionInput } from "../../models/profile/profileFunction.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";


export async function createProfileFunction(input: ProfileFunctionInput) {
    const metricsLabels = {
        operation: "createProfileFunction",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileFunctionModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findProfileFunction(query: FilterQuery<ProfileFunctionDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findProfileFunction",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileFunctionModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAndUpdateProfileFunction(query: FilterQuery<ProfileFunctionDocument>, update: UpdateQuery<ProfileFunctionDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateProfileFunction",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileFunctionModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAllProfileFunction( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllProfileFunction",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileFunctionModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function deleteProfileFunction(query: FilterQuery<ProfileFunctionDocument>) {
    const metricsLabels = {
        operation: "deleteProfileFunction",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileFunctionModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}