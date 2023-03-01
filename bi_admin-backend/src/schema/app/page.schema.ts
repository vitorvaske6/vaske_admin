
import {object, string, boolean, TypeOf} from "zod";

const payload = {
    body: object({
        name: string({
            required_error: "Nome da página é obrigatório."
        }).min(3),
        page: string({
            required_error: "Página de redirecionamento é obrigatório."
        }).min(3),
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id do menu é obrigatório."
        })
    })
};

export const createPageSchema = object({
    ...payload
});

export const updatePageSchema = object({
    ...payload,
    ...params
});

export const findPageSchema = object({
    ...params
});

export const findAllPageSchema = object({});

export const deletePageSchema = object({
    ...params
});

export type CreatePageInput = TypeOf<typeof createPageSchema>
export type UpdatePageInput = TypeOf<typeof updatePageSchema>
export type GetPageInput    = TypeOf<typeof findPageSchema>
export type GetAllPageInput = TypeOf<typeof findAllPageSchema>
export type DeletePageInput = TypeOf<typeof deletePageSchema>