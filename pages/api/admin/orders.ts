import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces';
import { isValidObjectId } from 'mongoose';

type Data = 
| { message: string } 
|   IOrder[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {

        case 'GET':
            return getOrders(req, res);
        case 'PUT':
            return updateOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad request'});

    }


}

const getOrders = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();
    const orders:IOrder[] = await Order.find()
        .sort({ createdAt: 'desc' })
        .populate('user', 'name email')
        .lean();
    await db.disconnect();

    return res.status(200).json( orders );

}

const updateOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderId = '', currentState = '', paymentState = false} = req.body;

    //let paymentState: boolean = req.body.paymentState;
    
    console.log(req.body);
    let newCurrentState = currentState.toString();
    console.log(newCurrentState);
    if ( !isValidObjectId(orderId) ) {
        return res.status(400).json({ message: 'No existe orden con esa id' });
    }
    
    const validStates = ['Ingresado', 'En Cocina', 'En delivery', 'Entregado', 'Cancelado'];
    
    if ( !validStates.includes(newCurrentState) ) {
        console.log("newCurrentState");
        return res.status(400).json({ message: 'No es un estado válido' });
    }
    console.log(paymentState);
    await db.connect();
    const order = await Order.findById(orderId);
    if ( !order ) {
        db.disconnect();
        return res.status(400).json({ message: 'No existe orden con esa id' });
    }
    
    order.isPaid = paymentState;
    order.currentState = newCurrentState;
    await order.save();

    await db.disconnect();
    
    res.status(200).json({ message: 'Orden actualizada correctamente' });
}
