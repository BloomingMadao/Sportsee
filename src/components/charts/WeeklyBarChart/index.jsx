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
 * Graphique en barres générique (une barre par entrée de data).
 * Utilisé par le dashboard pour les 4 dernières semaines.
 *
 * @param {Array} data - sortie de buildWeeklyTotals (ou buildWeekSeries)
 * @param {string} dataKey - propriété à dessiner : 'distance', 'calories', 'duration'…
 * @param {string} label - nom affiché dans l'infobulle
 * @param {string} unit - suffixe des valeurs : 'km', 'kcal'…
 * @param {string} color - couleur des barres
 * @param {number} [height] - hauteur du graphique en pixels
 * @param {number} [barSize] - largeur maximale d'une barre
 * @param {number[]} [radius] - arrondis [haut-g, haut-d, bas-d, bas-g]
 */
function WeeklyBarChart({
  data,
  dataKey,
  label,
  unit,
  color,
  height = 280,
  barSize = 32,
  radius = [6, 6, 0, 0],
}) {
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

        <Bar dataKey={dataKey} fill={color} radius={radius} maxBarSize={barSize} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default WeeklyBarChart