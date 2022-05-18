import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { dbProducts } from '../../database';
import { ICartProduct, IProduct } from '../../interfaces';
import { CartContext } from '../../context/cart/CartContext';

interface Props {
  product: IProduct;
}

const ProductPage:NextPage<Props> = ({product}) => {

  const router = useRouter();
  const { addProductToCard } = useContext( CartContext );

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    nombre: product.nombre,
    imagenes: product.imagenes[0],
    precio: product.precio,
    costoEnvio: product.costoEnvio,
    inStock: product.inStock,
    slug: product.slug,
    cantidad: 1,
  })

  const onUpdateQuantity = (cantidad: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      cantidad
    }))
  }

  const onAddProduct = () => {
    addProductToCard(tempCartProduct);
    router.push('/cart');
  }

  return (
    <ShopLayout title={ product.nombre } pageDescription={ product.descripcion }>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            imagenes={ product.imagenes }
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{ product.nombre }</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.precio}`}</Typography>

            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.cantidad}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock}
              />
            </Box>    
            {
              (product.inStock > 0)
                ? (
                  <Button 
                    color="secondary" 
                    className='circular-btn'
                    onClick={ onAddProduct }
                  >
                    Agregar al carrito
                  </Button>
                ) 
                : (
                  <Chip label='No hay stock' color='error' variant='outlined'/>
                )
            }
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ product.descripcion }</Typography>
            </Box>

          </Box>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map(({slug}) => ({
      params: {
        slug: slug
      }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const { slug = '' } = params as { slug: string }; 
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400 //una vez por día
  }
}

export default ProductPage