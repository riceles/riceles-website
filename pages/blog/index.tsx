import { GetServerSideProps } from 'next'
import Layout from '../../containers/layout'
import BlogPostCard from '../../components/blog-post-card'
import { getBlogPostsByPage, urlFor } from '../../utils/sanity'

export const getServerSideProps: GetServerSideProps = async () => {
  const blogPosts = await getBlogPostsByPage()

  return {
    props: {
      blogPosts
    }
  }
}

export default function Blog({ blogPosts }) {
  let content: any
  if (blogPosts) {
    content = (
      <ul>
        {blogPosts.map(({ title, description, date, coverImage }) => (
          <li key={title}>
            <BlogPostCard
              imageSource={urlFor(coverImage).width(480).url()}
              date={date}
              title={title}
              description={description}
            />
          </li>
        ))}
      </ul>
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
