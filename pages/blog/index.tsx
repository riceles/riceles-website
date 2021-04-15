import { GetServerSideProps } from 'next'
import Layout from '../../containers/layout'
import Message from '../../containers/message'
import Feed from '../../containers/feed'
import Pagination from '../../containers/pagination'
import Card from '../../components/card'
import { getBlogPostsByPage, getBlogPostPaths, urlFor } from '../../cms/functions'
import { BlogPost } from '../../cms/types'
import { BLOG_POSTS_PER_PAGE } from '../../utils/constants'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  let { page } = query
  if (page instanceof Array) {
    page = page[0]
  }
  const blogPosts = await getBlogPostsByPage(locale)
  const blogPostPaths = await getBlogPostPaths()
  const numOfPages = Math.ceil(blogPostPaths.length / BLOG_POSTS_PER_PAGE)

  return {
    props: {
      locale,
      blogPosts,
      page,
      numOfPages
    }
  }
}

export interface BlogProps {
  locale: string
  blogPosts: BlogPost[]
  page: string
  numOfPages: number
}

export default function Blog({ locale, blogPosts, page, numOfPages }: BlogProps) {
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
      <Pagination curPage={parseInt(page)} numOfPages={numOfPages}/>
    </Layout>
  )
}
