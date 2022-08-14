import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Order, User } from '../../../models';
import Product from '../../../models/Product';
import { IIngredient } from '../../../interfaces/ingredient';
import { IOrder } from '../../../interfaces/order';

type Data = {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productsWithNoInventory: number;
    lowInventory: number;
    products: IProduct[];
    orders: IOrder[];
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    await db.connect();
    
    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        products,
        orders,
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0}).count(),
        Product.find({ inStock: { $lte: 10 }}).count(),
        Product.find().lean(),
        Order.find().lean(),
    ]);

    products.forEach(product => {
        product.recipe = product.recipe.map(ingredient => ingredient as [string, number]);
    });
    
    //llevar esta lógica a front
    /*products.forEach(product => {
        product.recipe.forEach(ingredient => {
            console.log(ingredient);
        });  
    });*/

    res.status(200).json({ 
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders,
        products,
        orders,
    })
}