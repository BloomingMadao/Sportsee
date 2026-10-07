import { useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
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
import styles from './WeeklyBarChart.module.css'

/**
 * Graduations de 10 en 10, comme la maquette (0, 10, 20, 30).
 * La dernière est la dizaine au-dessus de la plus grande valeur :
 * 24 km → jusqu'à 30, 31 km → jusqu'à 40.
 */
function getTicks(data, dataKey) {
  const max = Math.max(0, ...data.map((entry) => entry[dataKey]))
  const top = Math.max(10, Math.ceil(max / 10) * 10)

  const ticks = []
  for (let value = 0; value <= top; value += 10) ticks.push(value)
  return ticks
}

/**
 * Contenu de l'infobulle : « 01.06 au 07.06 » puis « 19,6 km ».
 * Déclaré hors du composant pour ne pas être recréé à chaque rendu.
 */
function WeekTooltip({ active, payload, unit }) {
  if (!active || !payload?.length) return null

  // payload[0].payload = l'objet complet de la semaine (label, from, to, distance…)
  const week = payload[0].payload

  return (
    <ChartTooltip
      title={`${formatShortDate(week.from)} au ${formatShortDate(week.to)}`}
      // toLocaleString('fr-FR') : 19.6 devient « 19,6 »
      value={`${payload[0].value.toLocaleString('fr-FR')} ${unit}`}
    />
  )
}

/**
 * Graphique en barres des totaux hebdomadaires (4 dernières semaines).
 *
 * Couleur des barres : bleu clair au repos, bleu foncé dès que la souris
 * entre dans le graphique. Ce changement est fait en CSS (voir le module),
 * avec une transition : c'est l'animation prévue dans la maquette.
 * (Pas de :global() dans le CSS : cette syntaxe propre aux CSS Modules
 * n'est pas du CSS standard et le validateur W3C la refuse.)
 *
 * @param {Array} data - sortie de buildWeeklyTotals (label, from, to, distance…)
 * @param {string} dataKey - propriété à dessiner : 'distance', 'calories'…
 * @param {string} unit - unité affichée dans l'infobulle : 'km'
 * @param {string} legend - texte de la légende : 'Km'
 * @param {number} [height]
 */
function WeeklyBarChart({ data, dataKey, unit, legend, height = CHART_HEIGHT }) {
  // Maquette : le haut de l'infobulle est aligné sur le sommet de la barre
  // survolée. On retient donc le "y" de cette barre ; le "x", lui, reste
  // géré par Recharts (il bascule à gauche près du bord droit).
  const [tooltipY, setTooltipY] = useState()

  const ticks = getTicks(data, dataKey)

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 8, right: 35, bottom: 0, left: 0 }}>
          <CartesianGrid
            vertical={false}
            stroke={GRID_COLOR}
            strokeDasharray={GRID_DASH}
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
            domain={[0, ticks[ticks.length - 1]]}
            ticks={ticks}
            tickLine={false}
            axisLine={AXIS_LINE}
            tick={Y_TICK}
            tickMargin={4}
            width="auto"
          />

          {/* shared={false} : l'infobulle n'apparaît qu'au survol d'une barre.
              cursor={false} : pas de bande grise derrière la barre (absente de la maquette). */}
          <Tooltip
            content={(props) => <WeekTooltip {...props} unit={unit} />}
            cursor={false}
            shared={false}
            position={{ y: tooltipY }}
          />

          {/* className : sert de point d'accroche au CSS du survol */}
          <Bar
            className={styles.bars}
            dataKey={dataKey}
            fill={CHART_COLORS.primaryLight}
            barSize={BAR_SIZE}
            radius={BAR_RADIUS}
            onMouseEnter={(bar) => setTooltipY(bar.y)}
          />
        </BarChart>
      </ResponsiveContainer>

      <ChartLegend items={[{ label: legend, color: CHART_COLORS.legendKm }]} />
    </div>
  )
}

export default WeeklyBarChart