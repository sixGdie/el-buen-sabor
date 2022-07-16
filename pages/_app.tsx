import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { lightTheme } from '../themes';
import { CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';
import { UiProvider, CartProvider, AuthProvider } from '../context';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    //TODO: Eliminar lo de paypal
      <SessionProvider>
        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
          <SWRConfig
          value={{
            //refreshInterval: 500, PARA ACTUALIZAR LA PAGINA CADA CIERTA CANTIDAD DE MS
            fetcher: (resourse, init) => fetch(resourse, init).then((res) => res.json()),
          }}
          >
            <AuthProvider>
              <CartProvider>
                <UiProvider>
                  <ThemeProvider theme={lightTheme}>
                      <CssBaseline/>
                      <Component {...pageProps} />
                  </ThemeProvider>
                </UiProvider>
              </CartProvider>
            </AuthProvider>    
          </SWRConfig> 
        </PayPalScriptProvider> 
      </SessionProvider>         
  )
}

export default MyApp