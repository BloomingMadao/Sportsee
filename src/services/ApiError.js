// Une erreur "enrichie" qui transporte le code HTTP.
// Plus tard, on pourra tester error.status === 401 ou 403 pour déconnecter l'utilisateur.
export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}