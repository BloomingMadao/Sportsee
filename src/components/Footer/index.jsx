import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>©Sportsee Tous droits réservés</p>
        <p className={styles.links}>
          <span>Conditions générales</span>
          <span>Contact</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer