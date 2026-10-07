import { useState } from 'react'
import { AuthContext } from './AuthContext'

// Clé unique dans localStorage. Le préfixe évite les collisions avec d'autres apps en localhost.
const STORAGE_KEY = 'sportsee.auth'

// Lit la session éventuellement sauvegardée lors d'une visite précédente.
function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const stored = raw ? JSON.parse(raw) : null

    // Une session n'est valable que si elle contient un jeton.
    // Sans cette vérification, une valeur comme {} (ancienne version de
    // l'app, modification à la main…) passait pour une session ouverte :
    // le dashboard attendait alors un jeton qui n'arrivait jamais → page blanche.
    const hasToken = typeof stored?.token === 'string' && stored.token !== ''
    return hasToken ? stored : null
  } catch {
    // Si la valeur stockée est corrompue, on repart d'une session vide plutôt que de planter.
    return null
  }
}

function AuthProvider({ children }) {
  // On passe la FONCTION, sans l'appeler : React ne l'exécute qu'au premier rendu.
  // Avec useState(readStoredAuth()), on lirait le localStorage à chaque rendu pour rien.
  const [auth, setAuth] = useState(readStoredAuth)

  // Appelée après une réponse réussie du backend (voir useLogin)
  function login({ token, userId }) {
    const next = { token, userId }
    setAuth(next) // met à jour React
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) // survit au rechargement
  }

  // Bouton « Se déconnecter » du header, et liens de la page d'erreur
  // (une session refusée par le serveur, 401/403, y est fermée).
  function logout() {
    setAuth(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Tout ce que les composants pourront lire via useAuth()
  const value = {
    token: auth?.token ?? null,
    userId: auth?.userId ?? null,
    // Connecté = on possède un jeton (et pas seulement un objet "auth")
    isAuthenticated: Boolean(auth?.token),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider