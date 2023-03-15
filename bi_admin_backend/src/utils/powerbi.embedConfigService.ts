// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

//import fetch from "node-fetch";
import * as auth from "./powerbi.authentication";
//import config from "/../../config/config.json";
import * as utils from "./powerbi.utils";
import PowerBiReportDetails from "../models/embedReportConfig";
import EmbedConfig from "../models/embedConfig";
import deafult from "../../config/deafult";
import getAccessToken from "./powerbi.authentication";
import axios from "axios";
import _config from "../../config/deafult";

const config = _config.powerbi;
/**
 * Generate embed token and embed urls for reports
 * @return Details like Embed URL, Access token and Expiry
 */
export async function getEmbedInfo(clientId: string, workspace: string, reportId: string, pbiUsername: string, pbiPassword: string) {
    // Get the Report Embed details
    try {

        // Get report details and embed token
        const embedParams = await getEmbedParamsForSingleReport(clientId, workspace, reportId, pbiUsername, pbiPassword, "");

        if(embedParams){
            return {
                'accessToken': embedParams.embedToken.token,
                'embedUrl': embedParams.reportsDetail,
                'expiry': embedParams.embedToken.expiration,
                'status': 200
            };
        }
        else{
            return {
                'status': 400,
                'error': `Error while retrieving report embed details\r\n - embedParams: ${embedParams}`
            }
        }

    } catch (err: any) {
        return {
            'status': err.status,
            'error': `Error while retrieving report embed details\r\n${err.statusText}\r\nRequestId: \n${err.headers}`
        }
    }
}

/**
 * Get embed params for a single report for a single workspace
 * @param {string} clientId
 * @param {string} workspaceId
 * @param {string} reportId
 * @param {string} pbiUsername
 * @param {string} pbiPassword
 * @param {string} additionalDatasetId - Optional Parameter
 * @return EmbedConfig object
 */
export async function getEmbedParamsForSingleReport(clientId: string, workspaceId: string, reportId: string, pbiUsername: string, pbiPassword: string, additionalDatasetId: string) {

    const reportInGroupApi = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`;
    const headers = await <any>getRequestHeader(pbiUsername, pbiPassword, clientId);

    try{
        // Get report info by calling the PowerBI REST API
        // const result = await fetch(reportInGroupApi, {
        //     method: 'GET',
        //     headers: headers,
        // })
        const result = await axios.get(reportInGroupApi, {
            headers: headers,
            withCredentials: true,
        })

        if (!result) {
            return null;
        }

        let resultJson: any;

        // Convert result in json to retrieve values
        resultJson = result.data;

        // Add report data for embedding
        const reportDetails = new PowerBiReportDetails(resultJson.id, resultJson.name, resultJson.embedUrl);
        const reportEmbedConfig = new EmbedConfig('', '', '');

        // Create mapping for report and Embed URL
        reportEmbedConfig.reportsDetail = [reportDetails];

        // Create list of datasets
        let datasetIds = [resultJson.datasetId];

        // Append additional dataset to the list to achieve dynamic binding later
        if (additionalDatasetId) {
            datasetIds.push(additionalDatasetId);
        }
        // Get Embed token multiple resources
        reportEmbedConfig.embedToken = await getEmbedTokenForSingleReportSingleWorkspace(reportId, datasetIds, workspaceId, pbiUsername, pbiPassword, clientId);
        return reportEmbedConfig;
    }catch(e: any){
        //console.log(e)
        return null
    }
}

/**
 * Get Embed token for single report, multiple datasets, and an optional target workspace
 * @param {string} reportId
 * @param {Array<string>} datasetIds
 * @param {string} targetWorkspaceId - Optional Parameter
 * @return EmbedToken
 */
export async function getEmbedTokenForSingleReportSingleWorkspace(reportId: String, datasetIds: Array<String>, targetWorkspaceId: String, pbiUsername: string, pbiPassword: string, clientId: string) {

    // Add report id in the request
    let formData = {
        'reports': [{
            'id': reportId
        }],
        'datasets': [{}],
        'targetWorkspaces': [{}],
    };

    // Add dataset ids in the request
    formData['datasets'] = [];
    for (const datasetId of datasetIds) {
        formData['datasets'].push({
            'id': datasetId
        })
    }

    // Add targetWorkspace id in the request
    if (targetWorkspaceId) {
        formData['targetWorkspaces'] = [];
        formData['targetWorkspaces'].push({
            'id': targetWorkspaceId
        })
    }

    const embedTokenApi = "https://api.powerbi.com/v1.0/myorg/GenerateToken";
    const headers = await <any>getRequestHeader(pbiUsername, pbiPassword, clientId);

    // Generate Embed token for single report, workspace, and multiple datasets. Refer https://aka.ms/MultiResourceEmbedToken

    var config = {
        method: 'post',
        url: 'https://api.powerbi.com/v1.0/myorg/GenerateToken',
        headers: headers,
        data: JSON.stringify(formData)
    };

    const result = await axios(config)

    if (!result) {
        return null;
    }

    return result.data;
}

/**
 * Get Request header
 * @return Request header with Bearer token
 */
export async function getRequestHeader(pbiUsername: string, pbiPassword: string, clientId: string) {

    // Store authentication token
    let tokenResponse;

    // Store the error thrown while getting authentication token
    let errorResponse;

    // Get the response from the authentication request
    try {
        tokenResponse = await <any>getAccessToken(pbiUsername, pbiPassword, clientId);
    } catch (err: any) {
        if (err.hasOwnProperty('error_description') && err.hasOwnProperty('error')) {
            errorResponse = err.error_description;
        } else {

            // Invalid PowerBI Username provided
            errorResponse = err.toString();
        }
        return {
            'status': 401,
            'error': errorResponse
        };
    }

    // Extract AccessToken from the response
    const token = tokenResponse.accessToken;
    return {
        'Content-Type': "application/json",
        'Authorization': utils.getAuthHeader(token)
    };
}

export default getEmbedInfo;