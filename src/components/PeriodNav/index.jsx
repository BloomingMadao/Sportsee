import styles from './PeriodNav.module.css'

/**
 * Chevron en SVG (au lieu des caractères ‹ ›, dont le dessin dépend de la
 * police). stroke="currentColor" : il prend la couleur du texte du bouton,
 * y compris au survol.
 * @param {'left'|'right'} direction
 */
function Chevron({ direction }) {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M6 1 1 6l5 5' : 'M2 1l5 5-5 5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
        <Chevron direction="left" />
      </button>

      {label && <span className={styles.label}>{label}</span>}

      <button
        type="button"
        className={styles.button}
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Période suivante"
      >
        <Chevron direction="right" />
      </button>
    </div>
  )
}

export default PeriodNav