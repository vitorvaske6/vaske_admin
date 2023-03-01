import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CompanyDepartmentModel, { CompanyDepartmentDocument, CompanyDepartmentInput } from "../../models/company/companyDepartment.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";


export async function createCompanyDepartment(input: CompanyDepartmentInput) {
    const metricsLabels = {
        operation: "createCompanyDepartment",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyDepartmentModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findCompanyDepartment(query: FilterQuery<CompanyDepartmentDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findCompanyDepartment",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyDepartmentModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAllCompanyDepartment( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllCompanyDepartment",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyDepartmentModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAndUpdateCompanyDepartment(query: FilterQuery<CompanyDepartmentDocument>, update: UpdateQuery<CompanyDepartmentDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateCompanyDepartment",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyDepartmentModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function deleteCompanyDepartment(query: FilterQuery<CompanyDepartmentDocument>) {
    const metricsLabels = {
        operation: "deleteCompanyDepartment",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await CompanyDepartmentModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}