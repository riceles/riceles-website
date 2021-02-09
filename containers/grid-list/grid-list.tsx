import { ReactNode } from 'react'
import styles from './grid-list.module.scss'

export interface GridListProps {
  children: ReactNode
}

export default function GridList({ children }: GridListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.limiter}>
        {children}
      </ul>
    </div>
  )
}
