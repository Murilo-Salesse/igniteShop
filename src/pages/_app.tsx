import { globalStyles } from '@/style/global';
import type { AppProps } from 'next/app';

import { Container } from '@/style/pages/app';
import Header from '@/components/Header';
import { CartContextProvider } from '@/contexts/CartContexts';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}
