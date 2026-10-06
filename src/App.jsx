import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import Connexion from './pages/Connexion'
import Dashboard from './pages/Dashboard'
import Profil from './pages/Profil'
import ErrorPage from './pages/ErrorPage'
import { ERROR_ROUTE } from './hooks/useErrorRedirect'

function App() {
  const location = useLocation()

  return (
    // resetKey : l'erreur de rendu est oubliée dès que l'URL change
    <ErrorBoundary resetKey={location.pathname}>
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

        {/* Erreurs API : /error/0, /error/500... (voir useErrorRedirect) */}
        <Route path={ERROR_ROUTE} element={<ErrorPage />} />

        {/* "*" attrape toutes les URL inconnues : même template, code 404 */}
        <Route path="*" element={<ErrorPage status={404} />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App