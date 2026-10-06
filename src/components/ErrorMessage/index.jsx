import { getErrorMessage } from '../../services/errorMessages'
import styles from './ErrorMessage.module.css'

/**
 * Bloc « code + message + action » utilisé par la page d'erreur commune.
 * @param {number} status - code HTTP (0 = serveur injoignable)
 * @param {string} [message] - remplace le message par défaut du code
 * @param {ReactNode} children - le lien ou bouton d'action
 */
function ErrorMessage({ status, message, children }) {
  return (
    <div className={styles.info}>
      {/* 0 n'est pas un vrai code HTTP : on affiche un titre lisible */}
      <h1>{status === 0 ? 'Oups' : status}</h1>
      <p>{message ?? getErrorMessage(status)}</p>
      {children}
    </div>
  )
}

export default ErrorMessage