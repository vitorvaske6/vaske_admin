import {object, string} from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateSessionInput:
 *      type: object
 *      required: object
 *        - login
 *        - password
 *      properties:
 *        login:
 *          type: string
 *          default: jane.doe
 *        password:
 *          type: string
 *          default: strongPassword123
 *    CreateSessionResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        refreshToken:
 *          type: string
 */

export const createSessionSchema = object({
    body: object({
        login: string({
            required_error: 'login é obrigatório.'
        }),
        password: string({
            required_error: 'password é obrigatório.'
        }) 
    })
})