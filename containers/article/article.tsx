import BlockContent from '@sanity/block-content-to-react'
import FormattedDate from '../../components/formatted-date'
import { urlFor, ContentItem } from '../../utils/sanity'
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

export interface ArticleProps {
  locale: string
  title: string
  description: string
  date: string
  authorName: string
  authorAvatarUrl: string
  coverImageUrl: string
  coverImageCaption: string
  content: ContentItem[]
}

export default function Article({
  locale,
  title,
  description,
  date,
  authorName,
  authorAvatarUrl,
  coverImageUrl,
  coverImageCaption,
  content
}: ArticleProps) {
  return (
    <article className={styles.container}>
      <div className={styles.limiter}>
        <div className={styles.headline}>
          <h1>{title}</h1>
          <p>{description}</p>
          <FormattedDate locale={locale}>{date}</FormattedDate>
        </div>
        <div className={styles.authorSnippet}>
          <img src={authorAvatarUrl} alt={authorName}/>
          <span>{authorName}</span>
        </div>
        <figure className={styles.coverImage}>
          <img src={coverImageUrl} alt={title}/>
          <figcaption>{coverImageCaption}</figcaption>
        </figure>
        <BlockContent className={styles.blockContent} blocks={content} serializers={serializers}/>
      </div>
    </article>
  )
}
