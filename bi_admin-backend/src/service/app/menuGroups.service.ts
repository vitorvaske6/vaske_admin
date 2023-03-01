import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import MenuGroupsModel, { MenuGroupsDocument, MenuGroupsInput } from "../../models/app/menuGroups.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";

export async function createMenuGroups(input: MenuGroupsInput) {
    const metricsLabels = {
        operation: "createMenuGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuGroupsModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findMenuGroups(query: FilterQuery<MenuGroupsDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findMenuGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuGroupsModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAndUpdateMenuGroups(query: FilterQuery<MenuGroupsDocument>, update: UpdateQuery<MenuGroupsDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateMenuGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuGroupsModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAllMenuGroups( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllMenuGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuGroupsModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function deleteMenuGroups(query: FilterQuery<MenuGroupsDocument>) {
    const metricsLabels = {
        operation: "deleteMenuGroups",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuGroupsModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}