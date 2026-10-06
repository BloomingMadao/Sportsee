import { api } from './api'
import { formatUserInfo } from './adapters/userAdapter'
import { formatActivity } from './adapters/activityAdapter'

// Rôle de ce fichier : appeler l'API (mock ou réelle, peu importe)
// puis faire passer la réponse brute dans l'adaptateur.
// Rien ne sort d'ici sans être au format attendu par les composants.

export async function getUserInfo(token) {
  const raw = await api.getUserInfo(token)
  return formatUserInfo(raw)
}

export async function getUserActivity(token, startWeek, endWeek) {
  const raw = await api.getUserActivity(token, startWeek, endWeek)
  return formatActivity(raw)
}