import { useAuth } from '../../context/AuthContext'
import { getUserInfo, getUserActivity } from '../../services/userService'

function Dashboard() {
  const { token, userId } = useAuth()

  async function testInfo() {
    const data = await getUserInfo(token)
    console.log(data)
    console.log('type de totalDistance :', typeof data.statistics.totalDistance)
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