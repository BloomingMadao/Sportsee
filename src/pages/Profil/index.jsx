import { useState, useMemo } from 'react'
import { useUserInfo } from '../../hooks/useUserInfo'
import { useUserActivity } from '../../hooks/useUserActivity'
import { toISODate } from '../../services/adapters/dateHelpers'
import { summarizeHistory } from '../../services/adapters/activityAdapter'
import { splitDuration } from '../../services/adapters/helpers'
import Card from '../../components/Card'
import StatTile from '../../components/StatTile'
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

  // --- Historique complet ---------------------------------------------
  // TOUS les hooks doivent être appelés avant les retours anticipés :
  // React exige le même nombre de hooks, dans le même ordre, à chaque rendu.
  const historyRange = useMemo(() => {
    if (!user?.profile.memberSince) return { start: null, end: null }

    return { start: user.profile.memberSince, end: toISODate(new Date()) }
  }, [user])

  // Le hook ne lance aucune requête tant que les bornes valent null
  const { sessions: allSessions } = useUserActivity(
    historyRange.start,
    historyRange.end
  )

  const history = useMemo(() => summarizeHistory(allSessions), [allSessions])

  // --- Rendu ----------------------------------------------------------
  if (isLoading) return <p>Chargement…</p>
  if (error || !user) return <p>Impossible de charger votre profil.</p>

  const { profile } = user
  const showImage = Boolean(profile.pictureUrl) && !hasImageError
  const duration = splitDuration(user.statistics.totalDuration)

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

        <div className={styles.tiles}>
          <StatTile
            label="Temps total couru"
            value={duration.value}
            unit={duration.unit}
          />
          <StatTile
            label="Calories brûlées"
            value={history.totalCalories}
            unit="cal"
          />
          <StatTile
            label="Distance totale parcourue"
            value={user.statistics.totalDistance}
            unit="km"
          />
          <StatTile
            label="Nombre de jours de repos"
            value={history.restDays}
            unit={history.restDays > 1 ? 'jours' : 'jour'}
          />
          <StatTile
            label="Nombre de sessions"
            value={user.statistics.totalSessions}
            unit={user.statistics.totalSessions > 1 ? 'sessions' : 'session'}
          />
        </div>
      </div>
    </div>
  )
}

export default Profil