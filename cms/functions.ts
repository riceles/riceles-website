import imageUrlBuilder from '@sanity/image-url'
import client from './client'
import { blogPostPathsQuery, blogPostSlugsByLocaleQuery, blogPostsByPageQuery, blogPostQuery } from './queries'
import { Asset, ImageReference, BlogPost } from './types'
import { BLOG_POSTS_PER_PAGE } from '../utils/constants'

export type GetBlogPostPaths = () => Promise<BlogPost[]>

export const getBlogPostPaths: GetBlogPostPaths = async () => {
  const blogPostPaths = await client.fetch(blogPostPathsQuery)

  return blogPostPaths
}

export type GetBlogPostSlugsByLocale = (locale: string) => Promise<BlogPost[]>

export const getBlogPostSlugsByLocale: GetBlogPostSlugsByLocale = async (locale) => {
  const blogPostSlugsByLocale = await client.fetch(blogPostSlugsByLocaleQuery, { locale })

  return blogPostSlugsByLocale
}

export type GetBlogPostsByPage = (locale: string, page: number) => Promise<BlogPost[]>

export const getBlogPostsByPage: GetBlogPostsByPage = async (locale, page = 1) => {
  const start = (page - 1) * BLOG_POSTS_PER_PAGE
  const end = page * BLOG_POSTS_PER_PAGE
  const blogPosts = await client.fetch(blogPostsByPageQuery, { locale, start, end })

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
