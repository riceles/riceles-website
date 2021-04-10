import imageUrlBuilder from '@sanity/image-url'
import client from './client'
import { blogPostPathsQuery, blogPostsByPageQuery, blogPostQuery } from './queries'
import { Asset, ImageReference, BlogPost } from './types'

export type GetBlogPostPaths = () => Promise<BlogPost[]>

export const getBlogPostPaths: GetBlogPostPaths = async () => {
  const blogPostPaths = await client.fetch(blogPostPathsQuery)

  return blogPostPaths
}

export type GetBlogPostsByPage = (locale: string) => Promise<BlogPost[]>

export const getBlogPostsByPage: GetBlogPostsByPage = async (locale) => {
  const blogPosts = await client.fetch(blogPostsByPageQuery, { locale })

  return blogPosts
}

export type GetBlogPost = (locale: string, slug: string) => Promise<BlogPost>

export const getBlogPost: GetBlogPost = async (locale, slug) => {
  const blogPost = await client.fetch(blogPostQuery, { locale, slug })
    .then(res => res[0])
  
  return blogPost
}

const builder = imageUrlBuilder(client)

export const urlFor = (src: ImageReference | Asset) => {
  return builder.image(src)
}
