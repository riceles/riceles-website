import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import enUS from 'date-fns/locale/en-US'
import esES from 'date-fns/locale/es'
import Link from 'next/link'
import t from '../../utils/translations'
import styles from './card.module.scss'

function getLocaleObj(locale: string) {
  switch (locale) {
    case 'en-US':
      return enUS
    case 'es-ES':
      return esES
    default:
      return ptBR
  }
}

export interface CardProps {
  locale: string
  slug: string
  coverImageUrl: string
  date: string
  title: string
  description: string
}

export default function Card({ locale, slug, coverImageUrl, date, title, description }: CardProps) {
  const parsedDate = parseISO(date)

  return (
    <div className={styles.component}>
      <div className={styles.thumbnail}>
        <img src={coverImageUrl} alt={title}/>
      </div>
      <div className={styles.body}>
        <time dateTime={date}>
          {format(parsedDate, t[locale].card.dateFormat, { locale: getLocaleObj(locale) })}
        </time>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href={`/blog/${slug}`}>
          <button>{t[locale].card.buttonText}</button>
        </Link>
      </div>
    </div>
  )
}
