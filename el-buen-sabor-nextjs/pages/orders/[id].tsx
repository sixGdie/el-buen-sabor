import React from 'react'
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link';

const OrderPage = () => {
  return (
    <ShopLayout title={"Resumen de la orden 454"} pageDescription={"Resumen de la orden"}>
            <Typography variant="h1" component="h1">Orden: 2131</Typography>
    
            <Chip
                sx={{ my:2 }}
                label="Pendiente de pago"
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined />} 
            />
            <Chip
                sx={{ my:2 }}
                label="Pagada"
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />} 
            />

            <Grid container>
                <Grid item xs={12} sm ={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm ={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant="h2" component="h2">Resumen (3 productos)</Typography>
                            <Divider sx ={{ my:1 }}/>
                            
                            <Box display='flex' justifyContent='end'>
                                <NextLink href='checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <Typography>Nombre Cliente</Typography>
                            <Typography>Algun lugar</Typography>
                            <Typography>Dirección</Typography>
                            <Typography>Num teléfono</Typography>

                            <Divider sx ={{ my:1 }}/>

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary/>
    
                            <Box sx={{ mt: 3 }}>
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my:2 }}
                                    label="Pagada"
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined />} 
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    
        </ShopLayout>
  )
}

export default OrderPage