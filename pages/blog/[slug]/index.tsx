import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../containers/layout'
import Article from '../../../containers/article'
import { getBlogPostPaths, getBlogPost, BlogPost } from '../../../utils/sanity'

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPostPaths = await getBlogPostPaths()
  const paths = blogPostPaths.map(({ locale, slug }) => ({
    params: { slug },
    locale
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  let { slug } = params
  if (slug instanceof Array) {
    slug = slug[0]
  }
  const blogPost = await getBlogPost(locale, slug)

  if (!blogPost) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      locale,
      blogPost
    }
  }
}

export interface PostProps {
  locale: string
  blogPost: BlogPost
}

export default function Post({ locale, blogPost }: PostProps) {
  return (
    <Layout locale={locale}>
      <Article
        title={blogPost?.title}
        description={blogPost?.description}
        date={blogPost?.date}
        author={blogPost?.author}
        coverImage={blogPost?.coverImage}
        content={blogPost?.content}
      />
    </Layout>
  )
}
