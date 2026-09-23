import { USE_MOCK } from '../config'
import { apiRequest } from './apiClient'
import { mockUserInfo, mockUserActivity } from './mock/mockApi'

export function getUserInfo(token) {
  if (USE_MOCK) return mockUserInfo(token)

  return apiRequest('/api/user-info', { token })
}

export function getUserActivity(token, startWeek, endWeek) {
  if (USE_MOCK) return mockUserActivity(token, startWeek, endWeek)

  // URLSearchParams construit et encode la query string proprement.
  // Bien plus sûr qu'une concaténation à la main.
  const query = new URLSearchParams({ startWeek, endWeek })

  return apiRequest(`/api/user-activity?${query}`, { token })
}