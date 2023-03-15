import { Request, Response } from "express";
import { CreateProfileFunctionInput, UpdateProfileFunctionInput, GetProfileFunctionInput, DeleteProfileFunctionInput } from "../../schema/profile/profileFunction.schema";
import { createProfileFunction, deleteProfileFunction, findAndUpdateProfileFunction, findProfileFunction, findAllProfileFunction } from "../../service/profile/profileFunction.service";

export async function createProfileFunctionHandler(req: Request<{}, {}, CreateProfileFunctionInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;
    
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar uma função de perfil");
    }

    const profileFunction = await createProfileFunction({ ...body, createdBy: user_Id  });

    return res.send(profileFunction);
}

export async function updateProfileFunctionHandler(req: Request<UpdateProfileFunctionInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const profileFunction_Id = req.params._id;
    const update = req.body;
    const profileFunction = await findProfileFunction({ profileFunction_Id })

    if (!profileFunction) {
        return res.sendStatus(404);
    }

    const updatedProfileFunction = await findAndUpdateProfileFunction({ profileFunction_Id }, update, { new: true });

    return res.send(updatedProfileFunction);

}

export async function findProfileFunctionHandler(req: Request<GetProfileFunctionInput["params"]>, res: Response) {
    const profileFunction_id = req.params._id;
    const profileFunction = await findProfileFunction({profileFunction_id});

    if (!profileFunction) {
        return res.sendStatus(404);
    }

    return res.send(profileFunction);
}

export async function findAllProfileFunctionHandler(req: Request, res: Response) {
    const profileFunction = await findAllProfileFunction({});

    if (!profileFunction) {
        return res.sendStatus(404);
    }

    return res.send(profileFunction);
}

export async function deleteProfileFunctionHandler(req: Request<DeleteProfileFunctionInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const profileFunction_Id = req.params._id;
    const profileFunction = await findProfileFunction({ profileFunction_Id })

    if (!profileFunction) {
        return res.sendStatus(404);
    }

    await deleteProfileFunction({ profileFunction_Id });

    return res.sendStatus(200);
}
