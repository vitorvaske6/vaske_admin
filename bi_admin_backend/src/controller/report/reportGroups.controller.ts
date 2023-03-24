import { Request, Response } from "express";
import { CreateReportGroupsInput, UpdateReportGroupsInput, GetReportGroupsInput, DeleteReportGroupsInput } from "../../schema/report/reportGroups.schema";
import { createReportGroups, deleteReportGroups, findAndUpdateReportGroups, findReportGroups, findAllReportGroups } from "../../service/report/reportGroups.service";
import { findReport } from "../../service/report/report.service";

export async function createReportGroupsHandler(req: Request<{}, {}, CreateReportGroupsInput["body"]>, res: Response) {
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
    const reportGroups = await createReportGroups({ ...body, createdBy: userInfo._id });

    return res.send(reportGroups);
}

export async function updateReportGroupsHandler(req: Request<UpdateReportGroupsInput["params"]>, res: Response) {
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

    const reportGroups_Id = req.params._id;
    const update = req.body;
    const reportGroups = await findReportGroups({ reportGroups_Id })

    if (!reportGroups) {
        return res.sendStatus(404);
    }

    const updatedReportGroups = await findAndUpdateReportGroups({ reportGroups_Id }, update, { new: true });

    return res.send(updatedReportGroups);

}

export async function findReportGroupsHandler(req: Request<GetReportGroupsInput["params"]>, res: Response) {
    const reportGroups_Id = req.params._id;
    const reportGroups = await findReportGroups({reportGroups_Id});

    if (!reportGroups) {
        return res.sendStatus(404);
    }   

    return res.send(reportGroups);
}

export async function findAllReportGroupsHandler(req: Request, res: Response) {
    const reportGroups = await findAllReportGroups({});

    if (!reportGroups) {
        return res.sendStatus(404);
    }

    return res.send(reportGroups);
}

export async function deleteReportGroupsHandler(req: Request<DeleteReportGroupsInput["params"]>, res: Response) {
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
    
    const reportGroups_Id = req.params._id;
    const reportGroups = await findReportGroups({ reportGroups_Id })

    if (!reportGroups) {
        return res.sendStatus(404);
    }

    await deleteReportGroups({ reportGroups_Id });

    return res.sendStatus(200);
}
