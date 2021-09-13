import { Router } from 'express';
import { Request, Response } from "express";
import { PRODUCT_ENDPOINT } from '../const/endpoint';
import { createProduct, deleteProductById, getProductById, getProductsById, updateProduct } from '../services/product.service';

import { handleError } from '../utils/handleError';

export const router: Router = Router();

//                                                          C
//Create a new Product
router.post(PRODUCT_ENDPOINT, async(req: Request, res: Response) => {

    try {

        const { name, supplier, category, quantity, unitPrice } = req.body;

        if( name === null || supplier === null || category === null || quantity === null || unitPrice === null ) {
            
            return res.status(401).send({ message: 'Ningun campo puede quedar vacio'});

        }

        const Product = await createProduct(name, supplier, category, quantity, unitPrice);

        return res.status(201).json(Product);

    } catch (err) {
        return handleError(res, err);        
    }

});

//                                                          R
//Get all Products by id
router.get(PRODUCT_ENDPOINT, async (req: Request, res: Response) => {
    try {

        const products = await getProductsById();

        return res.status(200).json(products);

    } catch (err) {
        return handleError(res,err);
    }

});

//                                                      U
router.put(PRODUCT_ENDPOINT + "/:productId", async(req: Request, res: Response) => {
    try {

        const { name, supplier, category, quantity, unitPrice } = req.body;

        const product = await getProductById(req.params.productId);

        if(!product) {
            return res.status(401).send({ message: `El producto con el id: ${req.params.productId} no existe`});
        } else {

        const productUpdate = await updateProduct(
            product,
            name,
            supplier,
            category,
            quantity,
            unitPrice
        )

        return res.status(200).json(productUpdate);

    }

} catch (err) {
    return handleError(res, err);
}

});              


//                                                      D
//Delete a Product
router.delete(PRODUCT_ENDPOINT + "/:productId", async (req: Request, res: Response) => {

    try {

        const product = await getProductById(req.params.productId);
        
        if(!product) {

            return res.status(404).send({ message: `El id del producto ${req.params.productId} no existe.`});

        } else {

            deleteProductById(req.params.productId);

            return res.status(200).send({ message: `El producto con el id ${req.params.productId} a sido borrado`});

        }

    } catch (err) {
        return handleError(res, err);
    }

});