import { Request, Response } from "express";
import { CreateMenuGroupsInput, UpdateMenuGroupsInput, GetMenuGroupsInput, DeleteMenuGroupsInput } from "../../schema/app/menuGroups.schema";
import { createMenuGroups, deleteMenuGroups, findAndUpdateMenuGroups, findMenuGroups, findAllMenuGroups } from "../../service/app/menuGroups.service";
import { findReport } from "../../service/report/report.service";
import ObjectId from 'mongoose'

export async function createMenuGroupsHandler(req: Request<{}, {}, CreateMenuGroupsInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;

    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de relatório");
    }

    const menuGroups = await createMenuGroups({ ...body, createdBy: user_Id });

    return res.send(menuGroups);
}

export async function updateMenuGroupsHandler(req: Request<UpdateMenuGroupsInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const menuGroups_Id = req.params._id;
    const update = req.body;
    const menuGroups = await findMenuGroups({ menuGroups_Id })

    if (!menuGroups) {
        return res.sendStatus(404);
    }

    const updatedMenuGroups = await findAndUpdateMenuGroups({ menuGroups_Id }, update, { new: true });

    return res.send(updatedMenuGroups);

}

export async function findMenuGroupsHandler(req: Request<GetMenuGroupsInput["params"]>, res: Response) {
    const menuGroups_Id = req.params._id;
    const menuGroups = await findMenuGroups({menuGroups_Id});

    if (!menuGroups) {
        return res.sendStatus(404);
    }   

    return res.send(menuGroups);
}

export async function findAllMenuGroupsHandler(req: Request, res: Response) {
    const menuGroups = await findAllMenuGroups({});

    if (!menuGroups) {
        return res.sendStatus(404);
    }

    return res.send(menuGroups);
}

export async function deleteMenuGroupsHandler(req: Request<DeleteMenuGroupsInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const menuGroups_Id = req.params._id;
    const menuGroups = await findMenuGroups({ menuGroups_Id })

    if (!menuGroups) {
        return res.sendStatus(404);
    }

    await deleteMenuGroups({ menuGroups_Id });

    return res.sendStatus(200);
}
