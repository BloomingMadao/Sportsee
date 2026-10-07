import { useState } from 'react'
import styles from './Avatar.module.css'

/**
 * Photo de profil, avec repli sur les initiales.
 * Utilisée par le dashboard (ProfileCard) ET la page Profil :
 * la logique n'existe donc qu'à un seul endroit.
 *
 * @param {string|null} src - URL de la photo (servie par le backend)
 * @param {string} initials - ex. 'SM', affichées si la photo est absente ou cassée
 */
function Avatar({ src, initials }) {
  // L'image vient du backend (localhost:8000). Si le serveur est éteint
  // ou l'URL cassée, onError bascule sur les initiales.
  const [hasImageError, setHasImageError] = useState(false)
  const showImage = Boolean(src) && !hasImageError

  if (showImage) {
    return (
      <img
        src={src}
        alt="" // décorative : le nom est affiché juste à côté
        className={styles.avatar}
        onError={() => setHasImageError(true)}
      />
    )
  }

  return (
    // aria-hidden : les initiales répètent le nom affiché à côté
    <div className={`${styles.avatar} ${styles.fallback}`} aria-hidden="true">
      {initials}
    </div>
  )
}

export default Avatar