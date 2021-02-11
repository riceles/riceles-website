import styles from './footer.module.scss'

const curYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.limiter}>
        <p>Riceles Costa &copy; Copyright {curYear} | Todos os direitos reservados</p>
        <p>Desenvolvido por <a href='https://www.linkedin.com/in/luckasnix'>Lucas Costa</a></p>
      </div>
    </footer>
  )
}
