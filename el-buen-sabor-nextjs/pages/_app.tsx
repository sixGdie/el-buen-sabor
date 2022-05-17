import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { lightTheme } from '../themes';
import { CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';
import { UiProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        //refreshInterval: 500, PARA ACTUALIZAR LA PAGINA CADA CIERTA CANTIDAD DE MS
        fetcher: (resourse, init) => fetch(resourse, init).then((res) => res.json()),
      }}
    >
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
            <CssBaseline/>
            <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>   
  )
}

export default MyApp
