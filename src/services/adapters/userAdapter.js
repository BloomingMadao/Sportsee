import {
  toNumber,
  formatDuration,
  getInitials,
  formatHeight,
  formatGender,
} from './helpers'
import { formatLongDate } from './dateHelpers'

// Valeur de repli si la réponse ne contient pas d'objectif hebdomadaire
const DEFAULT_WEEKLY_GOAL = 3

/**
 * Transforme la réponse brute de GET /api/user-info
 * en un objet stable et typé, prêt à être affiché.
 */
export function formatUserInfo(raw) {
  // Filet de sécurité : si la réponse est vide, on échoue ici avec un message
  // clair, plutôt que dans un composant avec un "cannot read property of undefined"
  if (!raw?.profile) {
    throw new Error('Réponse user-info invalide : profil manquant')
  }

  const { profile, statistics = {} } = raw

  const totalDistance = toNumber(statistics.totalDistance) // la chaîne devient un nombre
  const totalSessions = toNumber(statistics.totalSessions)
  const totalDuration = toNumber(statistics.totalDuration)

  return {
    profile: {
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      fullName: `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim(),
      initials: getInitials(profile.firstName, profile.lastName),
      age: toNumber(profile.age, null),
      height: toNumber(profile.height, null), // en cm
      weight: toNumber(profile.weight, null), // en kg
      pictureUrl: profile.profilePicture ?? null,
      memberSince: profile.createdAt ?? null,
      memberSinceLabel: formatLongDate(profile.createdAt), // '14 juin 2023'
      gender: profile.gender ?? null,
      genderLabel: formatGender(profile.gender), // null si absent
      heightLabel: formatHeight(profile.height), // '1m65'
      weightLabel: profile.weight ? `${profile.weight}kg` : null,
    },

    statistics: {
      totalDistance, // nombre, en km
      totalSessions,
      totalDuration, // nombre, en minutes
      totalDurationLabel: formatDuration(totalDuration), // "12 h 45"

      // Garde-fou classique : jamais de division par zéro
      averageDistance:
        totalSessions > 0
          ? Number((totalDistance / totalSessions).toFixed(1))
          : 0,
    },

    // ?? : si weeklyGoal est absent (undefined ou null), on prend la valeur de repli
    weeklyGoal: toNumber(raw.weeklyGoal ?? DEFAULT_WEEKLY_GOAL, DEFAULT_WEEKLY_GOAL),
  }
}