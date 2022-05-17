import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct;
}

const ProductPage:NextPage<Props> = ({product}) => {

  //const router = useRouter();
  //const {products: product, isLoading} = useProducts(`/products/${router.query.slug}`);


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
              <ItemCounter/>
            </Box>

            <Button color="secondary" className='circular-btn'>
              Agregar al carrito
            </Button>

            <Chip label='No hay stock' color='error' variant='outlined'/>

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