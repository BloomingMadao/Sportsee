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
// import PeriodNav from '../../components/PeriodNav'
import Card from '../../components/Card'
import StatCard from '../../components/StatCard'
import WeeklyBarChart from '../../components/charts/WeeklyBarChart'
import HeartRateChart from '../../components/charts/HeartRateChart'
import GoalDonutChart from '../../components/charts/GoalDonutChart'
import styles from './Dashboard.module.css'

// '2026-09-21' → '21/09/2026'
const toFrenchDate = (iso) => fromISODate(iso).toLocaleDateString('fr-FR')

const WEEKS_IN_BLOCK = 4

function Dashboard() {
  // --- Périodes : deux états INDÉPENDANTS -----------------------------
  // 0 = période en cours, -1 = précédente, etc.
  const [blockOffset, setBlockOffset] = useState(0) // bloc de 4 semaines
  const [bpmOffset, setBpmOffset] = useState(0) // semaine du cardio

  // Navigation de « Cette semaine » désactivée : la maquette n'en prévoit pas.
  // Pour la réactiver, décommenter cette ligne, remplacer le useMemo de
  // startWeek/endWeek plus bas, et décommenter le <PeriodNav> dans le JSX.

  // const [weekOffset, setWeekOffset] = useState(0)

  // useMemo : sans lui, ces fonctions produiraient un nouvel objet à chaque
  // rendu, et les chaînes extraites relanceraient les hooks en boucle.
  const { startWeek: startBlock, endWeek: endBlock } = useMemo(
    () => getWeeksRange(WEEKS_IN_BLOCK, blockOffset),
    [blockOffset]
  )

  const { startWeek: startBpm, endWeek: endBpm } = useMemo(
    () => getWeekRange(bpmOffset),
    [bpmOffset]
  )

  // Toujours la semaine en cours : tableau vide = calculé une seule fois.
  // Version navigable : 
  // const {startWeek,endWeek} =useMemo(() => getWeekRange(weekOffset), [weekOffset])

  const { startWeek, endWeek } = useMemo(() => getWeekRange(0), [])

  // --- Données --------------------------------------------------------
  const { data: user, isLoading: isUserLoading, error } = useUserInfo()

  // Le MÊME hook appelé trois fois : chaque appel a son état et sa requête
  const { sessions: blockSessions } = useUserActivity(startBlock, endBlock)
  const { sessions: bpmSessions } = useUserActivity(startBpm, endBpm)
  const { sessions: weekSessions, isLoading: isWeekLoading } = useUserActivity(
    startWeek,
    endWeek
  )

  // --- Transformations ------------------------------------------------
  const weeklyTotals = useMemo(
    () => buildWeeklyTotals(blockSessions, startBlock, WEEKS_IN_BLOCK),
    [blockSessions, startBlock]
  )

  const averagePerWeek = useMemo(() => {
    const total = weeklyTotals.reduce((sum, week) => sum + week.distance, 0)
    return Math.round(total / weeklyTotals.length)
  }, [weeklyTotals])

  const bpmSeries = useMemo(
    () => buildWeekSeries(bpmSessions, startBpm),
    [bpmSessions, startBpm]
  )

  const averageHeartRate = useMemo(
    () => summarizeActivity(bpmSessions).averageHeartRate,
    [bpmSessions]
  )

  const summary = useMemo(() => summarizeActivity(weekSessions), [weekSessions])

  // --- Rendu ----------------------------------------------------------
  // Retours anticipés : l'ordre compte, on ne lit « user » qu'en dernier
  if (isUserLoading) return <p>Chargement…</p>
  if (error || !user) return <p>Impossible de charger vos données.</p>

  return (
    <div>
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

          <ChartCard
            title={averageHeartRate ? `${averageHeartRate} BPM` : '— BPM'}
            variant="accent"
            subtitle="Fréquence cardiaque moyenne"
            nav={{
              label: `${formatDayMonth(startBpm)} - ${formatDayMonth(endBpm)}`,
              onPrevious: () => setBpmOffset((n) => n - 1),
              onNext: () => setBpmOffset((n) => n + 1),
              canGoNext: bpmOffset < 0,
            }}
          >
            <HeartRateChart data={bpmSeries} height={240} />
          </ChartCard>
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

          {/* Navigation désactivée : voir le commentaire en haut du composant.
          <PeriodNav
            onPrevious={() => setWeekOffset((n) => n - 1)}
            onNext={() => setWeekOffset((n) => n + 1)}
            canGoNext={weekOffset < 0}
          />
          */}
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