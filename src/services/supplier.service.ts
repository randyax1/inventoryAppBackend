import supplierModel, { SupplierInterface } from '../models/supplier.model';

export const createSupplier = async (name: string, email: string, contactNumber: number, state: string, city: string): Promise<SupplierInterface> => {

    const Supplier = new supplierModel({
        name: name,
        email: email,
        contactNumber: contactNumber,
        state: state,
        city: city
    });

    return Supplier.save();

};

export const getSuppliersById = async (): Promise<SupplierInterface[] | null> => {

    const suppliers = await supplierModel.find({});

    return suppliers;

};

export const getSupplierById = async (supplierId: string): Promise<SupplierInterface | null> => {

    const supplier = await supplierModel.findOne({
        _id: supplierId
    });

    return supplier;

}

export const updateSupplier = async (supplier: SupplierInterface, name: string, email: string, contactNumber: number, state: string, city: string): Promise<SupplierInterface> => {

    if (name) supplier.name = name;
    if (email) supplier.email = email;
    if (contactNumber) supplier.contactNumber = contactNumber;
    if (state) supplier.state = state;
    if (city) supplier.city = city;

    return await supplier.save()

}

export const deleteSupplierById = async (supplierId: string) => {
    
    const supplier = await supplierModel.deleteOne({
        _id: supplierId
    });

    return supplier;
    
}