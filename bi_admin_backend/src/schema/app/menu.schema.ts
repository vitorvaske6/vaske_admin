
import {object, string, boolean, TypeOf} from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "Título do menu é obrigatório."
        }).min(3),
        groupEnabled: boolean({
            required_error: "Menu está ativo ou não é obrigatório."
        }),
        groups: string({}).array(),
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id do menu é obrigatório."
        })
    })
};

export const createMenuSchema = object({
    ...payload
});

export const updateMenuSchema = object({
    ...payload,
    ...params
});

export const findMenuSchema = object({
    ...params 
});

export const findAllMenuSchema = object({});

export const deleteMenuSchema = object({
    ...params
});

export type CreateMenuInput = TypeOf<typeof createMenuSchema>
export type UpdateMenuInput = TypeOf<typeof updateMenuSchema>
export type GetMenuInput    = TypeOf<typeof findMenuSchema>
export type GetAllMenuInput = TypeOf<typeof findAllMenuSchema>
export type DeleteMenuInput = TypeOf<typeof deleteMenuSchema>