import { PieChart, Pie, Sector } from 'recharts'
import { CHART_COLORS } from '../chartTheme'
import styles from './GoalDonutChart.module.css'

// Dimensions mesurées dans la maquette : 162px de diamètre,
// et un trou qui fait la moitié de l'anneau.
const OUTER_RADIUS = 81
const INNER_RADIUS = 41

// Recharts passe l'index de la part dessinée : 0 = réalisées, 1 = restantes.
// IMPORTANT : ces composants sont déclarés AU NIVEAU DU MODULE.
// Définis à l'intérieur de GoalDonutChart, ils seraient recréés à chaque rendu,
// et Recharts les prendrait pour de nouveaux composants — animations relancées.
const ProgressSector = (props) => (
  <Sector
    {...props}
    fill={props.index === 0 ? CHART_COLORS.primary : CHART_COLORS.primaryLight}
  />
)

const EmptySector = (props) => <Sector {...props} fill={CHART_COLORS.primaryLight} />

/**
 * Progression hebdomadaire : séances réalisées vs objectif.
 *
 * Mise en page : légende « réalisées » à gauche, donut au centre, légende
 * « restantes » à droite, sur une même ligne. Le donut est tourné pour que
 * chaque part soit face à sa légende : 1 sur 2 donne une moitié gauche
 * foncée et une moitié droite claire.
 *
 * @param {number} completed - séances effectuées
 * @param {number} goal - objectif de séances
 */
function GoalDonutChart({ completed, goal }) {
  // Math.max évite une part négative si l'objectif est dépassé
  const remaining = Math.max(goal - completed, 0)

  // Cas limite : 0 séance et 0 objectif. Un camembert de valeurs nulles
  // ne dessine rien du tout, on affiche donc un anneau inerte.
  const isEmpty = completed === 0 && remaining === 0

  const data = isEmpty
    ? [{ name: 'vide', value: 1 }]
    : [
        { name: 'réalisées', value: completed },
        { name: 'restantes', value: remaining },
      ]

  // Angle occupé par la part « réalisées », en degrés (1 sur 2 → 180°)
  const completedAngle = isEmpty ? 0 : (completed / (completed + remaining)) * 360

  // Recharts mesure les angles depuis 3 h, dans le sens inverse des aiguilles
  // d'une montre (90° = 12 h, 180° = 9 h). On démarre la part « réalisées »
  // de façon à ce qu'elle soit centrée sur 9 h (à gauche, face à sa légende) ;
  // la part « restantes » se retrouve alors centrée sur 3 h (à droite).
  const startAngle = 180 - completedAngle / 2

  return (
    <div className={styles.chart}>
      {!isEmpty && (
        <p className={`${styles.label} ${styles.labelCompleted}`}>
          <span className={`${styles.dot} ${styles.dotCompleted}`} aria-hidden="true" />
          {completed} réalisée{completed > 1 ? 's' : ''}
        </p>
      )}

      {/* Taille fixe : le donut de la maquette ne change pas de taille */}
      <div className={styles.donut}>
        <PieChart
          width={OUTER_RADIUS * 2}
          height={OUTER_RADIUS * 2}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Pie
            data={data}
            dataKey="value"
            innerRadius={INNER_RADIUS}
            outerRadius={OUTER_RADIUS}
            startAngle={startAngle}
            endAngle={startAngle + 360} // un tour complet
            cornerRadius={3} // coins légèrement arrondis
            stroke="none" // pas de liseré entre les parts
            shape={isEmpty ? EmptySector : ProgressSector}
          />
        </PieChart>
      </div>

      {!isEmpty && (
        <p className={`${styles.label} ${styles.labelRemaining}`}>
          <span className={`${styles.dot} ${styles.dotRemaining}`} aria-hidden="true" />
          {remaining} restante{remaining > 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}

export default GoalDonutChart