import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Article as ArticleSchema } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import Layout from '../../../containers/layout'
import Message from '../../../containers/message'
import Article from '../../../containers/article'
import Fallback from '../../../containers/fallback'
import { getBlogPostPaths, getBlogPost, urlFor } from '../../../cms/functions'
import { BlogPost } from '../../../cms/types'

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
        {/* Basic Meta Tags */}
        <title>{blogPost?.title} | Riceles Costa</title>
        <meta name='description' content={blogPost?.description}/>

        {/* Open Graph Tags */}
        <meta property='og:title' content={blogPost?.title}/>
        <meta property='og:description' content={blogPost?.description}/>
        <meta property='og:image' content={urlFor(blogPost?.coverImage?.asset).width(720).url()}/>
        <meta property='og:site_name' content='Riceles Costa'/>
        <meta
          property='og:url'
          content={`https://riceles.com${locale !== 'pt-BR' ? `/${locale}` : ''}/blog/${blogPost?.slug}`}
        />
        <meta property='og:locale' content={locale.replace('-', '_')}/>
        <meta property='og:type' content='article'/>
        <meta property='article:author' content={blogPost?.author?.name}/>
        <meta property='article:published_time' content={blogPost?.date}/>

        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image'/>
        <meta name='twitter:title' content={blogPost?.title}/>
        <meta name='twitter:description' content={blogPost?.description}/>
        <meta name='twitter:image' content={urlFor(blogPost?.coverImage?.asset).width(720).url()}/>

        {/* Structured Data */}
        <script
          {...jsonLdScriptProps<ArticleSchema>({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: blogPost?.title,
            datePublished: blogPost?.date,
            image: {
              '@type': 'ImageObject',
              url: urlFor(blogPost?.coverImage?.asset).width(720).url()
            },
            author: {
              '@type': 'Person',
              name: blogPost?.author?.name,
              image: {
                '@type': 'ImageObject',
                url: urlFor(blogPost?.author?.avatar?.asset).width(400).url()
              }
            },
            publisher: {
              '@type': 'Organization',
              name: 'Riceles Costa',
              logo: {
                '@type': 'ImageObject',
                url: 'https://riceles.com/imgs/logo.svg'
              }
            }
          })}
        />
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
