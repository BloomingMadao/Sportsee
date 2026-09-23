import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

/**
 * Graphique en barres d'une série hebdomadaire (7 jours).
 *
 * @param {Array} data - sortie de buildWeekSeries
 * @param {string} dataKey - propriété à dessiner : 'distance', 'calories', 'duration'…
 * @param {string} label - nom affiché dans l'infobulle
 * @param {string} unit - suffixe des valeurs : 'km', 'kcal'…
 * @param {string} color - couleur des barres
 * @param {number} [height] - hauteur du graphique en pixels
 */
function WeeklyBarChart({ data, dataKey, label, unit, color, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 16, right: 8, bottom: 8, left: 8 }}>
        <CartesianGrid vertical={false} stroke="#E8E9F5" />

        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#707070', fontSize: 13 }}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#707070', fontSize: 13 }}
          unit={` ${unit}`}
          width="auto"
        />

        <Tooltip
          cursor={{ fill: '#F2F3FF' }}
          formatter={(value) => [`${value} ${unit}`, label]}
        />

        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default WeeklyBarChart