import styles from './StatCard.module.css'

/**
 * Carte d'une statistique chiffrée.
 * @param {string} label - intitulé, ex. "Durée d'activité"
 * @param {number|string} value - la valeur mise en avant
 * @param {string} unit - unité affichée en plus clair
 * @param {'primary'|'accent'} variant - couleur de la valeur
 */
function StatCard({ label, value, unit, variant = 'primary' }) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={`${styles.value} ${styles[variant]}`}>
        {value}
        <span className={styles.unit}> {unit}</span>
      </p>
    </div>
  )
}

export default StatCard