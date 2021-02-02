import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './blog-post-card.module.scss'

export default function BlogPostCard({ imageSource, date, title, description }) {
  const parsedDate = parseISO(date)

  return (
    <div className={styles.component}>
      <figure>
        <img src={imageSource} alt={title}/>
      </figure>
      <div className={styles.body}>
        <time dateTime={date}>
          {format(parsedDate, `d 'de' LLLL 'de' yyyy`, { locale: ptBR })}
        </time>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
