import {object, string, boolean, number, TypeOf} from "zod";


const payload = {
    body: object({
        companyTypeId: number({
            required_error: "Id do departamento é obrigatório."
        }),
        name: string({
            required_error: "Nome é obrigatório"
        }),
        active: boolean({}),
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id do departamento é obrigatório."
        })
    })
};

export const createCompanyTypeSchema = object({
    ...payload
});

export const updateCompanyTypeSchema = object({
    ...payload,
    ...params
});

export const findCompanyTypeSchema = object({
    ...params
});

export const findAllCompanyTypeSchema = object({});

export const deleteCompanyTypeSchema = object({
    ...params
});

export type CreateCompanyTypeInput = TypeOf<typeof createCompanyTypeSchema>
export type UpdateCompanyTypeInput = TypeOf<typeof updateCompanyTypeSchema>
export type GetCompanyTypeInput    = TypeOf<typeof findCompanyTypeSchema>
export type GetAllCompanyTypeInput = TypeOf<typeof findAllCompanyTypeSchema>
export type DeleteCompanyTypeInput = TypeOf<typeof deleteCompanyTypeSchema>