import { Link, NavLink } from 'react-router-dom'
import Logo from '../Logo'
import styles from './Header.module.css'

function Header() {
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
        <button type="button" className={styles.logout}>
          Se déconnecter
        </button>
      </nav>
    </header>
  )
}

export default Header