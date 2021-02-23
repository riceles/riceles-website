import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../../containers/layout'
import Article from '../../../containers/article'
import { getBlogPost, BlogPost } from '../../../utils/sanity'

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

export interface PostProps {
  blogPost: BlogPost
}

export default function Post({ blogPost }: PostProps) {
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
    content = <p>Nenhuma postagem encontrada</p>
  }

  return (
    <Layout>
      {content}
    </Layout>
  )
}
