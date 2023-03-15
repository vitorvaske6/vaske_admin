import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ReportGroupsModel, { ReportGroupsDocument, ReportGroupsInput } from "../../models/report/reportGroups.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";

export async function createReportGroups(input: ReportGroupsInput) {
    const metricsLabels = {
        operation: "createReportGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportGroupsModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findReportGroups(query: FilterQuery<ReportGroupsDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findReportGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportGroupsModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAndUpdateReportGroups(query: FilterQuery<ReportGroupsDocument>, update: UpdateQuery<ReportGroupsDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateReportGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportGroupsModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAllReportGroups( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllReportGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportGroupsModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function deleteReportGroups(query: FilterQuery<ReportGroupsDocument>) {
    const metricsLabels = {
        operation: "deleteReportGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ReportGroupsModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}