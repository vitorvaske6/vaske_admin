import {object, string, boolean, TypeOf} from "zod";


const payload = {
    body: object({
        cnpjCpf: string({
            required_error: "CNPJ ou CPF é obrigatório."
        }).min(11, "O CNPJ ou CPF deve ter no mínimo 11 caracteres.").max(14, "O CNPJ ou CPF deve ter no máximo 14 caracteres."),
        corporateName: string({
            required_error: "Razão social é obrigatório"
        }),
        fantasyName: string({
            required_error: "Nome fantasia é obrigatório"
        }),
        active: boolean({}),
        companyDepartments: string({}).array(),
        companyType: string({
            required_error: "Tipo de empresa é obrigatório"
        }),
        companyGroup: string(),
        companyProfiles: string({}).array(),
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id da empresa é obrigatório."
        })
    })
};

export const createCompanySchema = object({
    ...payload
});

export const updateCompanySchema = object({
    ...payload,
    ...params
});

export const findCompanySchema = object({
    ...params
});

export const findAllCompanySchema = object({});

export const deleteCompanySchema = object({
    ...params
});

export type CreateCompanyInput = TypeOf<typeof createCompanySchema>
export type UpdateCompanyInput = TypeOf<typeof updateCompanySchema>
export type GetCompanyInput    = TypeOf<typeof findCompanySchema>
export type GetAllCompanyInput = TypeOf<typeof findAllCompanySchema>
export type DeleteCompanyInput = TypeOf<typeof deleteCompanySchema>