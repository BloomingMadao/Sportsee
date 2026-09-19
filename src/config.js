// Les variables d'environnement sont toujours des chaînes de caractères :
// on compare donc à 'true' pour obtenir un vrai booléen.
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'