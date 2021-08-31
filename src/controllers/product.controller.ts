import { Router } from 'express';
import { Request, Response } from 'express';
import { PRODUCT_ENDPOINT } from '../const/endpoint';
import { createProduct, eraseProductByUid, getProductByUid, getProductsById, getProductsByUid, updateProduct } from '../services/product.service';
import { handleError } from '../utils/handleError';

export const router: Router = Router();

//                           C
//Creation of a new Product
router.post(PRODUCT_ENDPOINT, async (req: Request, res: Response) => {
    try {
        
        const { name, unitPrice, supplier, quantity } = req.body;

        if(name === null || unitPrice === null || supplier === null || quantity === null){
            return res.status(401).send({ message: '¡Ningun campo puede estar vacio!'});
        }

        const product = await createProduct(
            res.locals.uid,
            name,
            unitPrice,
            supplier,
            quantity
        );

        return res.status(201).json(product);

    } catch (err) {
        return handleError(res,err);
    }

});
//                          R
//Get all products by uid
router.get(PRODUCT_ENDPOINT, async (req: Request, res: Response) => {
    try {
        const products = await getProductsByUid(res.locals.uid);

        return res.status(200).json(products);

    } catch (err) {
        return handleError(res, err);
    }

});

//                          U
//Updates product
router.put(PRODUCT_ENDPOINT + "/:productId", async (req: Request, res: Response) => {
    try {
        
        const { name, unitPrice, supplier, quantity } = req.body;
        const productId = req.params.productId;

        const product = await getProductsById(res.locals.uid,productId);

        if(!product) {
            return res.status(401).send({ message: `El producto con el id: ${productId } no existe.`});
        }

        const productUpdate = await updateProduct(
            res.locals.uid,
            product,
            name,
            unitPrice,
            supplier,
            quantity
        );

        return res.status(200).json(productUpdate);

    } catch (err) {
        return handleError(res, err);
    }

});

//                          D
//Erase product by uid
router.delete(`${PRODUCT_ENDPOINT}/:uid`, async (req: Request, res: Response) => {
    try {
        
        const product = await getProductByUid(res.locals.uid);

        if(!product) {
            return res.status(404).send({ message: `El producto con el UID ${req.params.uid } no existe.`});
        }

        eraseProductByUid(res.locals.uid);

        return res.status(200).send({ message: `El producto con el UID ${req.params.uid} a sido borrado.`});

    } catch (err) {
        return handleError(res, err);        
    }
});