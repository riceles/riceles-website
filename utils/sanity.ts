import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
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

export interface ImageReference {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
}

export interface ImageReferenceWithCaption extends ImageReference {
  caption: string
}

export type Reference = BlockReference | ImageReferenceWithCaption

export interface Author {
  name?: string
  avatar?: ImageReference
}

export interface BlogPost {
  slug?: string
  title?: string
  description?: string
  date?: string
  coverImage?: ImageReference
  content?: Reference[]
  author?: Author
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
      content[] {
        ...,
        'asset': asset->
      },
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

export const urlFor = (src: ImageReference) => {
  return builder.image(src)
}
