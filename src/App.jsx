import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Connexion from './pages/Connexion'
import Dashboard from './pages/Dashboard'
import Profil from './pages/Profil'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Page sans header ni footer */}
      <Route path="/connexion" element={<Connexion />} />

      {/* Route de layout : pas de "path", elle affiche juste le cadre commun */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profil />} />
      </Route>

      {/* L'URL "/" redirige vers le dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace/>} />

      {/* "*" attrape toutes les URL qui n'ont pas trouvé de correspondance */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App