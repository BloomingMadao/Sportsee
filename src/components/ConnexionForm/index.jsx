import styles from './ConnexionForm.module.css'

function ConnexionForm() {
  // Temporaire : empêche le comportement par défaut du navigateur.
  // La vraie connexion sera branchée à l'étape 4.
  function handleSubmit(event) {
    event.preventDefault()
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
        />
      </div>

      <button type="submit" className={styles.submit}>
        Se connecter
      </button>

      {/* Aucun endpoint n'existe : un simple texte plutôt qu'un faux lien */}
      <p className={styles.forgot}>Mot de passe oublié ?</p>
    </form>
  )
}

export default ConnexionForm