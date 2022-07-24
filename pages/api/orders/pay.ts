import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';
import mercadoPago from 'mercadopago';
import NextCors from 'nextjs-cors';
import { useReducer } from 'react';
import { useRouter } from 'next/router';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    //allow cors

    switch( req.method ) {
        case 'POST':
            return payOrder(req, res);
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}


const payOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {


    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    // Todo: validar sesión del usuario
    // TODO: validar mongoID

    //const { transactionId = '', orderId = ''  } = req.body;
    const orderId = req.body.orderId;
    //const transactionId = req.body.transactionId;

    console.log(process.env.MERCADOPAGO_ACCESS_TOKEN);

    mercadoPago.configure({
        access_token: `${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    });

    console.log(orderId);
    console.log(req.body.title)
    console.log(req.body.description)
    console.log(parseFloat(req.body.price))
    console.log(req.body.quantity)

    let preference = {
        back_urls: {
          success: `${req.body.thisUrl}?paid=true`,
          failure: `${req.body.thisUrl}?paid=false`,
          pending: `${req.body.thisUrl}?paid=pending`,
        },
        //auto_return: "approved",
        external_reference: `${ orderId }`,
        items: [
          {
            title:req.body.title,
            description: req.body.description,
            unit_price: parseFloat(req.body.price),
            quantity: req.body.quantity,
          }
        ]
      };
      
      const mpResponse = await mercadoPago.preferences.create(preference);

      //return res.redirect(mpResponse.body.init_point);
      return res.status(200).json({ message: mpResponse.body.init_point });

      //const resp =  await axios.get(mpResponse.body.init_point)
      //return res.write(resp.data)
      //redireccionar a mpResponse.body.init_point permitiendo cors
      
      /*mercadoPago.preferences.create(preference)
      .then(function(response){
        //const { data } = response.body;
        console.log(response.body.init_point)
        res.redirect(response.body.init_point);
       
      }).catch(function(error){
        console.log(error);
      });*/

    ///await db.connect();
    ///const dbOrder = await Order.findById(orderId);

    ///if ( !dbOrder ) {
    ///    await db.disconnect();
    ///    return res.status(400).json({ message: 'Orden no existe en nuestra base de datos' });
    ///}
    
    
    /*if ( dbOrder.total !== Number(data.response.body.quantity[0].amount.value) ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Los montos de MercadoPago y nuestra orden no son iguales' });
    }*/


    //dbOrder.transactionId = transactionId;
    ///dbOrder.isPaid = true;
    ///await dbOrder.save();
    ///await db.disconnect();

    
    ///return res.status(200).json({ message: 'Orden pagada' });
}
