import { USE_MOCK } from '../config'
import { apiRequest } from './apiClient'
import { mockUserInfo, mockUserActivity } from './mock/mockApi'
import { formatUserInfo } from './adapters/userAdapter'
import { formatActivity } from './adapters/activityAdapter'

export async function getUserInfo(token) {
  const raw = USE_MOCK
    ? await mockUserInfo(token)
    : await apiRequest('/api/user-info', { token })

  // Rien ne sort d'ici sans passer par l'adaptateur
  return formatUserInfo(raw)
}

export async function getUserActivity(token, startWeek, endWeek) {
  if (USE_MOCK) {
    return formatActivity(await mockUserActivity(token, startWeek, endWeek))
  }

  const query = new URLSearchParams({ startWeek, endWeek })
  const raw = await apiRequest(`/api/user-activity?${query}`, { token })

  return formatActivity(raw)
}