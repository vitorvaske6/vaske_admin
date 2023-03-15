import { Request, Response } from "express";
import { CreatePageInput, UpdatePageInput, GetPageInput, DeletePageInput } from "../../schema/app/page.schema";
import { createPage, deletePage, findAndUpdatePage, findPage, findAllPage } from "../../service/app/page.service";
import { findReport } from "../../service/report/report.service";

export async function createPageHandler(req: Request<{}, {}, CreatePageInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;

    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de relatório");
    }

    const page = await createPage({ ...body, createdBy: user_Id });

    return res.send(page);
}

export async function updatePageHandler(req: Request<UpdatePageInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const page_Id = req.params._id;
    const update = req.body;
    const page = await findPage({ page_Id })

    if (!page) {
        return res.sendStatus(404);
    }

    const updatedPage = await findAndUpdatePage({ page_Id }, update, { new: true });

    return res.send(updatedPage);

}

export async function findPageHandler(req: Request<GetPageInput["params"]>, res: Response) {
    const page_Id = req.params._id;
    const page = await findPage({page_Id});

    if (!page) {
        return res.sendStatus(404);
    }   

    return res.send(page);
}

export async function findAllPageHandler(req: Request, res: Response) {
    const page = await findAllPage({});

    if (!page) {
        return res.sendStatus(404);
    }

    return res.send(page);
}

export async function deletePageHandler(req: Request<DeletePageInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const page_Id = req.params._id;
    const page = await findPage({ page_Id })

    if (!page) {
        return res.sendStatus(404);
    }

    await deletePage({ page_Id });

    return res.sendStatus(200);
}
