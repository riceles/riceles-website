import { GetServerSideProps } from 'next'
import Layout from '../../../containers/layout'
import Article from '../../../containers/article'
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
      <Article
        title={blogPost?.title}
        description={blogPost?.description}
        date={blogPost?.date}
        author={blogPost?.author}
        coverImage={blogPost?.coverImage}
      />
    </Layout>
  )
}
