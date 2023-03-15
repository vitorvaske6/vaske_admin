import { object, string, TypeOf, boolean } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required: object
 *        - login
 *        - password
 *        - comparePassword
 *        - email
 *        - picture
 *      properties:
 *        login:
 *          type: string
 *          default: jane.doe
 *        password:
 *          type: string
 *          default: strongPassword123
 *        comparePassword:
 *          type: string
 *          default: strongPassword123
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        picture:
 *          type: string
 *          default: https://www.pngitem.com/middle/xRiRmh_logo-icon-profile-png-transparent-png/
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        login:
 *          type: string
 *        email:
 *          type: string
 *        picture:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createUserSchema = object({
    body: object({
           login: string({
               required_error: "login é obrigatório."
           }),
           password: string({
               required_error: "password é obrigatório."
           }).min(6, "A password é muito curta. Deve ter no mínimo 6 caracteres"),
           comparePassword: string({
               required_error: "Confirmação da password é obrigatório."
           }),
           email: string({
               required_error: "E-mail é obrigatório."
           }).email("E-mail não é valido."),
           picture: string({}),
           stayLoggedIn: boolean({}),
    }).refine((data) => data.password === data.comparePassword, {
           message: "As senhas não combinam.",
           path: ["comparePassword"]
    }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.comparePassword">;