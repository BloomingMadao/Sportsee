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
 * - par l'URL     : /error/403, /error/500... (redirection faite par useErrorRedirect)
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
  const { isAuthenticated, logout } = useAuth()

  // Où renvoyer l'utilisateur ?
  // - 404 en étant connecté : seule l'URL est fausse, l'API fonctionne,
  //   le tableau de bord s'affichera normalement.
  // - 401 / 403 : le serveur refuse la session (jeton absent, invalide, expiré).
  // - 0 (serveur injoignable), 500... : le tableau de bord referait les mêmes
  //   appels, échouerait et renverrait ici, en boucle.
  // Dans ces cas, on ferme la session et on renvoie vers la connexion. Sans
  // logout(), la page Connexion verrait une session ouverte et renverrait vers /dashboard.
  const canReturnToDashboard = isAuthenticated && code === 404
  const target = canReturnToDashboard ? '/dashboard' : '/connexion'
  const label = canReturnToDashboard ? 'Retour au tableau de bord' : 'Retour à la connexion'
  const handleClick = canReturnToDashboard ? undefined : logout

  return (
    <main className={styles.page}>
      {/* Le logo mène au même endroit que le lien, sinon il relancerait la boucle */}
      <Link to={target} onClick={handleClick} className={styles.logo}>
        <Logo />
      </Link>

      <div className={styles.info}>
        <ErrorMessage status={code} message={message}>
          <Link to={target} onClick={handleClick} className={styles.link}>
            {label}
          </Link>
        </ErrorMessage>
      </div>
    </main>
  )
}

export default ErrorPage