import {object, string, boolean, number, TypeOf} from "zod";


const payload = {
    body: object({
        companyDepartmentId: number({
            required_error: "Id do departamento é obrigatório."
        }),
        name: string({
            required_error: "Nome é obrigatório"
        }),
        active: boolean({}),
        departmentReports: string({}).array()
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id do departamento é obrigatório."
        })
    })
};

export const createCompanyDepartmentSchema = object({
    ...payload
});

export const updateCompanyDepartmentSchema = object({
    ...payload,
    ...params
});

export const findCompanyDepartmentSchema = object({
    ...params
});

export const findAllCompanyDepartmentSchema = object({});


export const deleteCompanyDepartmentSchema = object({
    ...params
});




export type CreateCompanyDepartmentInput = TypeOf<typeof createCompanyDepartmentSchema>
export type UpdateCompanyDepartmentInput = TypeOf<typeof updateCompanyDepartmentSchema>
export type GetCompanyDepartmentInput    = TypeOf<typeof findCompanyDepartmentSchema>
export type GetAllCompanyDepartmentInput = TypeOf<typeof findAllCompanyDepartmentSchema>
export type DeleteCompanyDepartmentInput = TypeOf<typeof deleteCompanyDepartmentSchema>