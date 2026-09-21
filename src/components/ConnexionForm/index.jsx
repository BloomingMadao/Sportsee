import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import styles from './ConnexionForm.module.css'

function ConnexionForm() {
  // Un état par champ : c'est ce qui rend les inputs "contrôlés"
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { submit, isLoading, error } = useLogin()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    // Sans ça, le navigateur rechargerait la page et l'application repartirait de zéro
    event.preventDefault()

    const success = await submit(username, password)

    // replace: true → la page de connexion est retirée de l'historique.
    // Le bouton "Précédent" ne ramène donc pas sur un formulaire devenu inutile.
    if (success) navigate('/dashboard', { replace: true })
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
      {error && (
        <p className={styles.error} role="alert">
          {error}
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