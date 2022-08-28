import '../styles/globals.css'
import '../styles/colors.css'
import '../styles/variables.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	console.info('pageProps:', JSON.stringify(pageProps))
	return <Component {...pageProps} />
}

export default MyApp

