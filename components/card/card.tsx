import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { urlFor } from '../../utils/sanity'
import styles from './card.module.scss'

export default function Card({ coverImage, date, title, description }) {
  const parsedDate = parseISO(date)

  return (
    <div className={styles.component}>
      <div className={styles.thumbnail}>
        <img src={urlFor(coverImage).width(480).url()} alt={title}/>
      </div>
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
