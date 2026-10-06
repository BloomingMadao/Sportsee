// ---------------------------------------------------------------------
// Tous les textes d'erreur de l'application sont ici, et nulle part ailleurs.
// Les messages du backend sont en anglais et parfois techniques :
// on ne les affiche jamais tels quels, on passe toujours par ces tables.
// ---------------------------------------------------------------------

// Erreurs affichées sur la page d'erreur commune
export const ERROR_MESSAGES = {
  0: 'Impossible de joindre le serveur. Vérifiez votre connexion.',
  400: 'La requête est invalide.',
  401: 'Vous devez être connecté pour accéder à cette page.',
  403: 'Votre session a expiré, veuillez vous reconnecter.',
  // 404 sert à deux cas : URL inconnue (route "*") ET ressource absente côté API
  404: 'La page ou la ressource demandée est introuvable.',
  500: 'Le serveur a rencontré un problème. Réessayez plus tard.',
}

export const DEFAULT_ERROR_MESSAGE = 'Une erreur inattendue est survenue.'

// 401/403 pendant la navigation = session coupée. On ne passe PAS par la page
// d'erreur : retour à la connexion, avec ce message au-dessus du formulaire.
export const SESSION_EXPIRED_MESSAGE = ERROR_MESSAGES[403]

export function getErrorMessage(status) {
  return ERROR_MESSAGES[status] ?? DEFAULT_ERROR_MESSAGE
}

// Erreurs de SAISIE du formulaire de connexion.
// Ce ne sont pas des pannes : l'utilisateur doit corriger ce qu'il a tapé,
// donc on les affiche sous le formulaire au lieu de rediriger.
export const LOGIN_FORM_ERRORS = {
  400: 'Veuillez renseigner votre identifiant et votre mot de passe.',
  401: 'Identifiant ou mot de passe incorrect.',
}

// Les codes concernés, sous forme de tableau (utilisé par useErrorRedirect)
export const LOGIN_FORM_STATUSES = Object.keys(LOGIN_FORM_ERRORS).map(Number)

export function getLoginErrorMessage(status) {
  return LOGIN_FORM_ERRORS[status] ?? DEFAULT_ERROR_MESSAGE
}