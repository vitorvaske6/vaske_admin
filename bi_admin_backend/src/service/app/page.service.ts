import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PageModel, { PageDocument, PageInput } from "../../models/app/page.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";

export async function createPage(input: PageInput) {
    const metricsLabels = {
        operation: "createPage",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await PageModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findPage(query: FilterQuery<PageDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findPage",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await PageModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAndUpdatePage(query: FilterQuery<PageDocument>, update: UpdateQuery<PageDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdatePage",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await PageModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAllPage( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllPage",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await PageModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function deletePage(query: FilterQuery<PageDocument>) {
    const metricsLabels = {
        operation: "deletePage",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await PageModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}