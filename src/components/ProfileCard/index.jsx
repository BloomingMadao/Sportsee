import Avatar from '../Avatar'
import flagIcon from '../../assets/OUTLINE.svg'
import styles from './ProfileCard.module.css'

/**
 * En-tête du dashboard : photo, identité et distance totale.
 * @param {object} profile - user.profile issu de l'adaptateur
 * @param {number} totalDistance - en km
 */
function ProfileCard({ profile, totalDistance }) {
  return (
    <section className={styles.card}>
      <div className={styles.identity}>
        <Avatar src={profile.pictureUrl} initials={profile.initials} />

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
          {/* alt="" : icône décorative, le texte à côté porte l'information.
              Sans attribut alt, le validateur W3C signale une erreur. */}
          <img src={flagIcon} alt="" className={styles.distanceIcon} />
          {totalDistance.toLocaleString('fr-FR')}
          <span className={styles.distanceUnit}> km</span>
        </p>
      </div>
    </section>
  )
}

export default ProfileCard