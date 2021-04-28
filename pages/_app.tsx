import { AppProps } from 'next/app'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps}/>
}

export default App
