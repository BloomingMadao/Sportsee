import { useAuth } from '../../context/AuthContext'
import { useLogin } from '../../hooks/useLogin'

function Dashboard() {
  const { isAuthenticated, userId, logout } = useAuth()
  const { submit, isLoading, error } = useLogin()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Connecté : {isAuthenticated ? `oui (${userId})` : 'non'}</p>
      {isLoading && <p>Connexion en cours…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={() => submit('sophiemartin', 'password123')}>
        Bons identifiants
      </button>
      <button onClick={() => submit('sophiemartin', 'mauvais')}>
        Mauvais mot de passe
      </button>
      <button onClick={logout}>Déconnexion</button>
    </div>
  )
}

export default Dashboard