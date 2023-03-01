import { Request, Response } from "express";
import { CreateProfileGroupInput, UpdateProfileGroupInput, GetProfileGroupInput, DeleteProfileGroupInput } from "../../schema/profile/profileGroup.schema";
import { createProfileGroup, deleteProfileGroup, findAndUpdateProfileGroup, findProfileGroup, findAllProfileGroup } from "../../service/profile/profileGroup.service";

export async function createProfileGroupHandler(req: Request<{}, {}, CreateProfileGroupInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;
    
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const profileGroup = await createProfileGroup({ ...body, createdBy: user_Id  });

    return res.send(profileGroup);
}

export async function updateProfileGroupHandler(req: Request<UpdateProfileGroupInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;

    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const profileGroup_Id = req.params._id;
    const update = req.body;
    const profileGroup = await findProfileGroup({ profileGroup_Id })

    if (!profileGroup) {
        return res.sendStatus(404);
    }

    const updatedProfileGroup = await findAndUpdateProfileGroup({ profileGroup_Id }, update, { new: true });

    return res.send(updatedProfileGroup);

}

export async function findProfileGroupHandler(req: Request<GetProfileGroupInput["params"]>, res: Response) {
    const profileGroup_Id = req.params._id;
    const profileGroup = await findProfileGroup({profileGroup_Id});

    if (!profileGroup) {
        return res.sendStatus(404);
    }

    return res.send(profileGroup);
}

export async function findAllProfileGroupHandler(req: Request, res: Response) {
    const profileGroup = await findAllProfileGroup({});

    if (!profileGroup) {
        return res.sendStatus(404);
    }

    return res.send(profileGroup);
}

export async function deleteProfileGroupHandler(req: Request<DeleteProfileGroupInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const profileGroup_Id = req.params._id;
    const profileGroup = await findProfileGroup({ profileGroup_Id })

    if (!profileGroup) {
        return res.sendStatus(404);
    }

    await deleteProfileGroup({ profileGroup_Id });

    return res.sendStatus(200);
}
