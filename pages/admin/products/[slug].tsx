import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { ICategories, IProduct } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { elBuenSaborApi } from '../../../api';
import { Product } from '../../../models';
import { useRouter } from 'next/router';


const validCaterogies  = ['bebida', 'hamburguesa', 'pizza', 'pancho', 'guarnicion', 'lomo', 'otro']

interface FormData {
    _id?: string;
    nombre: string;
    rubro: string;
    categoria: ICategories;
    imagenes: string[];
    precio: number;
    costoEnvio: number;
    descripcion: string;
    inStock: number;
    slug: string;
    tags: string[];
}

interface Props {
    product: IProduct;
}

const ProductAdminPage:FC<Props> = ({ product }) => {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { register, handleSubmit, formState:{errors}, getValues, setValue, watch} = useForm({
        defaultValues: product
    })

    useEffect(() => {
        const subscription = watch(( value, { name, type }) => {
            if(name === 'nombre'){
                const newSlug = value.nombre?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll("'", '')
                    .toLocaleLowerCase() || '';

                setValue('slug', newSlug)
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if ( !target.files || target.files.length === 0 ) return;

        
        try {
            
            for ( const file of target.files){
                
                const formData = new FormData();
                formData.append('file', file);
                const { data } = 
                    await elBuenSaborApi
                        .post<{message:string}>('/admin/upload', formData);
                setValue(
                    'imagenes', 
                    [...getValues('imagenes'), data.message], 
                    { shouldValidate: true }); 
            }

        } catch (error) {
            
        }
    }

    const onDeleteImage = (image:string) => {
        setValue(
            'imagenes', 
            getValues('imagenes').filter(img => img !== image),
            { shouldValidate: true });
    }

    const onSubmitForm = async ( form: FormData ) => {
        if( form.imagenes.length < 2 ){
            return;
        }
            
        setIsSaving(true);

        try {
            
            const {data} = await elBuenSaborApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })

            if( !form._id ){
                router.replace(`/admin/products/${form.slug}`);
            } else {
                setIsSaving(false);
            }

        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }
    }

    return (
        <AdminLayout 
            title={'Producto'} 
            subTitle={`Editando: ${ product.nombre }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Nombre"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('nombre', {
                                 required: 'Este campo es requerido',
                                 minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.nombre }
                            helperText={ errors.nombre?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('descripcion', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.descripcion }
                            helperText={ errors.descripcion?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('precio', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.precio }
                            helperText={ errors.precio?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Categoría</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('categoria') }
                                onChange={ ({ target }) => setValue('categoria', target.value as ICategories, {shouldValidate: true}) }
                            >
                                {
                                    validCaterogies.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No puede contener espacios' : undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>
                            <input
                                ref={ fileInputRef }
                                type={'file'}
                                multiple
                                accept='image/png, image/gif, image/jpeg'
                                style={{ display: 'none' }}
                                onChange={ onFilesSelected }
                            />

                            <Chip 
                                label="Es necesario subir al menos 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('imagenes').length < 2 ? 'flex' : 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('imagenes').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={()=> onDeleteImage(img)}
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    
    let  product: IProduct | null;  

    if ( slug === 'new' ) {

        const tempProduct = JSON.parse( JSON.stringify( new Product()));
        delete tempProduct._id;
        tempProduct.imagenes = ['img1.jpg', 'img2.jpg'];
        product = tempProduct;

    } else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage