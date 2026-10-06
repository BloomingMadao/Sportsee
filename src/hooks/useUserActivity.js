import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserActivity } from '../services/userService'
import { useApiRequest } from './useApiRequest'

// Déclaré hors du hook : la même référence à chaque rendu (voir useApiRequest)
const NO_SESSIONS = []

/**
 * Charge les séances d'une période donnée.
 * @param {string|null} startWeek - 'AAAA-MM-JJ' (null = pas encore connu)
 * @param {string|null} endWeek - 'AAAA-MM-JJ'
 * @returns {{ sessions: Array, isLoading: boolean, error: Error|null }}
 */
export function useUserActivity(startWeek, endWeek) {
  const { token } = useAuth()

  // Trois primitives en dépendances : React les compare par valeur.
  // Tant qu'une borne manque (page Profil avant la réponse user-info),
  // request vaut null et aucune requête ne part.
  const request = useMemo(
    () =>
      token && startWeek && endWeek
        ? () => getUserActivity(token, startWeek, endWeek)
        : null,
    [token, startWeek, endWeek]
  )

  // [] par défaut : les composants peuvent faire .map() sans vérification
  const { data, isLoading, error } = useApiRequest(request, NO_SESSIONS)

  return { sessions: data, isLoading, error }
}