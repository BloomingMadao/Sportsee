import { useAuth } from '../../context/AuthContext'

function Dashboard() {
  const { userId } = useAuth()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Session active : {userId}</p>
    </div>
  )
}

export default Dashboard