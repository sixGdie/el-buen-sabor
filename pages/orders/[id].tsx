import { Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid, Link, Typography } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { db, dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { PayPalButtons } from '@paypal/react-paypal-js';
import elBuenSaborApi from '../../api/elBuenSaborApi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Order } from '../../models';

export type OrderResponseBody = {
    id: string;
    status:
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "PAYER_ACTION_REQUIRED";
};

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({order}) => {

    const router = useRouter();
    //const { sendAddress } = order;

    const [isPaying, setIsPaying] = useState(false);

    const onOrderCompleted = async( details: IOrder ) => {
        
        /*if ( details.status !== 'COMPLETED' ) {
            return alert('No hay pago en MercadoPago');
        }*/
        setIsPaying(true);

        let jsonToSend = {
            ...details,
            orderItems: order.orderItems.map(item => ({
                ...item,
                price: item.precio,
            }))
        };


        try {
            
            const { data } = await elBuenSaborApi.post(`/orders/pay`, {
                thisUrl: `${process.env.NEXT_PUBLIC_URL}/orders/${details.id}`,
                orderId: details._id,
                transactionId: details.transactionId,
                title: jsonToSend.orderItems.map(item => item.nombre).join(', '),
                description: jsonToSend.orderItems.map(item => item.nombre).join(', '),
                price: jsonToSend.orderItems.map(item => item.precio).reduce((a, b) => a + b, 0),
                quantity: jsonToSend.orderItems.map(item => item.cantidad).reduce((a, b) => a + b, 0),
            });

            router.replace(data.message);
           // router.reload();

        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert('Error');
        }
    }

    return (
        <ShopLayout title={"Resumen de la orden"} pageDescription={"Resumen de la orden"}>
                <Typography variant="h1" component="h1">Orden: {order._id}</Typography>

                {
                    order.isPaid
                        ? (
                            <Chip
                                sx={{ my:2 }}
                                label="Pagada"
                                variant='outlined'
                                color='success'
                                icon={<CreditScoreOutlined />} 
                            />
                        )
                        : (
                            <Chip
                                sx={{ my:2 }}
                                label="Pendiente de pago"
                                variant='outlined'
                                color='error'
                                icon={<CreditCardOffOutlined />} 
                            />
                        )
                }

                <Grid container className='fadeIn'>
                    <Grid item xs={12} sm ={7}>
                        <CartList products={ order.orderItems }/>
                    </Grid>
                    <Grid item xs={12} sm ={5}>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant="h2" component="h2">
                                    Resumen 
                                    ({order.numberOfItems} 
                                    {order.numberOfItems > 1 ? 'productos' : 'producto'})
                                </Typography>
                                <Divider sx ={{ my:1 }}/>

                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <Typography>{order.sendAddress.firstName} {order.sendAddress.lastName}</Typography>
                                <Typography>{order.sendAddress.department}</Typography>
                                <Typography>
                                    {order.sendAddress.address}
                                    {order.sendAddress.address2 ? ` ,${order.sendAddress.address2}` : ''}
                                </Typography>
                                <Typography>{order.sendAddress.phone}</Typography>

                                <Divider sx ={{ my:1 }}/>

                                <Box display='flex' justifyContent='end'>
                                    <NextLink href='/cart' passHref>
                                        <Link underline='always'>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>

                                <OrderSummary 
                                    orderValues={{
                                        numberOfItems: order.numberOfItems,
                                        subTotal: order.subTotal,
                                        total: order.total,
                                        tax: order.tax,
                                    }}
                                />
        
                                <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                    
                                    <Box 
                                        display='flex' 
                                        justifyContent='center' 
                                        className='fadeIn'
                                        sx={{ display: isPaying ? 'flex' : 'none' }}
                                    >
                                        <CircularProgress/>
                                    </Box>
                                    
                                    <Box 
                                        sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}
                                        flexDirection='column'
                                    >
                                        {  
                                            order.isPaid
                                                ? (
                                                    <Chip
                                                        sx={{ my:2 }}
                                                        label="Pagada"
                                                        variant='outlined'
                                                        color='success'
                                                        icon={<CreditScoreOutlined />} 
                                                    />
                                                )
                                                : /*(
                                                    <PayPalButtons 
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [
                                                                    {
                                                                        amount: {
                                                                            value: `${order.total}`,
                                                                        },
                                                                    },
                                                                ],
                                                            });
                                                        }}
                                                        onApprove={(data, actions) => {
                                                            return actions.order!.capture().then((details) => {
                                                                onOrderCompleted( details );
                                                                // console.log({ details  })
                                                                // const name = details.payer.name.given_name;
                                                                // alert(`Transaction completed by ${name}`);
                                                            });
                                                        }}
                                                    />
                                                )*/
                                                (
                                                    <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                                            <Button 
                                                                color='secondary' 
                                                                className='circular-btn' 
                                                                fullWidth
                                                                onClick={ () => { onOrderCompleted(order) } }
                                                                //disabled={ isPaying }
                                                            >
                                                                Pagar orden
                                                            </Button>                                                   
                                                    </Box>
                                                )
                                        }
                                    </Box>
                                    
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
        
            </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {

    const { id= '', paid = '' } = query;
    const session:any = await getSession({req});

    if(!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    let order = await dbOrders.getOrderById( id.toString() );
    
    if(!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if(paid === 'true') {
        await db.connect();
        const dbOrder = await Order.findById(order._id);

        if ( !dbOrder ) {
            await db.disconnect();
        }else{
            dbOrder.isPaid = true;
            await dbOrder.save();
            await db.disconnect()
            order = await dbOrders.getOrderById( id.toString() );
        }       
        /*if ( dbOrder.total !== Number(data.response.body.quantity[0].amount.value) ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Los montos de MercadoPago y nuestra orden no son iguales' });
        }*/
        //dbOrder.transactionId = transactionId;
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage