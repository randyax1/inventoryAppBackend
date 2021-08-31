import mongoose, { Schema, Document } from 'mongoose';

export interface ProductInterface extends Document {
    uid: string;
    name: string;
    unitPrice: number;
    supplier: string;
    quantity: number;
};

export const ProductSchema: Schema = new Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true, lowercase: true },
    unitPrice: { type: Number, required: true },
    supplier: { type: String, required: true, lowercase: true }
});

export default mongoose.model<ProductInterface>('Product', ProductSchema);