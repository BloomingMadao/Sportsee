import { useUserInfo } from '../../hooks/useUserInfo'

function Dashboard() {
  const { data, isLoading, error } = useUserInfo()

  // Les "retours anticipés" évitent d'imbriquer trois ternaires dans le JSX
  if (isLoading) return <p>Chargement…</p>
  if (error) return <p>Impossible de charger vos données.</p>

  return (
    <div>
      <h1>Bonjour {data.profile.firstName}</h1>
      <p>
        {data.statistics.totalSessions} séances · {data.statistics.totalDistance} km ·{' '}
        {data.statistics.totalDurationLabel}
      </p>
      <p>Objectif hebdomadaire : {data.weeklyGoal} séances</p>
    </div>
  )
}

export default Dashboard