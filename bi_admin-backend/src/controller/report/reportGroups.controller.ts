import { Request, Response } from "express";
import { CreateReportGroupsInput, UpdateReportGroupsInput, GetReportGroupsInput, DeleteReportGroupsInput } from "../../schema/report/reportGroups.schema";
import { createReportGroups, deleteReportGroups, findAndUpdateReportGroups, findReportGroups, findAllReportGroups } from "../../service/report/reportGroups.service";
import { findReport } from "../../service/report/report.service";

export async function createReportGroupsHandler(req: Request<{}, {}, CreateReportGroupsInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;

    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de relatório");
    }

    const reportGroups = await createReportGroups({ ...body, createdBy: user_Id });

    return res.send(reportGroups);
}

export async function updateReportGroupsHandler(req: Request<UpdateReportGroupsInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
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
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const reportGroups_Id = req.params._id;
    const reportGroups = await findReportGroups({ reportGroups_Id })

    if (!reportGroups) {
        return res.sendStatus(404);
    }

    await deleteReportGroups({ reportGroups_Id });

    return res.sendStatus(200);
}
