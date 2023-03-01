import { Request, Response } from "express";
import { CreateCompanyTypeInput, UpdateCompanyTypeInput, GetCompanyTypeInput, DeleteCompanyTypeInput } from "../../schema/company/companyType.schema";
import { createCompanyType, deleteCompanyType, findAllCompanyType, findAndUpdateCompanyType, findCompanyType } from "../../service/company/companyType.service";

export async function createCompanyTypeHandler(req: Request<{}, {}, CreateCompanyTypeInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;
    
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um tipo de empresa");
    }

    const companyType = await createCompanyType({ ...body, createdBy: user_Id});

    return res.send(companyType);
}

export async function updateCompanyTypeHandler(req: Request<UpdateCompanyTypeInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const companyType_Id = req.params._id;
    const update = req.body;
    const companyType = await findCompanyType({ companyType_Id })

    if (!companyType) {
        return res.sendStatus(404);
    }
    const updatedCompanyType = await findAndUpdateCompanyType({ companyType_Id }, update, { new: true });

    return res.send(updatedCompanyType);

}

export async function findCompanyTypeHandler(req: Request<GetCompanyTypeInput["params"]>, res: Response) {
    const companyType_Id = req.params._id;
    const companyType = await findCompanyType({companyType_Id});

    if (!companyType) {
        return res.sendStatus(404);
    }

    return res.send(companyType);
}

export async function findAllCompanyTypeHandler(req: Request, res: Response) {
    const companyType = await findAllCompanyType({});

    if (!companyType) {
        return res.sendStatus(404);
    }

    return res.send(companyType);
}

export async function deleteCompanyTypeHandler(req: Request<DeleteCompanyTypeInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const companyType_Id = req.params._id;
    const companyType = await findCompanyType({ companyType_Id })

    if (!companyType) {
        return res.sendStatus(404);
    }

    await deleteCompanyType({ companyType_Id });

    return res.sendStatus(200);
}
