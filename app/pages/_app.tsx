import '@/styles/globals.css'
import '../../css/photon.min.css'
import type { AppProps } from 'next/app'
import { DataProvider } from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </>
  )
}
