import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProfileModel, { ProfileDocument, ProfileInput } from "../../models/profile/profile.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";


export async function createProfile(input: ProfileInput) {
    const metricsLabels = {
        operation: "createProfile",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findProfile(query: FilterQuery<ProfileDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findProfile",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAndUpdateProfile(query: FilterQuery<ProfileDocument>, update: UpdateQuery<ProfileDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateProfile",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAllProfile( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllProfile",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function deleteProfile(query: FilterQuery<ProfileDocument>) {
    const metricsLabels = {
        operation: "deleteProfile",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProfileModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}