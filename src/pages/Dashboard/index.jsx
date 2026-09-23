import { useState, useMemo } from 'react'
import { useUserInfo } from '../../hooks/useUserInfo'
import { useUserActivity } from '../../hooks/useUserActivity'
import { getWeekRange } from '../../services/adapters/dateHelpers'
import { buildWeekSeries, summarizeActivity } from '../../services/adapters/activityAdapter'
import WeeklyDistanceChart from '../../components/charts/WeeklyDistanceChart'
import WeeklyCaloriesChart from '../../components/charts/WeeklyCaloriesChart'

function Dashboard() {
  // 0 = semaine en cours, -1 = précédente, etc.
  const [weekOffset, setWeekOffset] = useState(0)

  // useMemo : ne recalcule QUE si weekOffset change.
  // Sans lui, getWeekRange produirait un nouvel objet à chaque rendu,
  // et les chaînes extraites relanceraient inutilement le hook.
  const { startWeek, endWeek } = useMemo(
    () => getWeekRange(weekOffset),
    [weekOffset]
  )

  const { data: user, isLoading: isUserLoading } = useUserInfo()
  const { sessions, isLoading: isActivityLoading } = useUserActivity(startWeek, endWeek)

  // Même logique : on ne retransforme les séances que si elles ont changé
  const weekSeries = useMemo(
    () => buildWeekSeries(sessions, startWeek),
    [sessions, startWeek]
  )
  const summary = useMemo(() => summarizeActivity(sessions), [sessions])

  if (isUserLoading) return <p>Chargement…</p>

  return (
    <div>
      <h1>Bonjour {user?.profile.firstName}</h1>

      <div>
        <button onClick={() => setWeekOffset((n) => n - 1)}>← Semaine précédente</button>
        <span> {startWeek} → {endWeek} </span>
        {/* Interdit d'aller dans le futur : aucune donnée n'y existe */}
        <button onClick={() => setWeekOffset((n) => n + 1)} disabled={weekOffset >= 0}>
          Semaine suivante →
        </button>
      </div>

      {isActivityLoading ? (
        <p>Chargement de la semaine…</p>
      ) : (
        <>
          <p>
            {summary.sessionCount} séances · {summary.totalDistance} km ·{' '}
            {summary.totalCalories} kcal
          </p>
          <WeeklyDistanceChart data={weekSeries} />
          <WeeklyCaloriesChart data={weekSeries} />
        </>
      )}
    </div>
  )
}

export default Dashboard