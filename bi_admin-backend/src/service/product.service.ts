import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../models/product.model";
import { dbResponseTimeHistogram } from "../utils/metrics";


export async function createProduct(input: ProductInput) {
    const metricsLabels = {
        operation: "createProduct",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try{
        const result = await ProductModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result
    } catch(e: any){
        timer({...metricsLabels, success: "false"}); 
        throw e
    }

}

export async function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findProduct",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProductModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }

}

export async function findAndUpdateProduct(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateProduct",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProductModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAllProduct( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllProduct",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProductModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    const metricsLabels = {
        operation: "deleteProduct",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ProductModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}