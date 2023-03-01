import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProfileTypeModel, { ProfileTypeDocument, ProfileTypeInput } from "../../models/profile/profileType.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";


export async function createProfileType(input: ProfileTypeInput) {
    const metricsLabels = {
        operation: "createProfileType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileTypeModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        return null;
    } 
}

export async function findProfileType(query: FilterQuery<ProfileTypeDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findProfileType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileTypeModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        return null;
    } 
}

export async function findAndUpdateProfileType(query: FilterQuery<ProfileTypeDocument>, update: UpdateQuery<ProfileTypeDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateProfileType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileTypeModel.findByIdAndUpdate(query.profileGroup_Id, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        console.error(e)
        return null;
    } 
}

export async function findAllProfileType( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllProfileType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileTypeModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        return null;
    } 
}

export async function deleteProfileType(query: FilterQuery<ProfileTypeDocument>) {
    const metricsLabels = {
        operation: "deleteProfileType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileTypeModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        return null;
    } 
}