import { useState, useMemo } from 'react'
import { useUserInfo } from '../../hooks/useUserInfo'
import { useUserActivity } from '../../hooks/useUserActivity'
import { getWeekRange, fromISODate } from '../../services/adapters/dateHelpers'
import { buildWeekSeries, summarizeActivity } from '../../services/adapters/activityAdapter'
import ProfileCard from '../../components/ProfileCard'
import Card from '../../components/Card'
import WeeklyBarChart from '../../components/charts/WeeklyBarChart'
import GoalDonutChart from '../../components/charts/GoalDonutChart'
import StatCard from '../../components/StatCard.jsx'
import styles from './Dashboard.module.css'


// '2026-09-21' → '21/09/2026'
const toFrenchDate = (iso) => fromISODate(iso).toLocaleDateString('fr-FR')

function Dashboard() {
  const [weekOffset, setWeekOffset] = useState(0)

  const { startWeek, endWeek } = useMemo(
    () => getWeekRange(weekOffset),
    [weekOffset]
  )

  const { data: user, isLoading: isUserLoading, error } = useUserInfo()
  const { sessions, isLoading: isActivityLoading } = useUserActivity(startWeek, endWeek)

  const weekSeries = useMemo(
    () => buildWeekSeries(sessions, startWeek),
    [sessions, startWeek]
  )
  const summary = useMemo(() => summarizeActivity(sessions), [sessions])

  if (isUserLoading) return <p>Chargement…</p>
  if (error || !user) return <p>Impossible de charger vos données.</p>

  return (
    <div className={styles.page}>
      <ProfileCard
        profile={user.profile}
        totalDistance={user.statistics.totalDistance}
      />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Vos dernières performances</h2>

        <div className={styles.grid}>
          <Card className={styles.chartCard}>
            <WeeklyBarChart
              data={weekSeries}
              dataKey="distance"
              label="Distance"
              unit="km"
              color="#0B23F4"
            />
          </Card>

          <Card className={styles.chartCard}>
            <WeeklyBarChart
              data={weekSeries}
              dataKey="calories"
              label="Calories"
              unit="kcal"
              color="#F4320B"
            />
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Cette semaine</h2>
            <p className={styles.sectionSubtitle}>
              Du {toFrenchDate(startWeek)} au {toFrenchDate(endWeek)}
            </p>
          </div>

          <div className={styles.weekNav}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => setWeekOffset((n) => n - 1)}
              aria-label="Semaine précédente"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => setWeekOffset((n) => n + 1)}
              disabled={weekOffset >= 0}
              aria-label="Semaine suivante"
            >
              ›
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          <Card className={styles.goalCard}>
            <p className={styles.goalTitle}>
              x{summary.sessionCount}
              <span className={styles.goalTarget}>
                {' '}
                sur objectif de {user.weeklyGoal}
              </span>
            </p>
            <p className={styles.goalSubtitle}>Courses hebdomadaires réalisées</p>

            <GoalDonutChart
              completed={summary.sessionCount}
              goal={user.weeklyGoal}
            />
          </Card>

          <div className={styles.statColumn}>
            <StatCard
              label="Durée d'activité"
              value={summary.totalDuration}
              unit="minutes"
            />
            <StatCard
              label="Distance"
              value={summary.totalDistance}
              unit="kilomètres"
              variant="accent"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard