import c from "config";
import { Request, Response } from "express";
import C4mModel from "../../models/integrations/c4m.model";
import { GetC4mAuthInput } from "../../schema/integrations/c4m.schema";
import getC4mAuth from "../../service/integrations/c4m.service";

export async function getC4mAuthHandler(req: Request<GetC4mAuthInput["body"]>, res: Response) {
    let c4mObj = req.body;
    let c4mRes;

    switch (c4mObj.function) {
        case 'C4MAUTH':
            c4mRes = await getC4mAuth(c4mObj);
            
            if (!c4mRes)
                return res.sendStatus(400);
            break;
        default:
            return res.send("Function not found!").status(400);
    }

    return res.send(c4mRes);
}