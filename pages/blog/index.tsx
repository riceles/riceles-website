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
      locale,
      blogPosts
    }
  }
}

export interface BlogProps {
  locale: string
  blogPosts: BlogPost[]
}

export default function Blog({ locale, blogPosts }: BlogProps) {
  let content: ReactNode
  if (blogPosts && blogPosts.length) {
    content = (
      <Feed>
        {blogPosts.map(blogPost => (
          <li key={blogPost?.title}>
            <Card
              locale={locale}
              slug={blogPost?.slug}
              coverImageUrl={urlFor(blogPost?.coverImage?.asset).width(480).url()}
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
    <Layout locale={locale}>
      {content}
    </Layout>
  )
}
