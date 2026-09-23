import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserActivity } from '../services/userService'

/**
 * Charge les séances d'une période donnée.
 * @param {string} startWeek - 'AAAA-MM-JJ'
 * @param {string} endWeek - 'AAAA-MM-JJ'
 * @returns {{ sessions: Array, isLoading: boolean, error: Error|null }}
 */
export function useUserActivity(startWeek, endWeek) {
  const { token } = useAuth()

  // [] et non null : les composants pourront faire .map() sans vérification
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token || !startWeek || !endWeek) return

    let ignore = false

    setIsLoading(true)
    setError(null)

    getUserActivity(token, startWeek, endWeek)
      .then((result) => {
        if (!ignore) setSessions(result)
      })
      .catch((err) => {
        if (!ignore) {
          setError(err)
          // On vide la liste : mieux vaut un graphique vide que les données
          // de la semaine précédente affichées sous un message d'erreur.
          setSessions([])
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
    // Trois primitives : React les compare par valeur, pas par référence
  }, [token, startWeek, endWeek])

  return { sessions, isLoading, error }
}