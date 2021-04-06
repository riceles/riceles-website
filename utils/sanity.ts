import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2021-04-06',
  useCdn: process.env.NODE_ENV === 'production'
})

export interface BlockReference {
  _key: string
  _type: 'block'
  style: string
  children: {
    _key: string
    _type: string
    text: string
    marks: string[]
  }[]
  markDefs: {
    _key: string
    _type: string
  }[]
}

export interface Asset {
  _type: 'reference'
  _ref: string
}

export interface ImageReference {
  _type: 'image'
  asset: Asset
  caption: string
}

export type ContentItem = BlockReference | ImageReference

export interface Author {
  name?: string
  avatar?: ImageReference
}

export interface BlogPost {
  locale?: string
  slug?: string
  title?: string
  description?: string
  date?: string
  coverImage?: ImageReference
  content?: ContentItem[]
  author?: Author
}

export type GetBlogPostPaths = () => Promise<BlogPost[]>

export const getBlogPostPaths: GetBlogPostPaths = async () => {
  const blogPostPaths = await client.fetch(`
    *[_type == 'post'] {
      locale,
      'slug': slug.current
    }
  `)

  return blogPostPaths
}

export type GetBlogPostsByPage = (locale: string) => Promise<BlogPost[]>

export const getBlogPostsByPage: GetBlogPostsByPage = async (locale) => {
  const blogPosts = await client.fetch(`
    *[_type == 'post' && locale == $locale] | order(date desc) {
      'slug': slug.current,
      title,
      description,
      date,
      coverImage
    }
  `, { locale })

  return blogPosts
}

export type GetBlogPost = (locale: string, slug: string) => Promise<BlogPost>

export const getBlogPost: GetBlogPost = async (locale, slug) => {
  const blogPost = await client.fetch(`
    *[_type == 'post' && locale == $locale && slug.current == $slug] {
      title,
      description,
      date,
      coverImage,
      content,
      'author': author-> {
        name,
        avatar
      }
    }
  `, { locale, slug })
    .then(res => res[0])
  
  return blogPost
}

const builder = imageUrlBuilder(client)

export const urlFor = (src: Asset) => {
  return builder.image(src)
}
