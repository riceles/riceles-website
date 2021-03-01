import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'
import styles from './card.module.scss'

export interface CardProps {
  slug: string
  coverImageUrl: string
  date: string
  title: string
  description: string
}

export default function Card({ slug, coverImageUrl, date, title, description }: CardProps) {
  const parsedDate = parseISO(date)

  return (
    <div className={styles.component}>
      <div className={styles.thumbnail}>
        <img src={coverImageUrl} alt={title}/>
      </div>
      <div className={styles.body}>
        <time dateTime={date}>
          {format(parsedDate, `d 'de' LLLL 'de' yyyy`, { locale: ptBR })}
        </time>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href={`/blog/${slug}`}>
          <button>Ler mais</button>
        </Link>
      </div>
    </div>
  )
}
