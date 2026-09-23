import Card from '../Card'
import PeriodNav from '../PeriodNav'
import styles from './ChartCard.module.css'

/**
 * Carte de graphique : titre chiffré, navigation, sous-titre, puis le graphique.
 * @param {string} title - ex. '18 km en moyenne'
 * @param {'primary'|'accent'} variant - couleur du titre
 * @param {string} subtitle
 * @param {object} nav - props transmises à PeriodNav
 * @param {ReactNode} children - le graphique
 */
function ChartCard({ title, variant = 'primary', subtitle, nav, children }) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3 className={`${styles.title} ${styles[variant]}`}>{title}</h3>
        {nav && <PeriodNav {...nav} />}
      </div>

      <p className={styles.subtitle}>{subtitle}</p>

      {children}
    </Card>
  )
}

export default ChartCard