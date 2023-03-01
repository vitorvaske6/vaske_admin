import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput, GetProductInput, DeleteProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct, findAllProduct } from "../service/product.service";


export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const body = req.body;
    const product = await createProduct({ ...body, user: user_Id });

    return res.send(product);
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
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
    const user_Id = res.locals.user._doc._id;
        
    if(!user_Id){
        return res.status(403).send("Necessário um usuário para criar um grupo de perfil");
    }

    const productId = req.params.productId;
    const product = await findProduct({ productId })

    if (!product) {
        return res.sendStatus(404);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
}
