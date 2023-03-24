import { Request, Response } from "express";
import { CreateProfileInput, UpdateProfileInput, GetProfileInput, DeleteProfileInput } from "../../schema/profile/profile.schema";
import { createProfile, deleteProfile, findAndUpdateProfile, findProfile, findAllProfile } from "../../service/profile/profile.service";

export async function createProfileHandler(req: Request<{}, {}, CreateProfileInput["body"]>, res: Response) {
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
    const profile = await createProfile({ ...body, createdBy: userInfo._id  });

    return res.send(profile);
}

export async function updateProfileHandler(req: Request<UpdateProfileInput["params"]>, res: Response) {
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

    const profile_Id = req.params._id;
    const update = req.body;
    const profile = await findProfile({ profile_Id })

    if (!profile) {
        return res.sendStatus(404);
    } 

    const updatedProfile = await findAndUpdateProfile({ profile_Id }, update, { new: true });

    return res.send(updatedProfile);

}

export async function findProfileHandler(req: Request<GetProfileInput["params"]>, res: Response) {
    const profile_Id = req.params._id;
    const profile = await findProfile({profile_Id});

    if (!profile) {
        return res.sendStatus(404);
    }

    return res.send(profile);
}

export async function findAllProfileHandler(req: Request, res: Response) {
    const profile = await findAllProfile({});

    if (!profile) {
        return res.sendStatus(404);
    }

    return res.send(profile);
}

export async function deleteProfileHandler(req: Request<DeleteProfileInput["params"]>, res: Response) {
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
    

    const profile_Id = req.params._id;
    const profile = await findProfile({ profile_Id })

    if (!profile) {
        return res.sendStatus(404);
    }

    await deleteProfile({ profile_Id });

    return res.sendStatus(200);
}
