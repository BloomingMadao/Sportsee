import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useAuth } from '../../context/AuthContext'
import { SESSION_EXPIRED_MESSAGE } from '../../services/errorMessages'
import styles from './ConnexionForm.module.css'

function ConnexionForm() {
  // Un état par champ : c'est ce qui rend les inputs "contrôlés"
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { submit, isLoading, error } = useLogin()
  const { isSessionExpired } = useAuth()

  // Priorité à l'erreur de saisie ; sinon, on explique une éventuelle expiration
  const message = error ?? (isSessionExpired ? SESSION_EXPIRED_MESSAGE : null)

  function handleSubmit(event) {
    // Sans ça, le navigateur rechargerait la page et l'application repartirait de zéro
    event.preventDefault()

    // Pas de navigate() ici : en cas de succès, la session est enregistrée
    // dans le contexte, et la page Connexion redirige d'elle-même.
    submit(username, password)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Se connecter</h2>

      <div className={styles.field}>
        {/* En JSX : htmlFor au lieu de for, className au lieu de class */}
        <label htmlFor="username" className={styles.label}>
          Identifiant
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={styles.input}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={styles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* role="alert" : les lecteurs d'écran annoncent le message dès son apparition */}
      {message && (
        <p className={styles.error} role="alert">
          {message}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={isLoading}>
        {isLoading ? 'Connexion…' : 'Se connecter'}
      </button>

      {/* Aucun endpoint n'existe : un simple texte plutôt qu'un faux lien */}
      <p className={styles.forgot}>Mot de passe oublié ?</p>
    </form>
  )
}

export default ConnexionForm