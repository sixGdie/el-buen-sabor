import { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { IProduct } from "../../interfaces";

interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({product}) => {

    const [isHovered, setIsHovered] = useState(false)

    const productImage = useMemo(() => {
        return isHovered 
        ? `products/${product.imagenes[1]}` 
        : `products/${product.imagenes[0]}`;
    }, [isHovered, product.imagenes])

    return (
        <Grid item 
                xs={6} 
                sm={4} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <NextLink href="product/slug" passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                component='img'
                                className='fadeIn'
                                image={ productImage }
                                alt={ product.nombre }
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>   
            </Card>

            <Box sx={{ mt: 1 }} className='fadeIn'>
                <Typography fontWeight={700}>{product.nombre}</Typography>
                <Typography fontWeight={500}>{`$${product.precio}`}</Typography>
            </Box>
        </Grid>
  )
}