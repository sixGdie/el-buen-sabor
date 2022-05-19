import mongoose, { Schema, model, Model } from "mongoose";
import { IOrder } from "../interfaces";

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{ 
        _id: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        nombre: {type: String, required: true},
        cantidad: {type: Number, required: true},
        slug: {type: String, required: true},
        imagenes: {type: String, required: true},
        precio: {type: Number, required: true},
    }],
    sendAddress: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        address: {type: String, required: true},
        address2: {type: String},
        cp: {type: String, required: true},
        department: {type: String, required: true},
        phone: {type: String, required: true},
    },
    
    numberOfItems: {type: Number, required: true},
    subTotal: {type: Number, required: true},
    tax: {type: Number, required: true},
    total: {type: Number, required: true},

    isPaid: {type: Boolean, required: true, default: false},
    paidAt: {type: String },
    
}, { 
    timestamps: true,
});

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;