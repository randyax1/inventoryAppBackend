import productModel, { ProductInterface } from '../models/product.model';

export const createProduct = async ( name: string, supplier: string, category: string, quantity: number, unitPrice: number ): Promise<ProductInterface> => {

    const Product = new productModel({
        name: name,
        supplier: supplier,
        category: category,
        quantity: quantity,
        unitPrice: unitPrice

    });

    return Product.save();

};

export const getProductsById = async (): Promise<ProductInterface[] | null> => {

    const products = await productModel.find({});

    return products;

};

export const getProductById = async (productId: string): Promise<ProductInterface | null> => {

    const product = await productModel.findOne({
        _id: productId
    });

    return product;

}

export const updateProduct = async ( product: ProductInterface, name: string, supplier: string, category: string, quantity: number, unitPrice: number ): Promise<ProductInterface> => {

    if(name) product.name = name;
    if(supplier) product.supplier = supplier;
    if(category) product.category = category;
    if(quantity) product.quantity = quantity;
    if(unitPrice) product.unitPrice = unitPrice;

    return await product.save()

}

export const deleteProductById = async (productId: string) => {

    const product = await productModel.deleteOne({
        _id: productId
    });

    return product;
    
}