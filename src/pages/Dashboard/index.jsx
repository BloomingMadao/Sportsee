import { useState, useMemo } from 'react'
import { useUserInfo } from '../../hooks/useUserInfo'
import { useUserActivity } from '../../hooks/useUserActivity'
import {
  getWeekRange,
  getWeeksRange,
  fromISODate,
  formatDayMonth,
} from '../../services/adapters/dateHelpers'
import {
  buildWeekSeries,
  buildWeeklyTotals,
  summarizeActivity,
} from '../../services/adapters/activityAdapter'
import ProfileCard from '../../components/ProfileCard'
import ChartCard from '../../components/ChartCard'
import PeriodNav from '../../components/PeriodNav'
import Card from '../../components/Card'
import StatCard from '../../components/StatCard.jsx'
import WeeklyBarChart from '../../components/charts/WeeklyBarChart'
import GoalDonutChart from '../../components/charts/GoalDonutChart'
import styles from './Dashboard.module.css'

// '2026-09-21' → '21/09/2026'
const toFrenchDate = (iso) => fromISODate(iso).toLocaleDateString('fr-FR')

const WEEKS_IN_BLOCK = 4

function Dashboard() {
  // --- Périodes : deux états INDÉPENDANTS -----------------------------
  // 0 = période en cours, -1 = précédente, etc.
  const [weekOffset, setWeekOffset] = useState(0)
  const [blockOffset, setBlockOffset] = useState(0)

  // useMemo : sans lui, ces fonctions produiraient un nouvel objet à chaque
  // rendu, et les chaînes extraites relanceraient les hooks en boucle.
  const { startWeek, endWeek } = useMemo(
    () => getWeekRange(weekOffset),
    [weekOffset]
  )

  const { startWeek: startBlock, endWeek: endBlock } = useMemo(
    () => getWeeksRange(WEEKS_IN_BLOCK, blockOffset),
    [blockOffset]
  )

  // --- Données --------------------------------------------------------
  const { data: user, isLoading: isUserLoading, error } = useUserInfo()

  // Le MÊME hook appelé deux fois : chaque appel a son état et sa requête
  const { sessions: weekSessions, isLoading: isWeekLoading } = useUserActivity(
    startWeek,
    endWeek
  )
  const { sessions: blockSessions } = useUserActivity(startBlock, endBlock)

  // --- Transformations ------------------------------------------------
  const weekSeries = useMemo(
    () => buildWeekSeries(weekSessions, startWeek),
    [weekSessions, startWeek]
  )

  const summary = useMemo(() => summarizeActivity(weekSessions), [weekSessions])

  const weeklyTotals = useMemo(
    () => buildWeeklyTotals(blockSessions, startBlock, WEEKS_IN_BLOCK),
    [blockSessions, startBlock]
  )

  const averagePerWeek = useMemo(() => {
    const total = weeklyTotals.reduce((sum, week) => sum + week.distance, 0)
    return Math.round(total / weeklyTotals.length)
  }, [weeklyTotals])

  // --- Rendu ----------------------------------------------------------
  // Retours anticipés : l'ordre compte, on ne lit "user" qu'en dernier
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
          <ChartCard
            title={`${averagePerWeek} km en moyenne`}
            subtitle="Total des kilomètres des 4 dernières semaines"
            nav={{
              label: `${formatDayMonth(startBlock)} - ${formatDayMonth(endBlock)}`,
              onPrevious: () => setBlockOffset((n) => n - 1),
              onNext: () => setBlockOffset((n) => n + 1),
              canGoNext: blockOffset < 0,
            }}
          >
            <WeeklyBarChart
              data={weeklyTotals}
              dataKey="distance"
              label="Distance"
              unit="km"
              color="#B6BDFC"
              height={240}
              barSize={16}
              radius={[8, 8, 8, 8]}
            />
          </ChartCard>

          {/* Provisoire : deviendra le graphique cardiaque à l'étape 8f */}
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

          <PeriodNav
            onPrevious={() => setWeekOffset((n) => n - 1)}
            onNext={() => setWeekOffset((n) => n + 1)}
            canGoNext={weekOffset < 0}
          />
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

            {isWeekLoading ? (
              <p className={styles.loading}>Chargement…</p>
            ) : (
              <GoalDonutChart
                completed={summary.sessionCount}
                goal={user.weeklyGoal}
              />
            )}
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