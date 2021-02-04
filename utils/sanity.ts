import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production'
})

export const getBlogPostsByPage = async (locale: string) => {
  const blogPosts = await client.fetch(`
    *[_type == 'post' && locale == $locale] {
      'slug': slug.current,
      title,
      description,
      date,
      coverImage
    }
  `, { locale })

  return blogPosts
}

export const getBlogPost = async (locale: string, slug: string) => {
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

export const urlFor = (src: any) => {
  return builder.image(src)
}
