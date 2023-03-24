import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput, GetProductInput, DeleteProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct, findAllProduct } from "../service/product.service";


export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    if(!res.locals.user) {
        return res.status(404).send("User not found")
    }  

    let userInfo

    if(res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user._doc
    }
        
    if (!res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user
    }
        
    if(!userInfo){
        return res.status(403).send("Necessário um usuário para criar uma empresa.");
    }

    const body = req.body;
    const product = await createProduct({ ...body, user: userInfo._id });

    return res.send(product);
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    if(!res.locals.user) {
        return res.status(404).send("User not found")
    }  

    let userInfo

    if(res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user._doc
    }
        
    if (!res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user
    }
        
    if(!userInfo){
        return res.status(403).send("Necessário um usuário para criar uma empresa.");
    }

    const productId = req.params.productId;
    const update = req.body;
    const product = await findProduct({ productId })

    if (!product) {
        return res.sendStatus(404);
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, { new: true });

    return res.send(updatedProduct);

}

export async function findProductHandler(req: Request<GetProductInput["params"]>, res: Response) {
    const productId = req.params.productId;
    const product = await findProduct({productId});

    if (!product) {
        return res.sendStatus(404);
    }

    return res.send(product);
}

export async function findAllProductHandler(req: Request, res: Response) {
    const product = await findAllProduct({});

    if (!product) {
        return res.sendStatus(404);
    }

    return res.send(product);
}

export async function deleteProductHandler(req: Request<DeleteProductInput["params"]>, res: Response) {
    if(!res.locals.user) {
        return res.status(404).send("User not found")
    }  

    let userInfo

    if(res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user._doc
    }
        
    if (!res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user
    }
        
    if(!userInfo){
        return res.status(403).send("Necessário um usuário para criar uma empresa.");
    }

    const productId = req.params.productId;
    const product = await findProduct({ productId })

    if (!product) {
        return res.sendStatus(404);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
}
