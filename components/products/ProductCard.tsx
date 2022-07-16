import { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from "@mui/material";
import { IProduct } from "../../interfaces";
import { utils } from "../../utils";

interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({product}) => {

    const [isHovered, setIsHovered] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const hasStock = (): number => {
        utils.getStock(product).then(res => {
            return res; //TODO: Revisar
        });
        return 0;
    }
    return (
        <Grid item 
                xs={6} 
                sm={4} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            {
                                (hasStock() === 0) && (
                                    <Chip
                                        color='primary'
                                        label='Sin stock'
                                        sx={{ position: 'absolute', zIndex: 99,  top:'10px', right:'10px' }}
                                    />
                                )
                            }
                            
                            <CardMedia
                                component='img'
                                className='fadeIn'
                                image={ product.imagen }
                                alt={ product.nombre }
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>   
            </Card>

            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                <Typography fontWeight={700}>{product.nombre}</Typography>
                <Typography fontWeight={500}>{`$${product.precio}`}</Typography>
            </Box>
        </Grid>
  )
}
