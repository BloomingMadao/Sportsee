import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
      <Link to="/dashboard">SPORTSEE</Link>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profil">Mon profil</NavLink>
        {/* Un bouton, pas un lien : se déconnecter est une action, pas une navigation.
            On le branchera à l'étape 4. */}
        <button type="button">Se déconnecter</button>
      </nav>
    </header>
  )
}

export default Header