import { Router } from 'express';
import { Request, Response } from "express";
import { SUPPLIER_ENDPOINT } from '../const/endpoint';
import { createSupplier, deleteSupplierById, getSupplierById, getSuppliersById, updateSupplier } from '../services/supplier.service';

import { handleError } from '../utils/handleError';

export const router: Router = Router();

//                      C
//Create a new Supplier
router.post(SUPPLIER_ENDPOINT, async(req: Request, res: Response) => {
    try {
        const { name, email, contactNumber, state, city } = req.body;

        if(!name) {
            return res.status(401).send({ message: 'El nombre del proveedor no puede quedar vacio.'});
        }

        const Supplier = await createSupplier(name, email, contactNumber, state, city);

        return res.status(201).json(Supplier);

    } catch (err) {
        return handleError(res, err)
    }
});

//                      R
//Get all Suppliers by id
router.get(SUPPLIER_ENDPOINT, async (req: Request, res: Response) => {

    try {
        const suppliers = await getSuppliersById();
        
        return res.status(200).json(suppliers);

    } catch (err) {
        return handleError(res, err)
    }

});

//                              R
//Update a Supplier
router.put(SUPPLIER_ENDPOINT + "/:supplierId", async(req: Request, res: Response) => {

    try {

        const { name, email, contactNumber, state, city } = req.body;

        const supplier = await getSupplierById(req.params.supplierId);

        if(!supplier) {
            return res.status(401).send({ message: `El proveedor con el id: ${req.params.supplierId} no existe.`});
        } else {

            const supplierUpdate = await updateSupplier(
                supplier,
                name, 
                email, 
                contactNumber, 
                state, 
                city
            )

            return res.status(200).json(supplierUpdate);

        }

    } catch (err) {
        return handleError(res, err);
    }
});

//                              D
//Delete a Supplier
router.delete(SUPPLIER_ENDPOINT + "/:supplierId", async(req: Request, res: Response) => {

    try {

        const supplier = await getSupplierById(req.params.supplierId);

        if(!supplier) {
            return res.status(404).send({ message: `El id del proveedor ${req.params.supplierId} no existe.`});
        } else {
            deleteSupplierById(req.params.supplierId);

            return res.status(200).send({ message: `El proveedor con el id ${req.params.supplierId} a sido borrado`});
        }

    } catch (err) {
        return handleError(res, err);
    }

});