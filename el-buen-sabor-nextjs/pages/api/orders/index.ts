import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product, Order } from '../../../models';

type Data = 
    | { message: string }
    | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'POST':
            return createOrder(req, res);
        default:
            return res.status(400).json({ message: 'Bad Request' })
    } 
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { orderItems, total } = req.body as IOrder;

    const session: any = await getSession({ req });

    if(!session) {
        return res.status(401).json({ message: 'Debe de estar autenticado para realizar esta acción' })
    }

    const productsIds = orderItems.map( product => product._id);

    await db.connect();
    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    //Validaciones de la cookie vs el backend
    try {
        const subTotal = orderItems.reduce((prev, current) => {
            
            const currentPrice = dbProducts.find( product => product.id === current._id )!.precio;

            if(!currentPrice) {
                throw new Error('Producto no encontrado');
            }

            return (currentPrice * current.cantidad) + prev
        }, 0);

        const tax = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.21);
        const backendTotal = subTotal * ( tax + 1 );

        if (total !== backendTotal) {
            throw new Error('El total no coincide con el calculado en la base de datos'); 
        }

    } catch (error:any) {
        await db.disconnect();
        return res.status(400).json({ 
            message: error.message || 'Revise logs del server'
        })
    }

    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json( newOrder );
}
