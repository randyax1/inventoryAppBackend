import productModel, { ProductInterface } from "../models/product.model";

export const createProduct = async (uid: string, name: string, unitPrice: number, supplier: string, category: string, quantity: number): Promise<ProductInterface> => {

    const product = new productModel({
        uid: uid,
        name: name,
        unitPrice: unitPrice,
        supplier: supplier,
        category: category,
        quantity: quantity
    });

    return product.save();

};
//ALL
export const getProductsByUid = async (uid: string): Promise<ProductInterface[] | null> => {

    const products = await productModel.find({
        uid: uid
    });

    return products;
    
}
//ONLY ONE
export const getProductByUid = async(uid: string): Promise<ProductInterface | null> => {

    const product = await productModel.findOne({
        uid: uid
    });

    return product;
}

export const getProductsById = async (uid: string, productId: string): Promise<ProductInterface | null> => {

    const product = await productModel.findOne({
        _id: productId,
        uid: uid
    });

    return product;
    
}

export const updateProduct = async (
    uid: string, product: ProductInterface, name: string, unitPrice: number, supplier: string, category: string, quantity: number
): Promise<ProductInterface> => {

    if(name) product.name = name;
    if(unitPrice) product.unitPrice = unitPrice;
    if(supplier) product.supplier = supplier;
    if(category) product.category = category;
    if(quantity) product.quantity = quantity;

    return await product.save();
}

export const eraseProductByUid = async (uid: string) => {

    await productModel.deleteOne({
        uid: uid
    });
}

