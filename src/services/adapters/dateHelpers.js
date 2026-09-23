const pad = (n) => String(n).padStart(2, '0')

// Libellés courts, dans l'ordre lundi → dimanche
export const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

/** Date → 'AAAA-MM-JJ' (heure locale) */
export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/**
 * 'AAAA-MM-JJ' → Date, à midi.
 * Le T12:00:00 évite un piège : new Date('2026-09-23') est interprété en UTC,
 * ce qui peut reculer d'un jour selon le fuseau. À midi, aucun risque.
 */
export function fromISODate(iso) {
  return new Date(`${iso}T12:00:00`)
}

/** '2026-09-23' + 2 → '2026-09-25' */
export function addDays(iso, days) {
  const date = fromISODate(iso)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

/**
 * Bornes d'une semaine, du lundi au dimanche.
 * @param {number} weekOffset - 0 = semaine en cours, -1 = semaine précédente
 * @returns {{ startWeek: string, endWeek: string }}
 */
export function getWeekRange(weekOffset = 0, reference = new Date()) {
  const start = new Date(reference)

  // getDay() : 0 = dimanche, 1 = lundi… On ramène toujours au lundi.
  const day = start.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day

  start.setDate(start.getDate() + diffToMonday + weekOffset * 7)

  const startWeek = toISODate(start)
  return { startWeek, endWeek: addDays(startWeek, 6) }
}

/** '2023-06-14' → '14 juin 2023' | '2025-01-01' → '1er janvier 2025' */
export function formatLongDate(iso) {
  if (!iso) return null

  const date = fromISODate(iso)
  if (Number.isNaN(date.getTime())) return null

  const day = date.getDate()
  const monthAndYear = date.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })

  // Seul le 1er est ordinal en français : on dit "2 mars", pas "2e mars"
  return `${day === 1 ? '1er' : day} ${monthAndYear}`
}

/**
 * Bornes d'un bloc de plusieurs semaines consécutives.
 * @param {number} weekCount - nombre de semaines du bloc
 * @param {number} blockOffset - 0 = bloc en cours, -1 = bloc précédent
 * @returns {{ startWeek: string, endWeek: string }}
 */
export function getWeeksRange(weekCount = 4, blockOffset = 0, reference = new Date()) {
  // Semaine la plus récente du bloc
  const lastWeek = blockOffset * weekCount

  const { endWeek } = getWeekRange(lastWeek, reference)
  const { startWeek } = getWeekRange(lastWeek - (weekCount - 1), reference)

  return { startWeek, endWeek }
}

/** '2026-05-28' → '28 mai' */
export function formatDayMonth(iso) {
  if (!iso) return ''

  const date = fromISODate(iso)
  const month = date.toLocaleDateString('fr-FR', { month: 'long' })
  const day = date.getDate()

  return `${day === 1 ? '1er' : day} ${month}`
}

