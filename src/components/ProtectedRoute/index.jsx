import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Route de garde : laisse passer les routes enfants si une session existe,
 * sinon redirige vers la page de connexion.
 */
function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  // Mémorise l'URL demandée pour pouvoir y revenir après connexion
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/connexion"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  // <Outlet /> = "affiche ici la route enfant qui correspond à l'URL"
  return <Outlet />
}

export default ProtectedRoute