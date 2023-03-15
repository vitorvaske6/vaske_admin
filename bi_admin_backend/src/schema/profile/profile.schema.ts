import {object, string, boolean, TypeOf} from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateProfileInput:
 *      type: object
 *      required: object
 *        - name
 *        - surname
 *        - active
 *        - profileFunction
 *        - profileGroups
 *        - profileType
 *        - profileReports
 *        - profileUsers
 *      properties:
 *        name:
 *          type: string
 *        surname:
 *          type: string
 *        active:
 *          type: string
 *        profileFunction:
 *          type: string
 *        profileGroups:
 *          type: string
 *        profileType:
 *          type: string
 *        profileReports:
 *          type: string
 *        profileUsers:
 *          type: string
 *    CreateProfileResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        surname:
 *          type: string
 *        active:
 *          type: string
 *        profileFunction:
 *          type: string
 *        profileGroups:
 *          type: string
 *        profileType:
 *          type: string
 *        profileReports:
 *          type: string
 *        profileUsers:
 *          type: string
 */

const payload = {
    body: object({
        name: string({
            required_error: "CNPJ ou CPF é obrigatório."
        }),
        surname: string({
            required_error: "CNPJ ou CPF é obrigatório."
        }),
        active: boolean({}),
        profileFunction: string({}),
        profileGroups: string({}).array(),
        profileType: string({
            required_error: "Tipo de usuário é obrigatório"
        }),
        profileReports: string({}).array(),
        profileUsers: string({}).array(),
        profileAppMenus: string({}).array(),
        profileAppPages: string({}).array(),
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id da empresa é obrigatório."
        })
    })
};

export const createProfileSchema = object({
    ...payload
}); 

export const updateProfileSchema = object({
    ...payload,
    ...params
});

export const findProfileSchema = object({
    ...params
});

export const findAllProfileSchema = object({});

export const deleteProfileSchema = object({
    ...params
});

export type CreateProfileInput = TypeOf<typeof createProfileSchema>
export type UpdateProfileInput = TypeOf<typeof updateProfileSchema>
export type GetProfileInput    = TypeOf<typeof findProfileSchema>
export type GetAllProfileInput = TypeOf<typeof findAllProfileSchema>
export type DeleteProfileInput = TypeOf<typeof deleteProfileSchema>