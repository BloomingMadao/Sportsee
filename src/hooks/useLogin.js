import { useState } from 'react'
import { login as loginRequest } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import {
  LOGIN_FORM_STATUSES,
  getLoginErrorMessage,
} from '../services/errorMessages'
import { useErrorRedirect } from './useErrorRedirect'

export function useLogin() {
  // On récupère la fonction du contexte et on la renomme pour éviter
  // la confusion avec loginRequest (le réseau) et submit (notre fonction).
  const { login: saveSession } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  // On garde l'ApiError complète (et plus seulement un texte) :
  // c'est son "status" qui décide de ce qu'on en fait.
  const [error, setError] = useState(null)

  // Deux familles d'erreurs :
  // - 400 / 401 = erreur de saisie → message sous le formulaire (ignorées ici)
  // - 0, 500... = panne technique  → page d'erreur commune, comme partout
  useErrorRedirect(error, { ignore: LOGIN_FORM_STATUSES })

  const formError =
    error && LOGIN_FORM_STATUSES.includes(error.status)
      ? getLoginErrorMessage(error.status)
      : null

  /**
   * @returns {Promise<boolean>} true si la connexion a réussi
   */
  async function submit(username, password) {
    setIsLoading(true)
    setError(null) // on efface l'erreur précédente avant de retenter

    try {
      // authService ne sait même pas s'il parle au mock ou au vrai backend
      const data = await loginRequest(username, password)

      // data vaut { token, userId } : on le range dans le contexte
      saveSession(data)
      return true
    } catch (err) {
      setError(err)
      return false
    } finally {
      // finally s'exécute dans les deux cas : succès comme échec.
      setIsLoading(false)
    }
  }

  // Le formulaire reçoit directement un texte prêt à afficher (ou null), comme avant :
  // ConnexionForm n'a pas besoin d'être modifié.
  return { submit, isLoading, error: formError }
}