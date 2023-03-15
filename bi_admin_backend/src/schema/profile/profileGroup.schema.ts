import {object, string, number, boolean, TypeOf} from "zod";


const payload = {
    body: object({
        profileGroupId: number({
            required_error: "Id do grupo é obrigatório."
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
            required_error: "Id do grupo é obrigatório."
        })
    })
};

export const createProfileGroupSchema = object({
    ...payload
});

export const updateProfileGroupSchema = object({
    ...payload,
    ...params
});

export const findProfileGroupSchema = object({
    ...params
});

export const findAllProfileGroupSchema = object({});

export const deleteProfileGroupSchema = object({
    ...params
});

export type CreateProfileGroupInput = TypeOf<typeof createProfileGroupSchema>
export type UpdateProfileGroupInput = TypeOf<typeof updateProfileGroupSchema>
export type GetProfileGroupInput    = TypeOf<typeof findProfileGroupSchema>
export type GetAllProfileGroupInput = TypeOf<typeof findAllProfileGroupSchema>
export type DeleteProfileGroupInput = TypeOf<typeof deleteProfileGroupSchema>