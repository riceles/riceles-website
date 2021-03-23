import { GetStaticProps } from 'next'
import Layout from '../containers/layout'

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
      <p>Conteúdo da página "home"</p>
    </Layout>
  )
}
