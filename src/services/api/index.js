import { USE_MOCK } from '../../config'
import { realApi } from './realApi'
import { mockApi } from '../mock/mockApi'

// ---------------------------------------------------------------------
// LE SEUL endroit de l'application qui lit USE_MOCK.
//
// realApi et mockApi exposent exactement les mêmes méthodes
// (login, getUserInfo, getUserActivity), avec les mêmes paramètres,
// le même format de réponse ET les mêmes erreurs (ApiError + code HTTP).
// On choisit l'une des deux ici, une fois pour toutes : le reste du code
// (services, hooks, pages) ne sait jamais à qui il parle.
//
// Les erreurs ne sont pas traitées ici : elles remontent telles quelles
// jusqu'aux hooks, puis useErrorRedirect les envoie vers la page d'erreur
// commune. Même chemin pour le mock et pour le vrai backend.
// ---------------------------------------------------------------------
export const api = USE_MOCK ? mockApi : realApi