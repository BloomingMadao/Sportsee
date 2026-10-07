// ---------------------------------------------------------------------
// Réglages visuels COMMUNS aux graphiques (valeurs relevées dans Figma).
// Recharts attend des couleurs en dur dans ses props : on ne peut pas lui
// passer var(--color-primary). On les centralise donc ici, une seule fois.
// ---------------------------------------------------------------------

export const CHART_COLORS = {
  primary: '#0B23F4', // bleu foncé : barres au survol, courbe au survol, points
  primaryLight: '#B6BDFC', // bleu clair : barres au repos
  legendKm: '#7987FF', // pastille « Km » de la légende
  heartRateMin: '#FCC1B6',
  heartRateMax: '#F4320B',
  averageLine: '#E4E6F8', // courbe de la moyenne au repos
}

// Lignes des axes (traits pleins) et de la grille (pointillés)
export const AXIS_LINE = { stroke: '#707070' }
export const GRID_COLOR = '#DCDCDC'
export const GRID_DASH = '3 4'

// Libellés des axes : 12px sous l'axe horizontal, 10px le long de l'axe vertical
export const X_TICK = { fill: '#707070', fontSize: 12 }
export const Y_TICK = { fill: '#707070', fontSize: 10 }

// Barres entièrement arrondies (pilules) : rayon = moitié de la largeur
export const BAR_SIZE = 14
export const BAR_RADIUS = BAR_SIZE / 2

// Hauteur commune : marge haute 8 + zone de tracé 260 + axe horizontal 40
export const CHART_HEIGHT = 308