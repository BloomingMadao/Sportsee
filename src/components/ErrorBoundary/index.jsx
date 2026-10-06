import { Component } from 'react'
import ErrorPage from '../../pages/ErrorPage'
import { DEFAULT_ERROR_MESSAGE } from '../../services/errorMessages'

/**
 * Filet de sécurité pour les erreurs qui ne viennent PAS de l'API :
 * un composant qui plante pendant son rendu (lecture de undefined.x...).
 * Sans lui, React démonte tout et l'utilisateur voit une page blanche.
 *
 * Pourquoi une classe ? React n'a pas (encore) d'équivalent en hook :
 * getDerivedStateFromError et componentDidCatch n'existent que sur les classes.
 *
 * @param {string} resetKey - quand cette valeur change (changement d'URL),
 *   on efface l'erreur pour que la nouvelle page puisse s'afficher.
 */
class ErrorBoundary extends Component {
  state = { hasError: false }

  // Appelée par React quand un enfant plante : on passe en mode « erreur »
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // Le bon endroit pour journaliser (console aujourd'hui, Sentry demain)
  componentDidCatch(error, info) {
    console.error('Erreur de rendu capturée :', error, info.componentStack)
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false })
    }
  }

  render() {
    // Même template que toutes les autres erreurs. Le message par défaut
    // (« Une erreur inattendue... ») est plus juste ici qu'un message
    // « serveur » : c'est le code de la page qui a planté, pas le backend.
    if (this.state.hasError) {
      return <ErrorPage status={500} message={DEFAULT_ERROR_MESSAGE} />
    }
    return this.props.children
  }
}

export default ErrorBoundary