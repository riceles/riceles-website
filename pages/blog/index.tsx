import { GetServerSideProps } from 'next'
import Layout from '../../containers/layout'
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
        {blogPosts.map(({ title, description, coverImage }) => (
          <li key={title}>
            <img src={urlFor(coverImage).width(480).url()}/>
            <h2>{title}</h2>
            <p>{description}</p>
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
