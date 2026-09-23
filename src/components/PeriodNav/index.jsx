import styles from './PeriodNav.module.css'

/**
 * Deux flèches encadrant éventuellement un libellé de période.
 * @param {string} [label] - ex. '28 mai - 25 juin'
 * @param {Function} onPrevious
 * @param {Function} onNext
 * @param {boolean} canGoNext - false pour bloquer l'accès au futur
 */
function PeriodNav({ label, onPrevious, onNext, canGoNext = true }) {
  return (
    <div className={styles.nav}>
      <button
        type="button"
        className={styles.button}
        onClick={onPrevious}
        aria-label="Période précédente"
      >
        ‹
      </button>

      {label && <span className={styles.label}>{label}</span>}

      <button
        type="button"
        className={styles.button}
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Période suivante"
      >
        ›
      </button>
    </div>
  )
}

export default PeriodNav