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

console.log(formatLongDate('2025-01-01'), '|', formatLongDate('2023-06-14'))