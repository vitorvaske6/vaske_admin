import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import MenuModel, { MenuDocument, MenuInput } from "../../models/app/menu.model";
import { dbResponseTimeHistogram } from "../../utils/metrics";

export async function createMenu(input: MenuInput) {
    const metricsLabels = {
        operation: "createMenu",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findMenu(query: FilterQuery<MenuDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findMenu",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAndUpdateMenu(query: FilterQuery<MenuDocument>, update: UpdateQuery<MenuDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateMenu",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAllMenu( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllMenu",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function deleteMenu(query: FilterQuery<MenuDocument>) {
    const metricsLabels = {
        operation: "deleteMenu",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await MenuModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}