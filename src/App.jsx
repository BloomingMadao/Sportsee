import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Connexion from './pages/Connexion'
import Dashboard from './pages/Dashboard'
import Profil from './pages/Profil'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Page sans header ni footer, accessible sans session */}
      <Route path="/connexion" element={<Connexion />} />

      {/* Tout ce qui est à l'intérieur exige une session */}
      <Route element={<ProtectedRoute />}>
        {/* Route de layout : pas de "path", elle affiche juste le cadre commun */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
        </Route>
      </Route>

      {/* L'URL "/" redirige vers le dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* "*" attrape toutes les URL qui n'ont pas trouvé de correspondance */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App