import { GetServerSideProps } from 'next'
import Layout from '../../../containers/layout'
import { getBlogPost } from '../../../utils/sanity'

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  let { slug } = params
  if (slug instanceof Array) {
    slug = slug[0]
  }
  const blogPost = await getBlogPost(locale, slug)

  return {
    props: {
      blogPost
    }
  }
}

export default function BlogPost({ blogPost }) {
  return (
    <Layout>
      <h1>{blogPost.title}</h1>
    </Layout>
  )
}
