import { get } from 'lodash'
import { CookieOptions, Request, Response, NextFunction } from "express";
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';
import { accessTokenCookieOptions } from '../controller/session.controller';

const newAccessTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions
}

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken =
        get(req, "cookies.accessToken") ||
        get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    const refreshToken =
        get(req, "cookies.refreshToken") || get(req, "headers.x-refresh"); 

    if (!accessToken) {
        if (refreshToken) {

            const newAccessToken = await reIssueAccessToken({ refreshToken });

            if (!newAccessToken) {
                return next();
            }

            res.setHeader("x-access-token", newAccessToken);
            res.cookie("accessToken", newAccessToken, newAccessTokenCookieOptions);

            const result = verifyJwt(newAccessToken)
            res.locals.user = result.decoded;

            if (!newAccessToken) {
                return next();
            }

            return next();
        }
        else {
            return next();
        }
    }

    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
        res.locals.user = decoded
        return next();
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });
        if (!newAccessToken) {
            return next();
        }

        res.setHeader("x-access-token", newAccessToken);
        res.cookie("accessToken", newAccessToken, newAccessTokenCookieOptions);

        const result = verifyJwt(newAccessToken)
        res.locals.user = result.decoded;

        return next();
    }

    return next();
};

export default deserializeUser;