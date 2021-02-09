import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from '../../containers/layout'
import GridList from '../../containers/grid-list'
import Card from '../../components/card'
import { getBlogPostsByPage } from '../../utils/sanity'

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
      <GridList>
        {blogPosts.map(({ slug, title, description, date, coverImage }) => (
          <li key={title}>
            <Link href={`/blog/${slug}`}>
              <a>
                <Card
                  coverImage={coverImage}
                  date={date}
                  title={title}
                  description={description}
                />
              </a>
            </Link>
          </li>
        ))}
      </GridList>
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
