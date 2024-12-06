import '@near-pagoda/ui/styles.css';
import '../styles/theme.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import type { NextPageWithLayout } from '@/utils/types';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <title>Divvy</title>
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
