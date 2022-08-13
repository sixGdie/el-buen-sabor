import { isValidObjectId } from "mongoose";
import { IOrder } from "../interfaces";
import { db } from '.';
import { Order } from "../models";

export const getAllOrders = async (): Promise<number> => {

    await db.connect();
    
    const orders = await Order.find().lean();

    const ordersTime: number = orders.map(order => {
        return order.estimatedTime
    }).reduce((a, b) => a + b, 0);

    console.log(ordersTime);

    await db.disconnect();

    return ordersTime;
}

export const getOrderById = async (id: string): Promise<IOrder | null> => {
    
    if (!isValidObjectId(id)){
        return null;
    }

    await db.connect();
    
    const order = await Order.findById(id).lean();

    await db.disconnect();

    if (!order) {
        return null;
    }

    return JSON.parse(JSON.stringify(order));
}

export const getOrdersByUsers = async (userId: string): Promise<IOrder[]> => {
        
        if (!isValidObjectId(userId)){
            return [];
        }
    
        await db.connect();
        
        const orders = await Order.find({ user: userId }).lean();
    
        await db.disconnect();
    
        return JSON.parse(JSON.stringify(orders));
}