import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../components/Logo'
import ErrorMessage from '../../components/ErrorMessage'
import styles from './ErrorPage.module.css'

/**
 * LE template unique de toutes les erreurs de l'application.
 *
 * Le code d'erreur peut arriver de deux façons :
 * - par une prop  : <ErrorPage status={404} /> (route "*", ErrorBoundary)
 * - par l'URL     : /error/500 (redirection faite par useErrorRedirect)
 *
 * @param {number} [status]
 * @param {string} [message] - remplace le message associé au code
 */
function ErrorPage({ status, message }) {
  const params = useParams()

  // Number('abc') donne NaN : une URL bricolée retombe sur 500.
  // Attention à ne PAS écrire Number(...) || 500 : 0 (serveur injoignable)
  // est « faux » en JavaScript et deviendrait 500.
  const fromUrl = Number(params.status)
  const code = status ?? (Number.isNaN(fromUrl) ? 500 : fromUrl)
  const { isAuthenticated } = useAuth()

  return (
    <main className={styles.page}>
      <Link to="/dashboard" className={styles.logo}>
        <Logo />
      </Link>

      <div className={styles.info}>
        <ErrorMessage status={code} message={message}>
          {/* Connecté : retour au dashboard. Sinon : retour à la connexion. */}
          <Link to={isAuthenticated ? '/dashboard' : '/connexion'} className={styles.link}>
            {isAuthenticated ? 'Retour au tableau de bord' : 'Retour à la connexion'}
          </Link>
        </ErrorMessage>
      </div>
    </main>
  )
}

export default ErrorPage