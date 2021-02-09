import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import BlockContent from '@sanity/block-content-to-react'
import { urlFor } from '../../utils/sanity'
import styles from './article.module.scss'

const serializers = {
  types: {
    image: ({ node: { asset, caption } }) => (
      <figure>
        <img src={urlFor(asset).width(720).url()} alt={caption}/>
        <figcaption>{caption}</figcaption>
      </figure>
    )
  }
}

export default function Article({ title, description, date, author, coverImage, content }) {
  const parsedDate = parseISO(date)

  return (
    <article className={styles.container}>
      <div className={styles.limiter}>
        <div className={styles.headline}>
          <h1>{title}</h1>
          <p>{description}</p>
          <time dateTime={date}>
            {format(parsedDate, `d 'de' LLLL 'de' yyyy`, { locale: ptBR })}
          </time>
        </div>
        <div className={styles.authorSnippet}>
          <img src={urlFor(author.avatar).width(40).url()} alt={author.name}/>
          <span>{author.name}</span>
        </div>
        <div className={styles.coverImage}>
          <img src={urlFor(coverImage).width(720).url()} alt={title}/>
        </div>
        <BlockContent className={styles.blockContent} blocks={content} serializers={serializers}/>
      </div>
    </article>
  )
}
