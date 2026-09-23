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
import styles from './HeartRateChart.module.css'

const COLOR_MIN = '#FCC1B6'
const COLOR_MAX = '#F4320B'
const COLOR_AVERAGE = '#0B23F4'

/**
 * Calcule un domaine vertical lisible, arrondi aux 5 les plus proches.
 * Sans ça, l'axe partirait de 0 et écraserait toutes les barres en haut.
 */
function getDomain(data) {
  const values = data
    .flatMap((day) => [day.heartRateMin, day.heartRateMax])
    .filter((value) => value !== null)

  if (values.length === 0) return [120, 200] // semaine vide : échelle par défaut

  return [
    Math.floor(Math.min(...values) / 5) * 5 - 5,
    Math.ceil(Math.max(...values) / 5) * 5 + 5,
  ]
}

/**
 * Fréquence cardiaque de la semaine : min et max en barres, moyenne en courbe.
 * @param {Array} data - sortie de buildWeekSeries
 */
function HeartRateChart({ data, height = 280 }) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        {/* barGap : écart entre les deux barres d'un même jour */}
        <ComposedChart data={data} barGap={2} margin={{ top: 16, right: 8, bottom: 8 }}>
          <CartesianGrid vertical={false} stroke="#E8E9F5" />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#707070', fontSize: 13 }}
          />

          <YAxis
            domain={getDomain(data)}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#707070', fontSize: 13 }}
            width="auto"
            allowDecimals={false}
          />

          <Tooltip
            cursor={{ fill: '#F2F3FF' }}
            formatter={(value) => `${value} BPM`}
          />

          {/* name= : le libellé lu par l'infobulle */}
          <Bar
            dataKey="heartRateMin"
            name="Min"
            fill={COLOR_MIN}
            radius={[8, 8, 8, 8]}
            maxBarSize={10}
          />
          <Bar
            dataKey="heartRateMax"
            name="Max"
            fill={COLOR_MAX}
            radius={[8, 8, 8, 8]}
            maxBarSize={10}
          />

          {/* connectNulls : la courbe enjambe les jours sans séance */}
          <Line
            type="monotone"
            dataKey="heartRateAverage"
            name="Moyenne"
            stroke="#E4E6F8"
            strokeWidth={2}
            dot={{ r: 3, fill: COLOR_AVERAGE, stroke: 'none' }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>

      <ul className={styles.legend}>
        <li className={styles.legendItem}>
          <span className={styles.dot} style={{ backgroundColor: COLOR_MIN }} />
          Min
        </li>
        <li className={styles.legendItem}>
          <span className={styles.dot} style={{ backgroundColor: COLOR_MAX }} />
          Max
        </li>
        <li className={styles.legendItem}>
          <span className={styles.dot} style={{ backgroundColor: COLOR_AVERAGE }} />
          Moyenne
        </li>
      </ul>
    </div>
  )
}

export default HeartRateChart