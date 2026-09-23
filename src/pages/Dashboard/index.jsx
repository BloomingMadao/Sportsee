import { useAuth } from '../../context/AuthContext'
import { getUserInfo, getUserActivity } from '../../services/userService'
import { getWeekRange } from '../../services/adapters/dateHelpers'
import { buildWeekSeries, summarizeActivity } from '../../services/adapters/activityAdapter'

function Dashboard() {
  const { token, userId } = useAuth()

  async function testInfo() {
    const user = await getUserInfo(token)
    console.log(user)
    console.log('totalDistance :', user.statistics.totalDistance, typeof user.statistics.totalDistance)
    console.log('durée :', user.statistics.totalDurationLabel)
    console.log('objectif :', user.weeklyGoal)
  }

  async function testActivity() {
    const { startWeek, endWeek } = getWeekRange(0) // semaine en cours
    console.log('période :', startWeek, '→', endWeek)

    const sessions = await getUserActivity(token, startWeek, endWeek)
    console.log('séances :', sessions)
    console.table(buildWeekSeries(sessions, startWeek))
    console.log('résumé :', summarizeActivity(sessions))
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Session active : {userId}</p>
      <button onClick={testInfo}>user-info</button>
      <button onClick={testActivity}>user-activity (7 jours)</button>
    </div>
  )
}

export default Dashboard