import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
//import { IPaypal } from '../../../interfaces';
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

/*const getPaypalBearerToken = async():Promise<string|null> => {
    
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');


    try {
        
        const { data} = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${ base64Token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return data.access_token;


    } catch (error) {
        if ( axios.isAxiosError(error) ) {
            console.log(error.response?.data);
        } else {
            console.log(error);
        }

        return null;
    }


}*/


const payOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {


    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    // Todo: validar sesión del usuario
    // TODO: validar mongoID

    /*const paypalBearerToken = await getPaypalBearerToken();

    if ( !paypalBearerToken ) {
        return res.status(400).json({ message: 'No se pudo confirmar el token de paypal' })
    }*/

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
    
    /*const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>( `${ process.env.PAYPAL_ORDERS_URL }/${ transactionId }`, {
        headers: {
            'Authorization': `Bearer ${ paypalBearerToken }`
        }
    });*/

    /*if ( data.response.body.status !== 'approved' ) {
        return res.status(401).json({ message: 'Orden no reconocida' });
    }*/


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
