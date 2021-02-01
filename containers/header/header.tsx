import Link from 'next/link'
import BrazilFlag from '../../icons/brazil-flag'
import UsaFlag from '../../icons/usa-flag'
import SpainFlag from '../../icons/spain-flag'
import styles from './header.module.scss'

const localeOptions = [
  {
    name: 'Português (Brasil)',
    code: 'pt-BR',
    icon: BrazilFlag
  },
  {
    name: 'English (USA)',
    code: 'en-US',
    icon: UsaFlag
  },
  {
    name: 'Español (España)',
    code: 'es-ES',
    icon: SpainFlag
  }
]

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.limiter}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>
              <h1>Riceles</h1>
            </a>
          </Link>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href='/blog'>
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href='/produtos'>
                <a>Produtos</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.localeSwitcher}>
          <ul>
            {localeOptions.map(({ code, icon: Icon }) => (
              <li key={code}>
                <Icon/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
