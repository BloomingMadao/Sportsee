import { api } from './api'

// La SEULE fonction que le reste de l'application connaît pour se connecter.
// Le choix mock / vrai backend est fait ailleurs, une fois pour toutes (api/index.js).
export function login(username, password) {
  return api.login(username, password)
}