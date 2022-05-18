import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { elBuenSaborApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';

type FormData = {
    email: string;
    password: string;
    name: string;
};

const register = () => {

    const router = useRouter();
    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onRegisterForm = async ({name, email, password}: FormData) => {
        setShowError(false);

        const { hasError, message } = await registerUser(name, email, password);

        if(hasError) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }

        router.replace('/');
    }

    return (
        <AuthLayout title={'Crear cuenta'}>
            <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
                <Box sx={{ width:350, padding:'10px 20px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                            <Chip
                                label='Datos incorrectos'
                                color='error'
                                icon={<ErrorOutline/>}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Nombre Completo" 
                                variant='filled' 
                                fullWidth
                                { ...register('name',{
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Este campo debe tener al menos 2 caracteres' },
                                })}
                                error= { !!errors.name }
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label="Correo" 
                                variant='filled' 
                                fullWidth
                                { ...register('email',{
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail
                                })}
                                error= { !!errors.email }
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Contraseña" 
                                type="password" 
                                variant='filled' 
                                fullWidth
                                { ...register('password', {
                                      required: 'Este campo es requerido',
                                      minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }  
                                })}
                                error= { !!errors.password }
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                type="submit"
                                color='secondary' 
                                className='circular-btn' 
                                size='large' 
                                fullWidth
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="/auth/login" passHref>
                                <Link underline='always'>
                                    Entrar con una cuenta existente
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default register
