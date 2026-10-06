import { useEffect, useState } from 'react'

/**
 * Cycle de vie COMMUN à toutes les requêtes de l'application :
 * chargement → données OU erreur, avec protection contre les réponses obsolètes.
 *
 * Avant, useUserInfo et useUserActivity réécrivaient chacun cette mécanique
 * (trois useState, le drapeau "ignore", la remise à zéro...). Elle n'existe
 * plus qu'ici : les deux hooks se contentent de dire QUELLE requête lancer.
 *
 * @param {Function|null} request - fonction sans argument qui renvoie une promesse.
 *   Elle doit être mémorisée (useMemo / useCallback) dans le hook appelant :
 *   c'est quand cette fonction change qu'une nouvelle requête part.
 *   null = il manque encore quelque chose (jeton, dates) : on attend.
 * @param {*} initialData - valeur des données avant la première réponse et
 *   après une erreur. Doit être une constante déclarée hors du composant
 *   (un [] recréé à chaque rendu relancerait l'effet en boucle).
 * @returns {{ data: *, isLoading: boolean, error: Error|null }}
 */
export function useApiRequest(request, initialData = null) {
  // Un seul état pour le résultat, qui retient aussi la requête qui l'a produit
  const [result, setResult] = useState({
    request: null,
    data: initialData,
    error: null,
  })

  useEffect(() => {
    if (!request) return

    // Si la requête change avant la réponse (changement de semaine, démontage),
    // l'ancienne réponse ne doit pas écraser la nouvelle : on l'ignore.
    let ignore = false

    request()
      .then((data) => {
        if (!ignore) setResult({ request, data, error: null })
      })
      .catch((error) => {
        // Les données repassent à leur valeur initiale : mieux vaut un graphique
        // vide que les chiffres de la période précédente sous une erreur.
        if (!ignore) setResult({ request, data: initialData, error })
      })

    return () => {
      ignore = true
    }
  }, [request, initialData])

  // Pas besoin d'un état "isLoading" à tenir à jour à la main : on charge tant
  // que le résultat affiché ne correspond pas à la requête demandée.
  const isLoading = !request || result.request !== request

  return {
    // Pendant un rechargement, on garde les données précédentes : le graphique
    // s'anime de l'ancienne valeur vers la nouvelle au lieu de clignoter.
    data: result.data,
    isLoading,
    // Une erreur appartient à SA requête : on ne la montre plus si une autre est partie
    error: isLoading ? null : result.error,
  }
}