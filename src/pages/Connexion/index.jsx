import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/Card'
import Logo from '../../components/Logo'
import ConnexionForm from '../../components/ConnexionForm'
import connexionImage from '../../assets/connexion.jpg'
import styles from './Connexion.module.css'

function Connexion() {
  const { isAuthenticated } = useAuth()

  // Déjà connecté : inutile d'afficher le formulaire
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    // Cette page n'est pas dans le Layout : elle a donc besoin de son propre <main>
    <main className={styles.page}>
      <section className={styles.formSide}>
        <Logo />
        <Card className={styles.card}>
          <h1 className={styles.title}>
            Transformez
            <br />
            vos stats en résultats
          </h1>
          <ConnexionForm />
        </Card>
      </section>

      <div className={styles.imageSide}>
        {/* alt="" : image purement décorative, ignorée par les lecteurs d'écran */}
        <img src={connexionImage} alt="" className={styles.image} />
        <p className={styles.tagline}>
          Analysez vos performances en un clin d'œil,
          <br />
          suivez vos progrès et atteignez vos objectifs.
        </p>
      </div>
    </main>
  )
}

export default Connexion