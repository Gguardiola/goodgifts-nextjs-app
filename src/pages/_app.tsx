import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GoodGifts - Improve Your Gift-Giving Experience!</title>
        <meta property="og:image" content="https://i.imgur.com/kXdXXMa.png" />
        <meta property="og:image:width" content="256"/>
        <meta property="og:image:height" content="256"/>
        <meta property="og:title" content="GoodGifts"/>
        <meta property="og:description" content="Improve Your Gift-Giving Experience!"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
