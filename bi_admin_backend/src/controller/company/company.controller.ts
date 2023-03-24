import { Request, Response } from "express";
import { CreateCompanyInput, UpdateCompanyInput, GetCompanyInput, DeleteCompanyInput } from "../../schema/company/company.schema";
import { createCompany, deleteCompany, findAllCompany, findAndUpdateCompany, findCompany } from "../../service/company/company.service";

export async function createCompanyHandler(req: Request<{}, {}, CreateCompanyInput["body"]>, res: Response) {
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
    const company = await createCompany({ ...body, createdBy: userInfo._id });

    return res.send(company);
}

export async function updateCompanyHandler(req: Request<UpdateCompanyInput["params"]>, res: Response) {
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

    const company_Id = req.params._id;
    const update = req.body;
    const company = await findCompany({ company_Id })

    if (!company) {
        return res.sendStatus(404);
    }

    const updatedCompany = await findAndUpdateCompany({ company_Id }, update, { new: true });

    return res.send(updatedCompany);

}

export async function findCompanyHandler(req: Request<GetCompanyInput["params"]>, res: Response) {
    const company_Id = req.params._id;

    const company = await findCompany({company_Id});

    if (!company) {
        return res.sendStatus(404);
    }

    return res.send(company);
}

export async function findAllCompanyHandler(req: Request, res: Response) {
    const company = await findAllCompany({});

    if (!company) {
        return res.sendStatus(404);
    }

    return res.send(company);
}

export async function deleteCompanyHandler(req: Request<DeleteCompanyInput["params"]>, res: Response) {
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

    const company_Id = req.params._id;
    const company = await findCompany({ company_Id })

    if (!company) {
        return res.sendStatus(404);
    }

    await deleteCompany({ company_Id });

    return res.sendStatus(200);
}
