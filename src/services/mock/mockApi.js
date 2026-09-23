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

// --- Outils partagés --------------------------------------------------

const pad = (n) => String(n).padStart(2, '0')

// Convertit un nombre de jours en date 'AAAA-MM-JJ' (heure locale)
function dateFromDaysAgo(daysAgo) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

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
    // On recopie champ par champ, comme le backend : ni gender, ni objectif
    profile: {
      firstName: user.userInfos.firstName,
      lastName: user.userInfos.lastName,
      createdAt: user.userInfos.createdAt,
      age: user.userInfos.age,
      weight: user.userInfos.weight,
      height: user.userInfos.height,
      profilePicture: user.userInfos.profilePicture,
    },
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