import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../../containers/layout'
import Article from '../../../containers/article'
import Message from '../../../containers/message'
import Fallback from '../../../containers/fallback'
import { getBlogPostPaths, getBlogPost, urlFor, BlogPost } from '../../../utils/sanity'

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPostPaths = await getBlogPostPaths()
  const paths = blogPostPaths.map(({ locale, slug }) => ({
    params: { slug },
    locale
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  let { slug } = params
  if (slug instanceof Array) {
    slug = slug[0]
  }
  const blogPost = await getBlogPost(locale, slug)

  return {
    props: {
      locale,
      blogPost
    }
  }
}

export interface PostProps {
  locale: string
  blogPost: BlogPost
}

export default function Post({ locale, blogPost }: PostProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Fallback/>
  }

  if (!blogPost) {
    return (
      <Layout locale={locale}>
        <Message
          title='Postagem não encontrada'
          description='Não conseguimos encontrar a postagem selecionada'
        />
      </Layout>
    )
  }
  
  return (
    <Layout locale={locale}>
      <Head>
        <title>{blogPost?.title} | Riceles Costa</title>
        <meta name='description' content={blogPost?.description}/>
        <meta name='twitter:card' content='summary_large_image'/>
        <meta name='twitter:title' content={blogPost?.title}/>
        <meta name='twitter:description' content={blogPost?.description}/>
        <meta name='twitter:image' content={urlFor(blogPost?.coverImage?.asset).width(720).url()}/>
      </Head>
      <Article
        locale={locale}
        title={blogPost?.title}
        description={blogPost?.description}
        date={blogPost?.date}
        authorName={blogPost?.author?.name}
        authorAvatarUrl={urlFor(blogPost?.author?.avatar?.asset).width(40).url()}
        coverImageUrl={urlFor(blogPost?.coverImage?.asset).width(720).url()}
        coverImageCaption={blogPost?.coverImage?.caption}
        content={blogPost?.content}
      />
    </Layout>
  )
}
