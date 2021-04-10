import groq from 'groq'

export const blogPostPathsQuery = groq`
  *[_type == 'post'] {
    locale,
    'slug': slug.current
  }
`

export const blogPostsByPageQuery =  groq`
  *[_type == 'post' && locale == $locale] | order(date desc) {
    'slug': slug.current,
    title,
    description,
    date,
    coverImage
  }
`

export const blogPostQuery = groq`
  *[_type == 'post' && locale == $locale && slug.current == $slug] {
    'slug': slug.current,
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
`
