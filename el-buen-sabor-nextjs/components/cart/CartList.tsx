import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';
import { currency } from '../../utils';

interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.cantidad = newQuantityValue;
        updateCartQuantity(product);
    }

    return (
      <>
        {
            cart.map(product => (
                <Grid container spacing={2} key={ product.slug } sx={{ md:1 }}>
                    <Grid item xs={3}>
                        <NextLink href={`/product/${product.slug}`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={ `/products/${ product.imagenes }` }
                                        component="img"
                                        sx={{borderRadius: '5px'}}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.nombre }</Typography>
                            {
                                editable 
                                ? (
                                    <ItemCounter 
                                        currentValue={product.cantidad} 
                                        maxValue={product.inStock} 
                                        updatedQuantity={ (newValue) => {
                                            onNewCartQuantityValue(product, newValue)
                                        }}
                                    />
                                )
                                : (
                                    <Typography variant='h6'>
                                        { product.cantidad } 
                                        { product.cantidad > 1 ? ' unidades' : ' unidad' }
                                    </Typography>
                                )
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignContent='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{currency.format(product.precio)}</Typography> 
                        {
                            editable && (
                                <Button 
                                    variant='text' 
                                    color='secondary'
                                    onClick={() => removeCartProduct(product)}
                                >
                                    Remover
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            ))
        }
      </>
    
  )
}
