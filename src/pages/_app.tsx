import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GoodGifts - Improve Your Gift-Giving Experience!</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}