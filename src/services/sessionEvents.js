// Trait d'union entre l'apiClient (JS pur) et le contexte React.
// Un seul abonné à la fois : l'AuthProvider, monté une seule fois.
let handler = null

/**
 * Enregistre la fonction à exécuter quand la session devient invalide.
 * @returns {Function} fonction de désabonnement
 */
export function onSessionExpired(callback) {
  handler = callback
  return () => {
    handler = null
  }
}

// Appelée par l'apiClient. Le ?.() ne fait rien si personne n'est abonné.
export function notifySessionExpired() {
  handler?.()
}