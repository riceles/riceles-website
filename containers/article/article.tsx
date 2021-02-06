import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { urlFor } from '../../utils/sanity'
import styles from './article.module.scss'

export default function Article({ title, description, date, author, coverImage }) {
  const parsedDate = parseISO(date)

  return (
    <article className={styles.container}>
      <h1>{title}</h1>
      <p>{description}</p>
      <time dateTime={date}>
        {format(parsedDate, `d 'de' LLLL 'de' yyyy`, { locale: ptBR })}
      </time>
      <div>
        <img src={urlFor(author.avatar).width(64).url()} alt={author.name}/>
        <span>{author.name}</span>
      </div>
      <figure>
        <img src={urlFor(coverImage).width(720).url()} alt={title}/>
      </figure>
    </article>
  )
}
