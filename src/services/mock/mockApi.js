import { ApiError } from '../ApiError'
import { MOCK_USERS } from './mockData'

const MOCK_DELAY = 500 // simule la latence réseau, pour voir les états de chargement

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Reproduit fidèlement POST /api/login : mêmes codes, mêmes messages, même format
export async function mockLogin(username, password) {
  await wait(MOCK_DELAY)

  if (!username || !password) {
    throw new ApiError(400, 'username and password are required')
  }

  const user = MOCK_USERS.find((u) => u.username === username)
  if (!user || user.password !== password) {
    throw new ApiError(401, 'Invalid credentials')
  }

  // Faux jeton qui contient l'id : les futurs mocks sauront "qui" est connecté
  return { token: `mock-token-${user.id}`, userId: user.id }
}