import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from '../../containers/layout'
import BlogPostCard from '../../components/blog-post-card'
import { getBlogPostsByPage, urlFor } from '../../utils/sanity'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const blogPosts = await getBlogPostsByPage(locale)

  return {
    props: {
      blogPosts
    }
  }
}

export default function Blog({ blogPosts }) {
  let blogPostList: any
  if (blogPosts && blogPosts.length) {
    blogPostList = (
      <ul>
        {blogPosts.map(({ slug, title, description, date, coverImage }) => (
          <li key={title}>
            <Link href={`/blog/${slug}`}>
              <a>
                <BlogPostCard
                  imageSource={urlFor(coverImage).width(480).url()}
                  date={date}
                  title={title}
                  description={description}
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    )
  } else {
    blogPostList = <p>Não há postagens</p>
  }

  return (
    <Layout>
      {blogPostList}
    </Layout>
  )
}
