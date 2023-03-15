import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CompanyTypeModel, { CompanyTypeDocument, CompanyTypeInput } from "../../models/company/companyType.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";


export async function createCompanyType(input: CompanyTypeInput) {
    const metricsLabels = {
        operation: "createCompanyType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyTypeModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findCompanyType(query: FilterQuery<CompanyTypeDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findCompanyType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyTypeModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAndUpdateCompanyType(query: FilterQuery<CompanyTypeDocument>, update: UpdateQuery<CompanyTypeDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateCompanyType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyTypeModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAllCompanyType( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllCompanyType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyTypeModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function deleteCompanyType(query: FilterQuery<CompanyTypeDocument>) {
    const metricsLabels = {
        operation: "deleteCompanyType",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyTypeModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}