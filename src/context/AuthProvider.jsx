import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { onSessionExpired } from '../services/sessionEvents'

// Clé unique dans localStorage. Le préfixe évite les collisions avec d'autres apps en localhost.
const STORAGE_KEY = 'sportsee.auth'

// Lit la session éventuellement sauvegardée lors d'une visite précédente.
function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    // Si la valeur stockée est corrompue, on repart d'une session vide plutôt que de planter.
    return null
  }
}

function AuthProvider({ children }) {
  // On passe la FONCTION, sans l'appeler : React ne l'exécute qu'au premier rendu.
  // Avec useState(readStoredAuth()), on lirait le localStorage à chaque rendu pour rien.
  const [auth, setAuth] = useState(readStoredAuth)


  // useEffect exécute du code APRÈS le rendu, pour tout ce qui sort de React :
  // abonnements, minuteurs, accès au DOM. Ici, on s'abonne une seule fois.
  useEffect(() => {
    // La valeur renvoyée par un effet est sa fonction de nettoyage.
    // onSessionExpired renvoie justement le désabonnement : on le retourne tel quel.
    return onSessionExpired(() => {
      setAuth(null)
      localStorage.removeItem(STORAGE_KEY)
    })
  }, []) // tableau vide = exécuté au montage uniquement
  // Appelée après une réponse réussie du backend, à l'étape 4b.
  function login({ token, userId }) {
    const next = { token, userId }
    setAuth(next) // met à jour React
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) // survit au rechargement
  }

  function logout() {
    setAuth(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Tout ce que les composants pourront lire via useAuth()
  const value = {
    token: auth?.token ?? null,
    userId: auth?.userId ?? null,
    isAuthenticated: auth !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider