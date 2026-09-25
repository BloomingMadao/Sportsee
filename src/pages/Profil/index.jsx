import { useState } from 'react'
import { useUserInfo } from '../../hooks/useUserInfo'
import Card from '../../components/Card'
import styles from './Profil.module.css'

/** Une ligne « Libellé : valeur » de la carte profil */
function InfoRow({ label, value }) {
  return (
    <li className={styles.infoRow}>
      {label} : {value ?? <span className={styles.missing}>non renseigné</span>}
    </li>
  )
}

function Profil() {
  const { data: user, isLoading, error } = useUserInfo()
  const [hasImageError, setHasImageError] = useState(false)

  if (isLoading) return <p>Chargement…</p>
  if (error || !user) return <p>Impossible de charger votre profil.</p>

  const { profile } = user
  const showImage = Boolean(profile.pictureUrl) && !hasImageError

  return (
    <div className={styles.grid}>
      <div className={styles.column}>
        <Card className={styles.identityCard}>
          {showImage ? (
            <img
              src={profile.pictureUrl}
              alt=""
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
        </Card>

        <Card className={styles.profileCard}>
          <h2 className={styles.cardTitle}>Votre profil</h2>
          <hr className={styles.separator} />

          <ul className={styles.infoList}>
            <InfoRow label="Âge" value={profile.age} />
            <InfoRow label="Genre" value={profile.genderLabel} />
            <InfoRow label="Taille" value={profile.heightLabel} />
            <InfoRow label="Poids" value={profile.weightLabel} />
          </ul>
        </Card>
      </div>

      <div className={styles.column}>
        <h2 className={styles.statsTitle}>Vos statistiques</h2>
        {profile.memberSinceLabel && (
          <p className={styles.statsSubtitle}>
            depuis le {profile.memberSinceLabel}
          </p>
        )}

        {/* Les cinq cartes bleues arrivent à l'étape 9b */}
      </div>
    </div>
  )
}

export default Profil