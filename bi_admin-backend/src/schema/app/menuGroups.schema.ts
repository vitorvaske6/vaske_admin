
import {object, string, boolean, TypeOf} from "zod";

const payload = {
    body: object({
        groupTitle: string({
            required_error: "Título do grupo é obrigatório."
        }),
        links: string({}).array()
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id do grupo de menus é obrigatório."
        })
    })
};

export const createMenuGroupsSchema = object({
    ...payload
});

export const updateMenuGroupsSchema = object({
    ...payload,
    ...params
});

export const findMenuGroupsSchema = object({
    ...params
});

export const findAllMenuGroupsSchema = object({});

export const deleteMenuGroupsSchema = object({
    ...params
});

export type CreateMenuGroupsInput = TypeOf<typeof createMenuGroupsSchema>
export type UpdateMenuGroupsInput = TypeOf<typeof updateMenuGroupsSchema>
export type GetMenuGroupsInput    = TypeOf<typeof findMenuGroupsSchema>
export type GetAllMenuGroupsInput = TypeOf<typeof findAllMenuGroupsSchema>
export type DeleteMenuGroupsInput = TypeOf<typeof deleteMenuGroupsSchema>