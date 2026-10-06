import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserInfo } from '../services/userService'
import { useApiRequest } from './useApiRequest'

/**
 * Charge le profil et les statistiques de l'utilisateur connecté.
 * @returns {{ data: object|null, isLoading: boolean, error: Error|null }}
 */
export function useUserInfo() {
  const { token } = useAuth()

  // useMemo : la MÊME fonction est conservée tant que le jeton ne change pas.
  // C'est ce qui évite de relancer la requête à chaque rendu.
  const request = useMemo(
    () => (token ? () => getUserInfo(token) : null),
    [token]
  )

  return useApiRequest(request, null)
}