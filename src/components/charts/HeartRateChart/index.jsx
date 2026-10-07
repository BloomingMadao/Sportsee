import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import ChartTooltip from '../ChartTooltip'
import ChartLegend from '../ChartLegend'
import {
  CHART_COLORS,
  AXIS_LINE,
  GRID_COLOR,
  GRID_DASH,
  X_TICK,
  Y_TICK,
  BAR_SIZE,
  BAR_RADIUS,
  CHART_HEIGHT,
} from '../chartTheme'
import { formatShortDate } from '../../../services/adapters/dateHelpers'
import styles from './HeartRateChart.module.css'

const TICK_COUNT = 4 // la maquette affiche 4 graduations
const EMPTY_DOMAIN = [120, 200] // semaine sans séance : échelle par défaut

const LEGEND_ITEMS = [
  { label: 'Min', color: CHART_COLORS.heartRateMin },
  { label: 'Max BPM', color: CHART_COLORS.heartRateMax },
  { label: 'Moyenne BPM', color: CHART_COLORS.primary, symbol: 'line' },
]

/**
 * Échelle verticale, comme la maquette (130 → 187) :
 * - en bas, une dizaine nettement sous le plus petit BPM (137 → 130, 140 → 130) ;
 * - en haut, le pic de la semaine (187), atteint par la plus haute barre ;
 * - 4 graduations régulièrement espacées entre les deux.
 * Sans ça, l'axe partirait de 0 et écraserait toutes les barres en haut.
 */
function getScale(data) {
  const values = data
    .flatMap((day) => [day.heartRateMin, day.heartRateMax])
    .filter((value) => value !== null)

  let [bottom, top] = EMPTY_DOMAIN

  if (values.length > 0) {
    // "- 5" : le bas de l'échelle reste au moins 5 BPM SOUS le plus petit Min.
    // Sans ça, un Min de 140 donnait un axe qui part de 140 : la barre Min
    // avait une hauteur nulle et disparaissait.
    bottom = Math.floor((Math.min(...values) - 5) / 10) * 10
    // Au moins 15 BPM d'écart, pour une semaine avec une seule valeur
    top = Math.max(Math.max(...values), bottom + 15)
  }

  const step = (top - bottom) / (TICK_COUNT - 1)
  const ticks = Array.from({ length: TICK_COUNT }, (_, index) =>
    Math.round(bottom + index * step)
  )

  return { domain: [bottom, top], ticks }
}

/**
 * Grille : en plus des lignes horizontales, la maquette ferme la zone par
 * un pointillé vertical à droite. On ne demande donc qu'une ligne verticale,
 * au bord droit de la zone de tracé.
 */
const rightBorderOnly = ({ offset }) => [offset.left + offset.width]

/** Infobulle : même pavé noir que le graphique des kilomètres */
function DayTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const day = payload[0].payload
  const title = `${day.label} ${formatShortDate(day.date)}`

  // Jour sans séance : on le dit, plutôt que de ne rien afficher au survol
  if (day.heartRateAverage === null) {
    return <ChartTooltip title={title} value="Aucune séance" />
  }

  return (
    <ChartTooltip
      title={title}
      value={`${day.heartRateAverage} BPM`}
      detail={`Min ${day.heartRateMin} · Max ${day.heartRateMax}`}
    />
  )
}

/**
 * Fréquence cardiaque de la semaine : min et max en barres, moyenne en courbe.
 * Au survol, la courbe passe du lavande au bleu foncé (CSS, voir le module).
 * @param {Array} data - sortie de buildWeekSeries
 */
function HeartRateChart({ data, height = CHART_HEIGHT }) {
  const { domain, ticks } = getScale(data)

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={height}>
        {/* barGap : écart de 4px entre la barre Min et la barre Max d'un même jour */}
        <ComposedChart data={data} barGap={4} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid
            stroke={GRID_COLOR}
            strokeDasharray={GRID_DASH}
            verticalCoordinatesGenerator={rightBorderOnly}
          />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={AXIS_LINE}
            tick={X_TICK}
            tickMargin={18}
            height={40}
          />

          <YAxis
            domain={domain}
            ticks={ticks}
            tickLine={false}
            axisLine={AXIS_LINE}
            tick={Y_TICK}
            width="auto"
          />

          {/* filterNull={false} : par défaut, Recharts retire les valeurs null
              de l'infobulle. Un jour sans séance n'a QUE des null : l'infobulle
              restait vide et ne s'affichait pas du tout. */}
          <Tooltip content={DayTooltip} cursor={false} filterNull={false} />

          {/* name= : le libellé lu par l'infobulle */}
          <Bar
            dataKey="heartRateMin"
            name="Min"
            fill={CHART_COLORS.heartRateMin}
            barSize={BAR_SIZE}
            radius={BAR_RADIUS}
          />
          <Bar
            dataKey="heartRateMax"
            name="Max"
            fill={CHART_COLORS.heartRateMax}
            barSize={BAR_SIZE}
            radius={BAR_RADIUS}
          />

          {/* type="natural" : courbe arrondie qui passe par chaque point, comme
              dans la maquette. connectNulls : elle enjambe les jours sans séance. */}
          <Line
            className={styles.averageLine} // accroche du CSS du survol
            type="natural"
            dataKey="heartRateAverage"
            name="Moyenne"
            stroke={CHART_COLORS.averageLine}
            strokeWidth={2}
            dot={{ r: 3, fill: CHART_COLORS.primary, stroke: 'none' }}
            activeDot={{ r: 5, fill: CHART_COLORS.primary, stroke: 'none' }}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>

      <ChartLegend items={LEGEND_ITEMS} />
    </div>
  )
}

export default HeartRateChart