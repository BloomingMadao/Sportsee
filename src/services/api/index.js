import { USE_MOCK } from '../../config'
import { realApi } from './realApi'
import { mockApi } from '../mock/mockApi'
import { notifySessionExpired } from '../sessionEvents'

// ---------------------------------------------------------------------
// LE SEUL endroit de l'application qui lit USE_MOCK.
//
// realApi et mockApi exposent exactement les mêmes méthodes
// (login, getUserInfo, getUserActivity), avec les mêmes paramètres
// et le même format de réponse. On choisit l'une des deux ici,
// une fois pour toutes, et le reste du code ne le sait jamais.
// ---------------------------------------------------------------------
const source = USE_MOCK ? mockApi : realApi

/**
 * Exécute une requête AUTHENTIFIÉE (envoyée avec un jeton).
 * Si le serveur répond 401 (jeton absent) ou 403 (jeton invalide/expiré),
 * la session n'est plus valable : on prévient l'AuthProvider, qui vide
 * la session, puis ProtectedRoute renvoie vers /connexion.
 *
 * Placé ici plutôt que dans apiClient, ce contrôle s'applique au mock
 * ET au vrai backend, sans être écrit deux fois.
 */
async function authenticated(request) {
  try {
    return await request()
  } catch (error) {
    if (error.status === 401 || error.status === 403) notifySessionExpired()
    throw error // on relance : le hook appelant doit quand même savoir qu'il y a eu échec
  }
}

export const api = {
  // Pas de jeton au login : un 401 veut dire « mauvais identifiants »,
  // surtout pas « session expirée ». On ne passe donc pas par authenticated().
  login: (username, password) => source.login(username, password),

  getUserInfo: (token) => authenticated(() => source.getUserInfo(token)),

  getUserActivity: (token, startWeek, endWeek) =>
    authenticated(() => source.getUserActivity(token, startWeek, endWeek)),
}