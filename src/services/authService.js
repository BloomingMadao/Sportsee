import { USE_MOCK } from '../config'
import { apiRequest } from './apiClient'
import { mockLogin } from './mock/mockApi'

// La SEULE fonction que le reste de l'application connaîtra pour se connecter.
// Elle choisit elle-même entre le mock et le vrai backend.
export function login(username, password) {
  if (USE_MOCK) return mockLogin(username, password)

  return apiRequest('/api/login', {
    method: 'POST',
    body: { username, password },
  })
}