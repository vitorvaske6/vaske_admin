import { Request, Response } from "express";
import { CreateReportInput, UpdateReportInput, GetReportInput, DeleteReportInput } from "../schema/report/report.schema";
import { createReport, deleteReport, findAndUpdateReport, findReport, findAllReport } from "../service/report/report.service";
import validateConfig from "../utils/powerbi.utils";
import getEmbedInfo from "../utils/powerbi.embedConfigService";
import { GetPowerBiInput } from "../schema/powerBi.schema";


export async function getEmbeddedInfoHandler(req: Request<GetPowerBiInput["body"]>, res: Response) {
    const clientId = req.body.clientId;
    const workspace = req.body.workspace;
    const reportId = req.body.reportId;
    const pbiUsername = req.body.pbiUsername;
    const pbiPassword = req.body.pbiPassword;

    let configCheckResult;
    // Validate whether all the required configurations are provided in config.json
    //configCheckResult = validateConfig();
//
    //if (configCheckResult) {
    //    return res.status(400).send({
    //        "error": configCheckResult
    //    });
    //}
    // Get the details like Embed URL, Access token and Expiry
    let result = await getEmbedInfo(clientId, workspace, reportId, pbiUsername, pbiPassword);

    // result.status specified the statusCode that will be sent along with the result object

    return res.status(result.status).send(result);
}

