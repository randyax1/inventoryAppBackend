import categoryModel, { CategoryInterface } from "../models/category.model";

export const createCategory = async (name: string): Promise<CategoryInterface> => {

    const category = new categoryModel({
        name: name
    });

    return category.save();

};

export const getCategoriesById = async (): Promise<CategoryInterface[] | null> => {

    const categories = await categoryModel.find({});

    return categories;
    
};

export const getCategoryById = async (categoryId: string): Promise<CategoryInterface | null> => {

    const category = await categoryModel.findOne({
        _id: categoryId
    });

    return category;
}

export const getCategoryByName = async (categoryName: string): Promise<CategoryInterface | null> => {

    const category = await categoryModel.findOne({
        name: categoryName
    })

    return category;
};

export const updateCategory = async (category: CategoryInterface , name: string): Promise<CategoryInterface> => {

    if (name) category.name = name;

    return await category.save()

};

export const deleteCategoryById = async (categoryId: string) => {

    const category = await categoryModel.deleteOne({
        _id: categoryId
    });

    return category;
    
};