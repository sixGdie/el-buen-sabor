import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '../ui';
import { initialData } from '../../database/products';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
      <>
        {
            productsInCart.map(product => (
                <Grid container spacing={2} key={ product.slug } sx={{ md:1 }}>
                    <Grid item xs={3}>
                        <NextLink href="/product/slug" passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={ `/products/${ product.imagenes[0] }` }
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
                                ? <ItemCounter/>
                                : <Typography variant='h6'>3</Typography>
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignContent='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{`$${ product.precio }`}</Typography> 
                        {
                            editable && (
                                <Button variant='text' color='secondary'>
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
