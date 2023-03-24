import { Request, Response } from "express";
import { CreateMenuGroupsInput, UpdateMenuGroupsInput, GetMenuGroupsInput, DeleteMenuGroupsInput } from "../../schema/app/menuGroups.schema";
import { createMenuGroups, deleteMenuGroups, findAndUpdateMenuGroups, findMenuGroups, findAllMenuGroups } from "../../service/app/menuGroups.service";
import { findReport } from "../../service/report/report.service";
import ObjectId from 'mongoose'

export async function createMenuGroupsHandler(req: Request<{}, {}, CreateMenuGroupsInput["body"]>, res: Response) {
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
    const menuGroups = await createMenuGroups({ ...body, createdBy: userInfo._id });

    return res.send(menuGroups);
}

export async function updateMenuGroupsHandler(req: Request<UpdateMenuGroupsInput["params"]>, res: Response) {
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

    const menuGroups_Id = req.params._id;
    const menuGroups = await findMenuGroups({ menuGroups_Id })

    if (!menuGroups) {
        return res.sendStatus(404);
    }

    await deleteMenuGroups({ menuGroups_Id });

    return res.sendStatus(200);
}
