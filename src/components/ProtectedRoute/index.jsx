import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Route de garde : laisse passer les routes enfants si une session existe,
 * sinon redirige vers la page de connexion.
 */
function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to="/connexion" replace />

  // <Outlet /> = "affiche ici la route enfant qui correspond à l'URL"
  return <Outlet />
}

export default ProtectedRoute