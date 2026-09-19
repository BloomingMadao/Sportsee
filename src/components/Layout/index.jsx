import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

function Layout() {
  return (
    <>
      <Header />
      <main>
        {/* Ici s'affichera Dashboard ou Profil selon l'URL */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout