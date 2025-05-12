import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from '../styles/theme';
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/i18n';
import { AuthProvider } from '../components/Auth/AuthContext';
import { AnimatePresence } from 'framer-motion';

// Глобальные стили для анимаций
const globalStyles = {
  '@keyframes pulse': {
    '0%': {
      opacity: 0.6,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.6,
    },
  }
};

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Демо Платформа Залогового Кредитования</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Интерактивная демо-платформа для залогового кредитования (ипотека и автокредиты)" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <AnimatePresence mode="wait" initial={false}>
              <Component {...pageProps} key={router.pathname} />
            </AnimatePresence>
          </AuthProvider>
        </I18nextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp; 