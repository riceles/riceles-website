import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../containers/layout'
import Feed from '../../containers/feed'
import Card from '../../components/card'
import Message from '../../containers/message'
import { getBlogPostsByPage, BlogPost, urlFor } from '../../utils/sanity'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const blogPosts = await getBlogPostsByPage(locale)

  return {
    props: {
      blogPosts
    }
  }
}

export interface BlogProps {
  blogPosts: BlogPost[]
}

export default function Blog({ blogPosts }: BlogProps) {
  
  let content: ReactNode
  if (blogPosts && blogPosts.length) {
    content = (
      <Feed>
        {blogPosts.map(blogPost => (
          <li key={blogPost?.title}>
            <Card
              slug={blogPost?.slug}
              coverImageUrl={urlFor(blogPost?.coverImage).width(480).url()}
              date={blogPost?.date}
              title={blogPost?.title}
              description={blogPost?.description}
            />
          </li>
        ))}
      </Feed>
    )
  } else {
    content = (
      <Message
        title='Postagens não encontradas'
        description='Não conseguimos encontrar nenhuma postagem para a sua língua'
      />
    )
  }

  return (
    <Layout>
      {content}
    </Layout>
  )
}
