import {object, string, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    GetC4mAuthInput:
 *      type: object
 *      required: object
 *        - function
 *        - url
 *        - method
 *        - consumerKey
 *        - consumerSecret
 *      properties:
 *        function:
 *          type: string
 *          default: functionName
 *        url:
 *          type: string
 *          default: "C4M endpoint that return things"
 *        method:
 *          type: string
 *          default: "GET"
 *        consumerKey:
 *          type: string
 *          default: "consumerKey"
 *        consumerSecret:
 *          type: string
 *          default: "consumerSecret"
 *    C4mAuthReturn:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        nonce:
 *          type: string
 */

const payload = {
    body: object({
        function: string({
            required_error: "Função é obrigatório."
        }),
        url: string({
            required_error: "URL é obrigatório."
        }),
        method: string({
            required_error: "Método é obrigatório."
        }).min(3, "Método deve conter ao menos 3 caracteres."),
        consumerKey: string({ 
            required_error: "Consumer Key é obrigatório."
        }),
        consumerSecret: string({ 
            required_error: "Consumer Secret é obrigatório."
        }),
    })
};

const params = {
    params: object({
        ...payload
    })
};

export const getC4mAuthSchema = object({
    ...payload,
});

export type GetC4mAuthInput = TypeOf<typeof getC4mAuthSchema>