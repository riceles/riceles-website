import { GetStaticProps } from 'next'
import Layout from '../containers/layout'
import Slider from '../containers/slider'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale
    }
  }
}

export interface HomeProps {
  locale: string
}

export default function Home({ locale }: HomeProps) {
  return (
    <Layout locale={locale}>
      <Slider/>
    </Layout>
  )
}
