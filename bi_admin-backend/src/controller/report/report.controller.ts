import { Request, Response } from "express";
import { CreateReportInput, UpdateReportInput, GetReportInput, DeleteReportInput } from "../../schema/report/report.schema";
import { createReport, deleteReport, findAndUpdateReport, findReport, findAllReport } from "../../service/report/report.service";

export async function createReportHandler(req: Request<{}, {}, CreateReportInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;

    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um report");
    }


    const report = await createReport({ ...body, createdBy: user_Id });

    return res.send(report);
}

export async function updateReportHandler(req: Request<UpdateReportInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const report_Id = req.params._id;
    const update = req.body;
    const report = await findReport({ report_Id })

    if (!report) {
        return res.sendStatus(404);
    }

    const updatedReport = await findAndUpdateReport({ report_Id }, update, { new: true });

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
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const report_Id = req.params._id;
    const report = await findReport({ report_Id })

    if (!report) {
        return res.sendStatus(404);
    }

    await deleteReport({ report_Id });

    return res.sendStatus(200);
}
