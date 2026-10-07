import styles from './ChartTooltip.module.css'

/**
 * Infobulle noire de la maquette, partagée par les graphiques.
 * Recharts s'occupe de l'afficher et de la placer ; ce composant ne fait
 * que le rendu (voir la prop "content" de <Tooltip>).
 *
 * @param {string} title - ex. '01.06 au 07.06'
 * @param {string} value - ex. '19,6 km'
 * @param {string} [detail] - ligne secondaire facultative
 */
function ChartTooltip({ title, value, detail }) {
  return (
    <div className={styles.tooltip}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
      {detail && <p className={styles.detail}>{detail}</p>}
    </div>
  )
}

export default ChartTooltip