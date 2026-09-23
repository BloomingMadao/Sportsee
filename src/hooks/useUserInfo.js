import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserInfo } from '../services/userService'

/**
 * Charge le profil et les statistiques de l'utilisateur connecté.
 * @returns {{ data: object|null, isLoading: boolean, error: Error|null }}
 */
export function useUserInfo() {
  const { token } = useAuth()

  const [data, setData] = useState(null)
  // true dès le départ : au premier rendu, la requête n'a pas encore répondu
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return

    // Drapeau anti-réponse-obsolète. Voir l'explication ci-dessous.
    let ignore = false

    setIsLoading(true)
    setError(null)

    getUserInfo(token)
      .then((result) => {
        if (!ignore) setData(result)
      })
      .catch((err) => {
        if (!ignore) setError(err)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    // Fonction de nettoyage : React l'exécute avant de relancer l'effet
    // et au démontage du composant.
    return () => {
      ignore = true
    }
  }, [token])

  return { data, isLoading, error }
}