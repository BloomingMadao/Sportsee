import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Le chemin de la page d'erreur est défini ICI, une seule fois.
// App.jsx importe ERROR_ROUTE : impossible que la route déclarée
// et l'URL de redirection ne correspondent plus.
export const ERROR_ROUTE = '/error/:status'
export const getErrorPath = (status) => `/error/${status}`

// 401 et 403 = session absente ou expirée. Ces deux cas sont déjà gérés :
// api/index.js prévient l'AuthProvider (sessionEvents), qui vide la session,
// puis ProtectedRoute renvoie vers /connexion. On ne doit donc pas
// rediriger une deuxième fois vers la page d'erreur.
const HANDLED_BY_SESSION = [401, 403]

/**
 * Redirige vers la page d'erreur commune dès qu'une erreur apparaît.
 *
 * @param {Error|null} error - l'erreur à surveiller (ApiError en général)
 * @param {object} [options]
 * @param {number[]} [options.ignore] - codes à NE PAS rediriger
 *   (ils sont gérés ailleurs). Doit être une constante déclarée hors du
 *   composant : un tableau recréé à chaque rendu relancerait l'effet.
 */
export function useErrorRedirect(error, { ignore = HANDLED_BY_SESSION } = {}) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!error || ignore.includes(error.status)) return

    // ?? 500 : une erreur JavaScript classique n'a pas de "status"
    // replace: true → la page en échec ne reste pas dans l'historique,
    // le bouton « Précédent » ne ramène pas sur une page cassée.
    navigate(getErrorPath(error.status ?? 500), { replace: true })
  }, [error, ignore, navigate])
}