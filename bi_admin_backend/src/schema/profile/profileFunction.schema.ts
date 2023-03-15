import {object, string, number, boolean, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *        - profileFunctionId
 *        - name
 *        - active
 *       properties:
 *         profileFunctionId:
 *           type: number
 *         name:
 *           type: string
 *         active:
 *           type: number
 */

const payload = {
    body: object({
        profileFunctionId: number({
            required_error: "Id da função é obrigatório."
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
            required_error: "Id da função é obrigatório."
        })
    })
};

export const createProfileFunctionSchema = object({
    ...payload
});

export const updateProfileFunctionSchema = object({
    ...payload,
    ...params
});

export const findProfileFunctionSchema = object({
    ...params
});

export const findAllProfileFunctionSchema = object({});

export const deleteProfileFunctionSchema = object({
    ...params
});

export type CreateProfileFunctionInput = TypeOf<typeof createProfileFunctionSchema>
export type UpdateProfileFunctionInput = TypeOf<typeof updateProfileFunctionSchema>
export type GetProfileFunctionInput    = TypeOf<typeof findProfileFunctionSchema>
export type GetAllProfileFunctionInput = TypeOf<typeof findAllProfileFunctionSchema>
export type DeleteProfileFunctionInput = TypeOf<typeof deleteProfileFunctionSchema>