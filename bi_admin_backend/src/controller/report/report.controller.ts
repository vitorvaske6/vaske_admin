import { Request, Response } from "express";
import { CreateReportInput, UpdateReportInput, GetReportInput, DeleteReportInput } from "../../schema/report/report.schema";
import { createReport, deleteReport, findAndUpdateReport, findReport, findAllReport } from "../../service/report/report.service";

export async function createReportHandler(req: Request<{}, {}, CreateReportInput["body"]>, res: Response) {
    if(!res.locals.user) {
        return res.status(404).send("User not found")
    }  

    let userInfo

    if(res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user._doc
    }
        
    if (!res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user
    }
        
    if(!userInfo){
        return res.status(403).send("Necessário um usuário para criar uma empresa.");
    }

    const body = req.body; 
    const report = await createReport({ ...body, createdBy: userInfo._id });

    return res.send(report);
}

export async function updateReportHandler(req: Request<UpdateReportInput["params"]>, res: Response) {
    if(!res.locals.user) {
        return res.status(404).send("User not found")
    }  

    let userInfo

    if(res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user._doc
    }
        
    if (!res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user
    }
        
    if(!userInfo){
        return res.status(403).send("Necessário um usuário para criar uma empresa.");
    }

    const report_Id = req.params._id;
    const update = req.body;

    // if(update._id){
    //     delete update._id
    // }

    const report = await findReport({ _id: report_Id })

    if (!report) {
        return res.sendStatus(404);
    }

    const updatedReport = await findAndUpdateReport({ _id: report_Id }, update, { new: false });

    return res.send(updatedReport);

}

export async function findReportHandler(req: Request<GetReportInput["params"]>, res: Response) {
    const report_Id = req.params._id;
    const report = await findReport({report_Id});

    if (!report) {
        return res.sendStatus(404);
    }

    return res.send(report);
}

export async function findAllReportHandler(req: Request, res: Response) {
    const report = await findAllReport({});

    if (!report) {
        return res.sendStatus(404);
    }

    return res.send(report);
}

export async function deleteReportHandler(req: Request<DeleteReportInput["params"]>, res: Response) {
    if(!res.locals.user) {
        return res.status(404).send("User not found")
    }  

    let userInfo

    if(res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user._doc
    }
        
    if (!res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user
    }
        
    if(!userInfo){
        return res.status(403).send("Necessário um usuário para criar uma empresa.");
    }
    
    const report_Id = req.params._id;
    const report = await findReport({ report_Id })

    if (!report) {
        return res.sendStatus(404);
    }

    await deleteReport({ report_Id });

    return res.sendStatus(200);
}
