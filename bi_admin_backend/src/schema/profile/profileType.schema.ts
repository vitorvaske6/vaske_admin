import {object, string, number, boolean, TypeOf} from "zod";


const payload = {
    body: object({
        profileTypeId: number({
            required_error: "Id do tipo é obrigatório."
        }),
        name: string({
            required_error: "Nome é obrigatório"
        }), 
        active: boolean({}), 
    })
};

const updatePayload = {
    body: object({
        name: string({
            required_error: "Nome é obrigatório"
        }), 
        active: boolean({}), 
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id do relatório é obrigatório."
        })
    })
};

export const createProfileTypeSchema = object({
    ...payload
});

export const updateProfileTypeSchema = object({
    ...updatePayload,
    ...params
});

export const findProfileTypeSchema = object({
    ...params
});

export const findAllProfileTypeSchema = object({});

export const deleteProfileTypeSchema = object({
    ...params
});

export type CreateProfileTypeInput = TypeOf<typeof createProfileTypeSchema>
export type UpdateProfileTypeInput = TypeOf<typeof updateProfileTypeSchema>
export type GetProfileTypeInput    = TypeOf<typeof findProfileTypeSchema>
export type GetAllProfileTypeInput = TypeOf<typeof findAllProfileTypeSchema>
export type DeleteProfileTypeInput = TypeOf<typeof deleteProfileTypeSchema>