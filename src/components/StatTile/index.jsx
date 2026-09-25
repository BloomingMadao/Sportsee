import styles from './StatTile.module.css'

/**
 * Tuile bleue de la page Profil.
 * @param {string} label - ex. 'Calories brûlées'
 * @param {string|number} value - valeur mise en avant
 * @param {string} unit - unité, affichée en plus clair
 */
function StatTile({ label, value, unit }) {
  return (
    <div className={styles.tile}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>
        {value}
        <span className={styles.unit}> {unit}</span>
      </p>
    </div>
  )
}

export default StatTile