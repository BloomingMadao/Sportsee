import { USE_MOCK } from '../config'
import { apiRequest } from './apiClient'
import { mockUserInfo, mockUserActivity } from './mock/mockApi'
import { formatUserInfo } from './adapters/userAdapter'

export async function getUserInfo(token) {
  const raw = USE_MOCK
    ? await mockUserInfo(token)
    : await apiRequest('/api/user-info', { token })

  // Rien ne sort d'ici sans passer par l'adaptateur
  return formatUserInfo(raw)
}

export function getUserActivity(token, startWeek, endWeek) {
  if (USE_MOCK) return mockUserActivity(token, startWeek, endWeek)

  // URLSearchParams construit et encode la query string proprement.
  // Bien plus sûr qu'une concaténation à la main.
  const query = new URLSearchParams({ startWeek, endWeek })

  return apiRequest(`/api/user-activity?${query}`, { token })
}