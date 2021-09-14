import { Router } from 'express';
import { Request, Response } from "express";
import { CATEGORY_ENDPOINT } from '../const/endpoint';
import { createCategory, deleteCategoryById, getCategoriesById, getCategoryById, getCategoryByName, updateAllTheCategoriesOfProducts, updateCategory } from '../services/category.service';
import { handleError } from '../utils/handleError';

export const router: Router = Router();

//                                                      C
//Create a new category
router.post(CATEGORY_ENDPOINT, async (req: Request, res: Response) => {
    try {

        const { name } = req.body;

        if (!name) {
            return res.status(401).send({ message: 'El nombre de la categoria no puede quedar vacio.' });
        }

        const categoryExists = await getCategoryByName(res.locals._id);

        if (categoryExists) {
            return res.status(308).send({ message: 'Nombre de categoria ya existente.' });

        } else {
            const Category = await createCategory(name);
            return res.status(201).json(Category);
        }

    } catch (err) {
        return handleError(res, err)
    }

});

//                                                         R
//Get categories by id
router.get(CATEGORY_ENDPOINT, async (req: Request, res: Response) => {

    try {
  
      const categories = await getCategoriesById();
  
      return res.status(200).json(categories);
  
    } catch (err) {
      return handleError(res, err)
    }
  
  });
//                                                          U
//Update a category and also all the categories of the products
router.put(CATEGORY_ENDPOINT + "/:categoryId", async (req: Request, res: Response) => {
    try {
      
      const { name } = req.body;
      
      const category = await getCategoryById(req.params.categoryId);
      
      if(!category) {
        return res.status(401).send({ message: `El producto con el id: ${req.params.categoryId} no existe.` }); 
      } else {

        const categoryUpdate = await updateCategory(
            category,
            name
          );

          await updateAllTheCategoriesOfProducts(res.locals.categoryId, name);
      
          return res.status(200).json(categoryUpdate);

      }

    } catch (err) {
      return handleError(res, err)
    }
  
  });
  
//                                                      D
//Delete a category
router.delete(CATEGORY_ENDPOINT + "/:categoryId", async (req: Request, res: Response) => {

    try {

        const category = await getCategoryById(req.params.categoryId);

        if(!category) {
            return res.status(404).send({ message: `La categoria con el id ${req.params.categoryId} no existe.`});
        } else {
            deleteCategoryById(req.params.categoryId);

            return res.status(200).send({ message: `El producto con el id ${req.params.categoryId} a sido borrado`});
        }

    } catch (err) {
        return handleError(res, err);
    }

});