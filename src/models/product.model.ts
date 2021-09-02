import mongoose, { Schema, Document } from 'mongoose';

export interface ProductInterface extends Document {
    uid: string;
    name: string;
    unitPrice: number;
    supplier: string;
    category: string;
    quantity: number;
};

export const ProductSchema: Schema = new Schema({
    uid: { type: String },
    name: { type: String, required: true, lowercase: true },
    unitPrice: { type: Number, required: true },
    supplier: { type: String, required: true, lowercase: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true }
});

export default mongoose.model<ProductInterface>('Product', ProductSchema);