import mongoose, { Schema, Document } from 'mongoose';

export interface ProductInterface extends Document {
    name: string;
    supplier: string;
    category: string;
    quantity: number;
    unitPrice: number;

};

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true, lowercase: true },
    supplier: { type: String, required: true, lowercase: true },
    category: { type: String, required: true, lowercase: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
    
});

export default mongoose.model<ProductInterface>('Product', ProductSchema);