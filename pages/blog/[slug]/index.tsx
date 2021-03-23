import { ReactNode } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../containers/layout'
import Article from '../../../containers/article'
import Message from '../../../containers/message'
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
  let content: ReactNode
  if (blogPost) {
    content = (
      <Article
        title={blogPost?.title}
        description={blogPost?.description}
        date={blogPost?.date}
        author={blogPost?.author}
        coverImage={blogPost?.coverImage}
        content={blogPost?.content}
      />
    )
  } else {
    content = (
      <Message
        title='Postagem não encontrada'
        description='Não conseguimos encontrar a postagem a qual você tentou acessar'
      />
    )
  }

  return (
    <Layout locale={locale}>
      {content}
    </Layout>
  )
}
