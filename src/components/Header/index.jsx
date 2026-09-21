import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.css'

function Header() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/connexion', { replace: true })
  }

  return (
    <header className={styles.header}>
      <Link to="/dashboard">
        <Logo />
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Mon profil
        </NavLink>
        {/* Trait décoratif : aria-hidden le masque aux lecteurs d'écran */}
        <span className={styles.separator} aria-hidden="true" />
        <button type="button" className={styles.logout} onClick={handleLogout}>
          Se déconnecter
        </button>
      </nav>
    </header>
  )
}

export default Header