import { useState } from 'react'
import { login as loginRequest } from '../services/authService'
import { useAuth } from '../context/AuthContext'

/**
 * Traduit une ApiError en message affichable par l'utilisateur.
 * Les messages du backend sont en anglais et parfois techniques :
 * on ne les montre jamais tels quels.
 */
function getErrorMessage(error) {
  switch (error.status) {
    case 0:
      return 'Serveur injoignable. Vérifiez votre connexion.'
    case 400:
      return 'Veuillez renseigner votre identifiant et votre mot de passe.'
    case 401:
      return 'Identifiant ou mot de passe incorrect.'
    default:
      return 'Une erreur est survenue. Réessayez dans un instant.'
  }
}

export function useLogin() {
  // On récupère la fonction du contexte et on la renomme pour éviter
  // la confusion avec loginRequest (le réseau) et submit (notre fonction).
  const { login: saveSession } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * @returns {Promise<boolean>} true si la connexion a réussi
   */
  async function submit(username, password) {
    setIsLoading(true)
    setError(null) // on efface l'erreur précédente avant de retenter

    try {
      // authService choisit tout seul entre le mock et le vrai backend
      const data = await loginRequest(username, password)

      // data vaut { token, userId } : on le range dans le contexte
      saveSession(data)
      return true
    } catch (err) {
      setError(getErrorMessage(err))
      return false
    } finally {
      // finally s'exécute dans les deux cas : succès comme échec.
      // Sans lui, il faudrait écrire setIsLoading(false) deux fois.
      setIsLoading(false)
    }
  }

  return { submit, isLoading, error }
}