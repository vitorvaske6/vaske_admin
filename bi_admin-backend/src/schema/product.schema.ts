
import {object, number, string, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */
const payload = {
    body: object({
        title: string({
            required_error: "Titulo é obrigatório."
        }),
        description: string({
            required_error: "Descrição é obrigatório."
        }).min(120, "Descrição deve ter ao menos 120 caracteres"),
        price: number({ 
            required_error: "Preço é obrigatório."
        }),
        image: string({
            required_error: "Imagem é obrigatório."
        }),
    })
};

const params = {
    params: object({
        productId: string({
            required_error: "Id do produto é obrigatório."
        })
    })
};

export const createProductSchema = object({
    ...payload
});

export const updateProductSchema = object({
    ...payload,
    ...params
});

export const findProductSchema = object({
    ...params
});

export const findAllProductSchema = object({});

export const deleteProductSchema = object({
    ...params
});

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type GetProductInput    = TypeOf<typeof findProductSchema>
export type GetAllProductInput = TypeOf<typeof findAllProductSchema>
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>