import { Request, Response } from "express";
import { CreateMenuInput, UpdateMenuInput, GetMenuInput, DeleteMenuInput } from "../../schema/app/menu.schema";
import { createMenu, deleteMenu, findAndUpdateMenu, findMenu, findAllMenu } from "../../service/app/menu.service";
import { findReport } from "../../service/report/report.service";

export async function createMenuHandler(req: Request<{}, {}, CreateMenuInput["body"]>, res: Response) {
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

    const menu = await createMenu({ ...body, createdBy: userInfo._id });

    return res.send(menu);
}

export async function updateMenuHandler(req: Request<UpdateMenuInput["params"]>, res: Response) {
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

    const menu_Id = req.params._id;
    const update = req.body;
    const menu = await findMenu({ menu_Id })

    if (!menu) {
        return res.sendStatus(404);
    }

    const updatedMenu = await findAndUpdateMenu({ menu_Id }, update, { new: true });

    return res.send(updatedMenu);

}

export async function findMenuHandler(req: Request<GetMenuInput["params"]>, res: Response) {
    const menu_Id = req.params._id;
    const menu = await findMenu({menu_Id});

    if (!menu) {
        return res.sendStatus(404);
    }   

    return res.send(menu);
}

export async function findAllMenuHandler(req: Request, res: Response) {
    const menu = await findAllMenu({});

    if (!menu) {
        return res.sendStatus(404);
    }

    return res.send(menu);
}

export async function deleteMenuHandler(req: Request<DeleteMenuInput["params"]>, res: Response) {
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

    const menu_Id = req.params._id;
    const menu = await findMenu({ menu_Id })

    if (!menu) {
        return res.sendStatus(404);
    }

    await deleteMenu({ menu_Id });

    return res.sendStatus(200);
}
