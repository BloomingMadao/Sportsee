import { ApiError } from '../ApiError'
import { MOCK_USERS } from './mockData'
// On réutilise les outils de dates de l'application au lieu de les recopier
import { toISODate, addDays } from '../adapters/dateHelpers'

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

// --- Outils partagés --------------------------------------------------

// Convertit un nombre de jours en date 'AAAA-MM-JJ' (heure locale)
const dateFromDaysAgo = (daysAgo) => addDays(toISODate(new Date()), -daysAgo)

// Reproduit le middleware authenticateToken du backend
function getUserFromToken(token) {
  if (!token) throw new ApiError(401, 'Access token required')

  const userId = token.replace('mock-token-', '')
  const user = MOCK_USERS.find((u) => u.id === userId)

  if (!user) throw new ApiError(403, 'Invalid or expired token')

  return user
}

// --- GET /api/user-info -----------------------------------------------

export async function mockUserInfo(token) {
  await wait(MOCK_DELAY)
  const user = getUserFromToken(token)

  // Mêmes calculs que le backend, MÊME défaut : toFixed renvoie une chaîne
  const totalDistance = user.sessions
    .reduce((sum, session) => sum + session.distance, 0)
    .toFixed(1)

  const totalDuration = user.sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  )

  return {
    // On recopie champ par champ, exactement comme le backend
    profile: {
      firstName: user.userInfos.firstName,
      lastName: user.userInfos.lastName,
      createdAt: user.userInfos.createdAt,
      gender: user.userInfos.gender,
      age: user.userInfos.age,
      weight: user.userInfos.weight,
      height: user.userInfos.height,
      profilePicture: user.userInfos.profilePicture,
    },
    weeklyGoal: user.weeklyGoal,
    statistics: {
      totalDistance, // string, volontairement
      totalSessions: user.sessions.length,
      totalDuration,
    },
  }
}

// --- GET /api/user-activity -------------------------------------------

export async function mockUserActivity(token, startWeek, endWeek) {
  await wait(MOCK_DELAY)

  // Ordre identique au backend : le jeton est vérifié AVANT les paramètres
  const user = getUserFromToken(token)

  if (!startWeek || !endWeek) {
    throw new ApiError(400, 'startWeek and endWeek are required')
  }

  const today = dateFromDaysAgo(0)

  return user.sessions
    .map((session) => ({
      date: dateFromDaysAgo(session.daysAgo),
      distance: session.distance,
      duration: session.duration,
      heartRate: session.heartRate,
      caloriesBurned: session.caloriesBurned,
    }))
    // Au format AAAA-MM-JJ, comparer des chaînes revient à comparer des dates
    .filter((s) => s.date >= startWeek && s.date <= endWeek && s.date <= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

// --- Interface commune ------------------------------------------------
// Mêmes noms de méthodes que realApi : c'est ce qui permet à api/index.js
// de remplacer l'un par l'autre sans que le reste du code s'en aperçoive.
export const mockApi = {
  login: mockLogin,
  getUserInfo: mockUserInfo,
  getUserActivity: mockUserActivity,
}