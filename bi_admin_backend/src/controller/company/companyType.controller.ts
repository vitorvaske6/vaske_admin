import { Request, Response } from "express";
import { CreateCompanyTypeInput, UpdateCompanyTypeInput, GetCompanyTypeInput, DeleteCompanyTypeInput } from "../../schema/company/companyType.schema";
import { createCompanyType, deleteCompanyType, findAllCompanyType, findAndUpdateCompanyType, findCompanyType } from "../../service/company/companyType.service";

export async function createCompanyTypeHandler(req: Request<{}, {}, CreateCompanyTypeInput["body"]>, res: Response) {
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
    const companyType = await createCompanyType({ ...body, createdBy: userInfo._id});

    return res.send(companyType);
}

export async function updateCompanyTypeHandler(req: Request<UpdateCompanyTypeInput["params"]>, res: Response) {
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
    
    const companyType_Id = req.params._id;
    const companyType = await findCompanyType({ companyType_Id })

    if (!companyType) {
        return res.sendStatus(404);
    }

    await deleteCompanyType({ companyType_Id });

    return res.sendStatus(200);
}
