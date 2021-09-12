import mongoose, { Schema, Document } from 'mongoose';

export interface SupplierInterface extends Document {
    name: string;
    email: string;
    contactNumber: number;
    state: string;
    city: string;
};

const SupplierSchema: Schema = new Schema({
    name: { type: String, required: true, lowercase: true},
    email: { type: String, required: false, lowercase: true },
    contactNumber: { type: Number, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false }

});

export default mongoose.model<SupplierInterface>('Supplier', SupplierSchema);