import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from "../service/user.service";
import { createProfile, findProfile } from "../service/profile/profile.service";
import logger from "../utils/logger";
import { findProfileFunction } from "../service/profile/profileFunction.service";
import { findProfileGroup } from "../service/profile/profileGroup.service";
import { ObjectId } from "mongodb";
import { findProfileType } from "../service/profile/profileType.service";
import { findCompany } from "../service/company/company.service";
import { CreateProfileInput } from '../schema/profile/profile.schema';

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        const result = await createUser(req.body)

        const profileExists = await findProfile({profileUsers: `${result._id}`})

        if(!profileExists){

            const profileFunctionDefault = await findProfileFunction({name: `Nenhum`})
            const profileGroupsDefault = await findProfileGroup({name: `Nenhum`})
            const profileTypeDefault = await findProfileType({name: `Nenhum`})
            //const profileAppMenuDefault = await findProfileFunction({profileUsers: `Nenhum`})
            //const profileAppPagesDefault = await findProfileFunction({profileUsers: `Nenhum`})

            if(!profileFunctionDefault) return res.status(401).send("Invalid default profile function");
            if(!profileGroupsDefault) return res.status(401).send("Invalid default profile group");
            if(!profileTypeDefault) return res.status(401).send("Invalid default profile type");

            const profileDefault = {
                "name": `${result.login}`,
                "surname":`${result.login}`,
                "active": true,
                "profileFunction": `${profileFunctionDefault._id}`,
                "profileGroups": [`${profileGroupsDefault._id}`],
                "profileType": `${profileTypeDefault._id}`,
                "profileReports": [],
                "profileUsers": [`${result._id}`],
                "profileAppMenus": [],
                "profileAppPages": []
            }
            // creating new profiles every time
            const profile = await createProfile({ ...profileDefault, createdBy: result._id })
    
            if (!profile) {
                return res.status(401).send("Invalid profile");
            }
        }

        return res.send(result);
    } catch (e: any) {
        return res.status(409).send(e.message)
    }
}

export async function getCurrentUserHandler(
    req: Request,
    res: Response
) {
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

    const profileFind = { profileUsers: { $all: [`${userInfo._id}`] }}
    const profile = await findProfile(profileFind)

    if (!profile){
        return res.status(404).send("Profile not found")
    }

    const profileFunctionFind = {'_id': new ObjectId(`${profile.profileFunction}`)}
    const functionInfo = await findProfileFunction(profileFunctionFind)
    
    if(!functionInfo){
        return res.status(404).send("Profile function not found") 
    }

    const profileFunctionInfo = functionInfo.name
    let profileGroupsInfo = []

    for(var i = 0; i <= profile.profileGroups.length - 1; i++){

        const profileGroupsFind = {_id: `${profile.profileGroups[i]}`}

        if(profileGroupsFind){
            const groupsInfo = await findProfileGroup(profileGroupsFind)

            if(!groupsInfo){
                return res.status(404).send("Profile group not found")
            }

            profileGroupsInfo[i] = `${groupsInfo.name}` 
        }
    }
     
    const profileTypeFind = {_id: new ObjectId(`${profile.profileType}`)}
    const typeInfo = await findProfileType(profileTypeFind)

    if(!typeInfo){
        return res.status(404).send("Profile type not found -")
    }

    const profileTypeInfo = typeInfo.name 

    const profileInfo = {
        ...profile,
        profileFunction: profileFunctionInfo,
        profileGroups: profileGroupsInfo,
        profileType: profileTypeInfo
    }

    const profileCompanyInfoFind = {"_idProfile": profile._id}
    const profileCompanyInfo = await findCompany(profileCompanyInfoFind)

    return res.send({ userInfo, profileInfo, profileCompanyInfo });

}