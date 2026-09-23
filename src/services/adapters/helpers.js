/**
 * Convertit en nombre de façon sûre.
 * Number("42.7") → 42.7 | Number(undefined) → NaN → on renvoie la valeur par défaut
 */
export function toNumber(value, fallback = 0) {
  const result = Number(value)
  return Number.isFinite(result) ? result : fallback
}

/**
 * 765 → "12 h 45"  |  45 → "45 min"
 * @param {number} minutes
 */
export function formatDuration(minutes) {
  const total = toNumber(minutes)
  const hours = Math.floor(total / 60)
  const rest = total % 60

  if (hours === 0) return `${rest} min`

  // padStart : "5" devient "05", pour lire "12 h 05" et non "12 h 5"
  return `${hours} h ${String(rest).padStart(2, '0')}`
}

/**
 * "Sophie", "Martin" → "SM"
 */
export function getInitials(firstName = '', lastName = '') {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}