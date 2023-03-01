// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------
import _config from "../../config/deafult";

const config = _config.powerbi;

import * as msal from "@azure/msal-node";


export const getAccessToken = async function (pbiUsername: string, pbiPassword: string, clientId: string) {
    // Create a config variable that store credentials from config.json
    // Use MSAL.js for authentication
    //const msal = require("@azure/msal-node");

    const msalConfig = {
        auth: {
            clientId: clientId,
            authority: `${config.authorityUrl}${config.tenantId}`,
        }
    };

    // Check for the MasterUser Authentication
    if (config.authenticationMode.toLowerCase() === "masteruser") {
        const clientApplication = new msal.PublicClientApplication(msalConfig);

        const usernamePasswordRequest = {
            scopes: [config.scopeBase],
            username: pbiUsername,
            password: pbiPassword
        };

        return clientApplication.acquireTokenByUsernamePassword(usernamePasswordRequest);

    };

}

export default getAccessToken