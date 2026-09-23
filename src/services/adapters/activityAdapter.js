import { toNumber } from './helpers'
import { WEEKDAY_LABELS, addDays } from './dateHelpers'

const round = (value) => Number(value.toFixed(1))

/**
 * Une séance brute → une séance propre et aplatie.
 */
function formatSession(raw) {
  return {
    date: raw.date,
    distance: toNumber(raw.distance), // km
    duration: toNumber(raw.duration), // minutes
    calories: toNumber(raw.caloriesBurned),

    // Aplatissement : heartRate.average devient heartRateAverage
    heartRateAverage: toNumber(raw.heartRate?.average, null),
    heartRateMin: toNumber(raw.heartRate?.min, null),
    heartRateMax: toNumber(raw.heartRate?.max, null),

    // Vitesse moyenne en km/h, calculée une fois ici plutôt que dans 3 composants
    speed: raw.duration > 0 ? round((raw.distance / raw.duration) * 60) : 0,
  }
}

/**
 * Point d'entrée : transforme la réponse brute de GET /api/user-activity.
 * @returns {Array} tableau de séances, du plus ancien au plus récent
 */
export function formatActivity(raw) {
  // L'API renvoie un tableau. Si ce n'est pas le cas, on renvoie du vide
  // plutôt que de laisser planter un .map() dans un composant.
  if (!Array.isArray(raw)) return []

  return raw.map(formatSession)
}

/**
 * Construit les 7 jours d'une semaine, y compris les jours sans séance.
 * C'est CE tableau qui sera passé à Recharts.
 */
export function buildWeekSeries(sessions, startWeek) {
  const days = []

  for (let index = 0; index < 7; index += 1) {
    const date = addDays(startWeek, index)
    const daySessions = sessions.filter((session) => session.date === date)

    days.push({
      date,
      label: WEEKDAY_LABELS[index],
      // reduce sur un tableau vide renvoie 0 : les jours creux sont gérés d'office
      distance: round(daySessions.reduce((sum, s) => sum + s.distance, 0)),
      duration: daySessions.reduce((sum, s) => sum + s.duration, 0),
      calories: daySessions.reduce((sum, s) => sum + s.calories, 0),
      sessionCount: daySessions.length,
    })
  }

  return days
}

/**
 * Totaux d'une période, pour les cartes de statistiques du dashboard.
 */
export function summarizeActivity(sessions) {
  if (sessions.length === 0) {
    return {
      sessionCount: 0,
      totalDistance: 0,
      totalDuration: 0,
      totalCalories: 0,
      averageHeartRate: null,
      longestDistance: 0,
    }
  }

  const withHeartRate = sessions.filter((s) => s.heartRateAverage !== null)

  return {
    sessionCount: sessions.length,
    totalDistance: round(sessions.reduce((sum, s) => sum + s.distance, 0)),
    totalDuration: sessions.reduce((sum, s) => sum + s.duration, 0),
    totalCalories: sessions.reduce((sum, s) => sum + s.calories, 0),
    averageHeartRate:
      withHeartRate.length > 0
        ? Math.round(
            withHeartRate.reduce((sum, s) => sum + s.heartRateAverage, 0) /
              withHeartRate.length
          )
        : null,
    // Math.max(...tableau) : les "..." étalent le tableau en arguments
    longestDistance: Math.max(...sessions.map((s) => s.distance)),
  }
}