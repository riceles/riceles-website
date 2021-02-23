import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from '../../containers/layout'
import Feed from '../../containers/feed'
import Card from '../../components/card'
import { getBlogPostsByPage, BlogPost } from '../../utils/sanity'

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
            <Link href={`/blog/${blogPost?.slug}`}>
              <a>
                <Card
                  coverImage={blogPost?.coverImage}
                  date={blogPost?.date}
                  title={blogPost?.title}
                  description={blogPost?.description}
                />
              </a>
            </Link>
          </li>
        ))}
      </Feed>
    )
  } else {
    content = <p>Não há postagens</p>
  }

  return (
    <Layout>
      {content}
    </Layout>
  )
}
