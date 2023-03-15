import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ReportModel, { ReportDocument, ReportInput } from "../../models/report/report.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";

export async function createReport(input: ReportInput) {
    const metricsLabels = {
        operation: "createReport",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findReport(query: FilterQuery<ReportDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findReport",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAndUpdateReport(query: FilterQuery<ReportDocument>, update: UpdateQuery<ReportDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateReport",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAllReport( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllReport",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function deleteReport(query: FilterQuery<ReportDocument>) {
    const metricsLabels = {
        operation: "deleteReport",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}