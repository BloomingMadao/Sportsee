// Une erreur "enrichie" qui transporte le code HTTP.
// C'est ce "status" qui décide de la suite : 400/401 au login → message sous
// le formulaire (erreur de saisie), tout le reste → page d'erreur commune.
// 0 est un code maison : le serveur n'a pas pu être joint.
export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}