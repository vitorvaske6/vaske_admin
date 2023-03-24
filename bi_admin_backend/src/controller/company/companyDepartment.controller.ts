import { Request, Response } from "express";
import { CreateCompanyDepartmentInput, UpdateCompanyDepartmentInput, GetCompanyDepartmentInput, DeleteCompanyDepartmentInput } from "../../schema/company/companyDepartment.schema";
import { createCompanyDepartment, deleteCompanyDepartment, findAllCompanyDepartment, findAndUpdateCompanyDepartment, findCompanyDepartment } from "../../service/company/companyDepartment.service";

export async function createCompanyDepartmentHandler(req: Request<{}, {}, CreateCompanyDepartmentInput["body"]>, res: Response) {
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
    const companyDepartment = await createCompanyDepartment({ ...body, createdBy: userInfo._id  });

    return res.send(companyDepartment);
}

export async function updateCompanyDepartmentHandler(req: Request<UpdateCompanyDepartmentInput["params"]>, res: Response) {
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

    const companyDepartment_Id = req.params._id;
    const update = req.body;
    const companyDepartment = await findCompanyDepartment({ companyDepartment_Id })

    if (!companyDepartment) {
        return res.sendStatus(404);
    }

    const updatedCompanyDepartment = await findAndUpdateCompanyDepartment({ companyDepartment_Id }, update, { new: true });

    return res.send(updatedCompanyDepartment);

}

export async function findCompanyDepartmentHandler(req: Request<GetCompanyDepartmentInput["params"]>, res: Response) {
    const companyDepartment_Id = req.params._id;
    const companyDepartment = await findCompanyDepartment({companyDepartment_Id});

    if (!companyDepartment) {
        return res.sendStatus(404);
    }

    return res.send(companyDepartment);
}

export async function findAllCompanyDepartmentHandler(req: Request, res: Response) {
    const companyDepartment = await findAllCompanyDepartment({});

    if (!companyDepartment) {
        return res.sendStatus(404);
    }

    return res.send(companyDepartment);
}

export async function deleteCompanyDepartmentHandler(req: Request<DeleteCompanyDepartmentInput["params"]>, res: Response) {
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

    const companyDepartment_Id = req.params._id;
    const companyDepartment = await findCompanyDepartment({ companyDepartment_Id })

    if (!companyDepartment) {
        return res.sendStatus(404);
    }

    await deleteCompanyDepartment({ companyDepartment_Id });

    return res.sendStatus(200);
}
