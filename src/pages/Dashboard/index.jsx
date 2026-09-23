import { useAuth } from '../../context/AuthContext'
import { getUserInfo, getUserActivity } from '../../services/userService'

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
    // Les 7 derniers jours
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 6)
    const iso = (d) => d.toLocaleDateString('sv-SE') // astuce : 'sv-SE' donne AAAA-MM-JJ

    const data = await getUserActivity(token, iso(start), iso(end))
    console.log(`${data.length} séance(s)`, data)
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