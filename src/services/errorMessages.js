export const ERROR_MESSAGES = {
  0: 'Impossible de joindre le serveur. Vérifiez votre connexion.',
  400: 'La requête est invalide.',
  401: 'Vous devez être connecté pour accéder à cette page.',
  403: 'Votre session a expiré, veuillez vous reconnecter.',
  404: "Cette page n'existe pas.",
  500: 'Le serveur a rencontré un problème. Réessayez plus tard.',
}

export const DEFAULT_ERROR_MESSAGE = 'Une erreur inattendue est survenue.'

export function getErrorMessage(status) {
  return ERROR_MESSAGES[status] ?? DEFAULT_ERROR_MESSAGE
}