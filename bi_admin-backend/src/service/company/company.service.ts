import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CompanyModel, { CompanyDocument, CompanyInput } from "../../models/company/company.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";


export async function createCompany(input: CompanyInput) {
    const metricsLabels = {
        operation: "createCompany",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findCompany(query: FilterQuery<CompanyDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findCompany",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAllCompany( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllCompany",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAndUpdateCompany(query: FilterQuery<CompanyDocument>, update: UpdateQuery<CompanyDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateCompany",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function deleteCompany(query: FilterQuery<CompanyDocument>) {
    const metricsLabels = {
        operation: "deleteCompany",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}