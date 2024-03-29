import { Request, Response } from "express";
import { CreateProfileTypeInput, UpdateProfileTypeInput, GetProfileTypeInput, DeleteProfileTypeInput } from "../../schema/profile/profileType.schema";
import { createProfileType, deleteProfileType, findAndUpdateProfileType, findProfileType, findAllProfileType } from "../../service/profile/profileType.service";

export async function createProfileTypeHandler(req: Request<{}, {}, CreateProfileTypeInput["body"]>, res: Response) {

    const body = req.body;

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

    const profileType = await createProfileType({ ...body, createdBy: userInfo._id });

    return res.send(profileType);
}

export async function updateProfileTypeHandler(req: Request<UpdateProfileTypeInput["params"]>, res: Response) {
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

    const profileGroup_Id = req.params._id;
    const update = req.body;
    const profileType = await findProfileType({ profileGroup_Id })
 
    if (!profileType) {
        return res.sendStatus(404);
    }

    const updatedProfileType = await findAndUpdateProfileType({ profileGroup_Id }, update, { new: true });

    if(!updatedProfileType){
        return res.status(401).send("Erro ao atualizar o tipo de perfil");
    }
    
    return res.send(updatedProfileType);

}

export async function findProfileTypeHandler(req: Request<GetProfileTypeInput["params"]>, res: Response) {
    const profileGroup_Id = req.params._id;
    const profileType = await findProfileType({profileGroup_Id});

    if (!profileType) {
        return res.sendStatus(404);
    }

    return res.send(profileType);
}

export async function findAllProfileTypeHandler(req: Request, res: Response) {
    const profileType = await findAllProfileType({});

    if (!profileType) {
        return res.sendStatus(404);
    }

    return res.send(profileType);
}

export async function deleteProfileTypeHandler(req: Request<DeleteProfileTypeInput["params"]>, res: Response) {
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
    
    const profileGroup_Id = req.params._id;
    const profileType = await findProfileType({ profileGroup_Id })

    if (!profileType) {
        return res.sendStatus(404);
    }

    const _deleteProfileType = await deleteProfileType({ profileGroup_Id });

    if(!_deleteProfileType){
        return res.status(401).send("Não foi possível excluir o tipo de perfil");
    }

    return res.status(200).send(_deleteProfileType);
}
