import styles from './ChartLegend.module.css'

/**
 * Légende écrite à la main (plus simple à styler que celle de Recharts),
 * partagée par le graphique des kilomètres et celui des BPM.
 *
 * @param {Array<{label: string, color: string, symbol?: 'dot'|'line'}>} items
 *   symbol 'line' = petit trait avec un point au milieu (courbe de la moyenne)
 */
function ChartLegend({ items }) {
  return (
    <ul className={styles.legend}>
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          {/* aria-hidden : la pastille est décorative, le texte suffit */}
          <span
            className={item.symbol === 'line' ? styles.line : styles.dot}
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          {item.label}
        </li>
      ))}
    </ul>
  )
}

export default ChartLegend