import { GetServerSideProps } from 'next'
import Layout from '../../containers/layout'
import Feed from '../../containers/feed'
import Card from '../../components/card'
import Message from '../../containers/message'
import { getBlogPostsByPage, urlFor } from '../../cms/functions'
import { BlogPost } from '../../cms/types'

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
  if (!blogPosts || !blogPosts.length) {
    return (
      <Layout locale={locale}>
        <Message
          title='Postagens não encontradas'
          description='Não conseguimos encontrar nenhuma postagem para a sua língua'
        />
      </Layout>
    )
  }

  return (
    <Layout locale={locale}>
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
    </Layout>
  )
}
