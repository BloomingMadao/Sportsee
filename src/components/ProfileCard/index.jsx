import { useState } from 'react'
import styles from './ProfileCard.module.css'

/**
 * En-tête du dashboard : photo, identité et distance totale.
 * @param {object} profile - user.profile issu de l'adaptateur
 * @param {number} totalDistance - en km
 */
function ProfileCard({ profile, totalDistance }) {
  // L'image vient du backend (localhost:8000). Si le serveur est éteint
  // ou l'URL cassée, onError bascule sur les initiales.
  const [hasImageError, setHasImageError] = useState(false)
  const showImage = Boolean(profile.pictureUrl) && !hasImageError

  return (
    <section className={styles.card}>
      <div className={styles.identity}>
        {showImage ? (
          <img
            src={profile.pictureUrl}
            alt="" // décorative : le nom est juste à côté
            className={styles.avatar}
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className={`${styles.avatar} ${styles.avatarFallback}`}>
            {profile.initials}
          </div>
        )}

        <div>
          <h1 className={styles.name}>{profile.fullName}</h1>
          {profile.memberSinceLabel && (
            <p className={styles.memberSince}>
              Membre depuis le {profile.memberSinceLabel}
            </p>
          )}
        </div>
      </div>

      <div className={styles.distance}>
        <p className={styles.distanceLabel}>Distance totale parcourue</p>
        <p className={styles.distanceValue}>
          {totalDistance}
          <span className={styles.distanceUnit}> km</span>
        </p>
      </div>
    </section>
  )
}

export default ProfileCard