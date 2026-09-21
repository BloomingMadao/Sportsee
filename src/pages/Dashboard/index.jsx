import { useAuth } from '../../context/AuthContext'

function Dashboard() {
  const { isAuthenticated, userId, login, logout } = useAuth()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Connecté : {isAuthenticated ? `oui (${userId})` : 'non'}</p>
      <button onClick={() => login({ token: 'faux-jeton', userId: 'user123' })}>
        Simuler une connexion
      </button>
      <button onClick={logout}>Déconnexion</button>
    </div>
  )
}

export default Dashboard