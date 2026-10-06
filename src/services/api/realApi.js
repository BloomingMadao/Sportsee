import { apiRequest } from '../apiClient'

/**
 * Vrai backend. Chaque méthode correspond à UNE route du serveur.
 * Ce fichier ne fait que décrire les URL : la mécanique HTTP
 * (en-têtes, jeton, gestion des codes d'erreur) reste dans apiClient.
 */
export const realApi = {
  login(username, password) {
    return apiRequest('/api/login', {
      method: 'POST',
      body: { username, password },
    })
  },

  getUserInfo(token) {
    return apiRequest('/api/user-info', { token })
  },

  getUserActivity(token, startWeek, endWeek) {
    const query = new URLSearchParams({ startWeek, endWeek })
    return apiRequest(`/api/user-activity?${query}`, { token })
  },
}