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
 * Calories brûlées jour par jour sur une semaine.
 * @param {Array} data - sortie de buildWeekSeries : 7 objets { label, calories, … }
 */
function WeeklyCaloriesChart({ data }) {
  return (
    // ResponsiveContainer mesure son parent et transmet les dimensions au graphique.
    // Sans lui, il faudrait écrire width={600} height={280} en dur.
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 16, right: 8, bottom: 8, left: -16 }}>
        {/* Seulement les lignes horizontales : plus lisible que le quadrillage complet */}
        <CartesianGrid vertical={false} stroke="#E8E9F5" />

        {/* L'axe du bas lit la propriété "label" : Lun, Mar, Mer… */}
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
          // unit ajoute le suffixe aux graduations sans toucher aux données
          unit=" kcal"
        />

        {/* Infobulle au survol. cursor grise la colonne visée. */}
        <Tooltip
          cursor={{ fill: '#F2F3FF' }}
          formatter={(value) => [`${value} kcal`, 'Calories']}
        />

        {/* La barre elle-même. radius arrondit les deux coins du haut. */}
        <Bar
          dataKey="calories"
          fill="#F4320B"
          radius={[6, 6, 0, 0]}
          maxBarSize={32}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default WeeklyCaloriesChart