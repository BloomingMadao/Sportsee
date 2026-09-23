import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts'
import styles from './GoalDonutChart.module.css'

const COLOR_COMPLETED = '#0B23F4'
const COLOR_REMAINING = '#B6BDFC'

// Recharts passe l'index de la part dessinée : 0 = réalisées, 1 = restantes.
// IMPORTANT : ces composants sont déclarés AU NIVEAU DU MODULE.
// Définis à l'intérieur de GoalDonutChart, ils seraient recréés à chaque rendu,
// et Recharts les prendrait pour de nouveaux composants — animations relancées.
const ProgressSector = (props) => (
  <Sector {...props} fill={props.index === 0 ? COLOR_COMPLETED : COLOR_REMAINING} />
)

const EmptySector = (props) => <Sector {...props} fill={COLOR_REMAINING} />

/**
 * Progression hebdomadaire : séances réalisées vs objectif.
 * @param {number} completed - séances effectuées
 * @param {number} goal - objectif de séances
 */
function GoalDonutChart({ completed, goal, height = 260 }) {
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

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="58%"
            outerRadius="88%"
            startAngle={90} // départ en haut
            endAngle={-270} // sens horaire sur un tour complet
            stroke="none" // pas de liseré entre les parts
            shape={isEmpty ? EmptySector : ProgressSector}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Légende écrite à la main : plus simple à styler que celle de Recharts */}
      {!isEmpty && (
        <ul className={styles.legend}>
          <li className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotCompleted}`} />
            {completed} réalisée{completed > 1 ? 's' : ''}
          </li>
          <li className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotRemaining}`} />
            {remaining} restante{remaining > 1 ? 's' : ''}
          </li>
        </ul>
      )}
    </div>
  )
}

export default GoalDonutChart