import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production'
})

export const getBlogPostsByPage = async () => {
  const blogPosts = await client.fetch(`
    *[_type == 'post'] {
      'slug': slug.current,
      title,
      description,
      date,
      coverImage
    }
  `)

  return blogPosts
}

const builder = imageUrlBuilder(client)

export const urlFor = (src: any) => {
  return builder.image(src)
}
