import { API_URL } from '../config'
import { ApiError } from './ApiError'

/**
 * Point de passage unique de TOUTES les requêtes HTTP de l'application.
 * @param {string} path - ex. '/api/login'
 * @param {object} options - { method, body, token }
 */
export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    // fetch ne rejette QUE si le réseau échoue (serveur éteint, mauvaise URL...)
    throw new ApiError(0, 'Impossible de joindre le serveur')
  }

  // .catch(() => null) : si la réponse n'est pas du JSON, on ne plante pas
  const data = await response.json().catch(() => null)

  // Un 401 ou un 500 n'est PAS une erreur pour fetch : c'est à nous de le vérifier
  if (!response.ok) {
    throw new ApiError(response.status, data?.message ?? 'Erreur inconnue')
  }

  return data
}