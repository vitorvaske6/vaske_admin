import { Request, Response } from "express";
import { CreateMenuInput, UpdateMenuInput, GetMenuInput, DeleteMenuInput } from "../../schema/app/menu.schema";
import { createMenu, deleteMenu, findAndUpdateMenu, findMenu, findAllMenu } from "../../service/app/menu.service";
import { findReport } from "../../service/report/report.service";

export async function createMenuHandler(req: Request<{}, {}, CreateMenuInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;

    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de relatório");
    }

    const menu = await createMenu({ ...body, createdBy: user_Id });

    return res.send(menu);
}

export async function updateMenuHandler(req: Request<UpdateMenuInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
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
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const menu_Id = req.params._id;
    const menu = await findMenu({ menu_Id })

    if (!menu) {
        return res.sendStatus(404);
    }

    await deleteMenu({ menu_Id });

    return res.sendStatus(200);
}
