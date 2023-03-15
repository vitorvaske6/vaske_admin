import { CookieOptions, Request, Response } from "express";
import config from "../../config/deafult";
import axios from "axios";
import jwt from "jsonwebtoken";
import {
    createSession,
    findSessions,
    reIssueAccessToken,
    updateSession
} from "../service/session.service";
import { findAndUpdateUser, getGoogleOAuthTokens, validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import { createProfile, findProfile } from "../service/profile/profile.service";
import { findProfileFunction } from "../service/profile/profileFunction.service";
import { findProfileGroup } from "../service/profile/profileGroup.service";
import { findProfileType } from "../service/profile/profileType.service";

export const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
}

const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 year
}


export async function createSessionUserHandler(req: Request, res: Response) {

    const _user = await validatePassword(req.body)

    if (!_user) {
        return res.status(401).send("Invalid email or password");
    }

    const session = await createSession(_user._id, req.get("userAgent") || "");

    const accessToken = signJwt(
        { ..._user, session: session._id },
        { expiresIn: config.accessTokenTimeToExpire } // 15 minutos
    );
    const refreshToken = signJwt(
        { ..._user, session: session._id },
        { expiresIn: config.refreshTokenTimeToExpire } // 1 ano
    );

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const user_Id = res.locals.user._doc._id
    const sessions = await findSessions({ user: user_Id, valid: true })

    return res.send(sessions); 
}

export async function getStayLoggedSessionHandler(req: Request, res: Response) {
    
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
        res.status(404).send("Refresh token not found")
    }

    const accessToken = await reIssueAccessToken({ refreshToken })  

    if(!accessToken){
        res.status(400).send("Refresh token is invalid")
    }

    return res.send(accessToken); 
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    res.cookie("accessToken", null, accessTokenCookieOptions);
    res.cookie("refreshToken", null, refreshTokenCookieOptions);

    return res.sendStatus(200);
}

export async function getGoogleOAuthHandler(req: Request, res: Response) {
    // get the code from qs

    const code = req.query.code as string;

    try{
        // get the id and acces token with the code
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });

        // get the user with tokens
        const googleUser = await getGoogleUser({id_token, access_token});

        if(!googleUser.verified_email){
            res.status(403).send("Conta do google não verificada");
        }

        // upsert the user 
        const user = await findAndUpdateUser({
            login: googleUser.email,
        },{
            email: googleUser.email,
            //name: googleUser.name,
            picture: googleUser.picture,
        },{
            upsert: true,
            new: true,
        })

        if (!user) {
            return res.status(400).send("Invalid user");
        }

        const profileExists = await findProfile({profileUsers: `${user._id}`})

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
                "name": `${googleUser.given_name}`,
                "surname":`${googleUser.family_name}`,
                "active": true,
                "profileFunction": `${profileFunctionDefault._id}`,
                "profileGroups": [`${profileGroupsDefault._id}`],
                "profileType": `${profileTypeDefault._id}`,
                "profileReports": [],
                "profileUsers": [`${user._id}`],
                "profileAppMenus": [],
                "profileAppPages": []
            }
            // creating new profiles every time
            const profile = await createProfile({ ...profileDefault, createdBy: user._id })
    
            if (!profile) {
                return res.status(401).send("Invalid profile");
            }
        }

        // create a session
        const session = await createSession(user._id, req.get("userAgent") || "");

        // create access and refresh tokens
        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.accessTokenTimeToExpire } // 15 minutos
        );
        const refreshToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.refreshTokenTimeToExpire } // 1 ano
        );

        // set cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        // redirect back to client
        res.redirect(`${config.uiServer.host}:${config.uiServer.port}`)


    } catch(e: any) {
        console.log(e, "A autorização via usuário do google falhou");
        return res.redirect(`${config.uiServer.host}:${config.uiServer.port}/oauth/error`);
    }



}


interface GoogleUserResult{
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export async function getGoogleUser({id_token, access_token}: {id_token: string, access_token: string}): Promise<GoogleUserResult>{
    try{
        const res = await axios.get<GoogleUserResult>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers:{
                Authorization: `Bearer ${id_token}`,
            }
        });
    return res.data;
    } catch(e: any){
        console.log(e, "Erro buscando usuário do google");
        throw new Error(e.message);
    }
}