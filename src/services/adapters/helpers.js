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

/** 168 → '1m68' | null → null */
export function formatHeight(centimeters) {
  if (!centimeters) return null

  const meters = Math.floor(centimeters / 100)
  const rest = centimeters % 100

  // padStart : 1m08 et non 1m8
  return `${meters}m${String(rest).padStart(2, '0')}`
}

/**
 * 1635 → { value: '27h', unit: '15min' }
 * Le format de la maquette sépare la valeur en gras de l'unité en plus clair.
 */
export function splitDuration(minutes) {
  const total = toNumber(minutes)
  const hours = Math.floor(total / 60)
  const rest = total % 60

  if (hours === 0) return { value: `${rest}`, unit: 'min' }

  return { value: `${hours}h`, unit: `${rest}min` }
}

/** 'female' → 'Femme' */
export function formatGender(gender) {
  if (gender === 'female') return 'Femme'
  if (gender === 'male') return 'Homme'

  return null // l'API ne renvoie pas ce champ aujourd'hui
}