import { createContext, useContext } from 'react'

// Le canal. null = valeur par défaut si aucun Provider n'est présent au-dessus.
export const AuthContext = createContext(null)

/**
 * Hook maison : évite d'importer AuthContext + useContext partout,
 * et prévient d'une erreur classique (oubli du Provider).
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un <AuthProvider>")
  }

  return context
}