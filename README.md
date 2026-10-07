# SportSee – Front-end

Tableau de bord d'analyse de course à pied : connexion, dashboard (graphiques
des 4 dernières semaines, fréquence cardiaque, objectif hebdomadaire) et page
profil.

**Stack :** React 19, React Router 7, Recharts 3, Vite 8, CSS Modules.

## Prérequis

- Node.js `^20.19.0` ou `>=22.12.0` (exigence de Vite 8)
- Le backend SportSee (dossier [`Sportsee_Backend`](https://github.com/BloomingMadao/Sportsee_Backend.git) ou [https://github.com/BloomingMadao/Sportsee_Backend.git](https://github.com/BloomingMadao/Sportsee_Backend.git)) si l'on veut les vraies 
  données ; inutile en mode mock.

## Installation

```bash
npm install
cp .env.exemple .env
npm run dev
```

L'application est servie sur http://localhost:5173.

## Variables d'environnement

| Variable        | Rôle                                                        | Défaut                  |
| --------------- | ----------------------------------------------------------- | ----------------------- |
| `VITE_API_URL`  | Adresse du backend                                          | `http://localhost:8000` |
| `VITE_USE_MOCK` | `true` = données simulées, `false` = vrai backend           | `true`                  |

Vite lit le `.env` au démarrage : relancer `npm run dev` après une modification.

## Comptes de démonstration

Identiques en mode mock et avec le backend :

| Identifiant    | Mot de passe  |
| -------------- | ------------- |
| `sophiemartin` | `password123` |
| `emmaleroy`    | `password789` |
| `marcdubois`   | `password456` |

## Scripts

| Commande          | Rôle                                  |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Serveur de développement              |
| `npm run build`   | Build de production dans `dist/`      |
| `npm run preview` | Sert le build de production           |
| `npm run lint`    | ESLint                                |

## Architecture

```
src/
├── config.js              lecture des variables d'environnement
├── services/
│   ├── api/index.js       SEUL point de bascule mock / vrai backend
│   ├── api/realApi.js     routes du backend (via apiClient)
│   ├── mock/              faux backend : mêmes méthodes, mêmes erreurs
│   ├── apiClient.js       unique appel à fetch (en-têtes, jeton, codes HTTP)
│   ├── ApiError.js        erreur qui transporte le code HTTP
│   ├── errorMessages.js   tous les textes d'erreur
│   └── adapters/          mise en forme des réponses pour les composants
├── hooks/                 useUserInfo, useUserActivity, useLogin,
│                          useApiRequest (cycle de vie commun),
│                          useErrorRedirect (redirection vers la page d'erreur)
├── context/               session (jeton) partagée via AuthContext
├── components/            composants réutilisables et graphiques
└── pages/                 Connexion, Dashboard, Profil, ErrorPage
```

### Flux d'un appel

`page → hook → userService → api (mock ou réel) → adapter → composant`

### Gestion des erreurs

Toutes les erreurs aboutissent au même template, `pages/ErrorPage` :

| Cas                                          | Comportement                                               |
| -------------------------------------------- | ---------------------------------------------------------- |
| URL inconnue                                 | route `*` → ErrorPage 404, lien vers le dashboard si connecté |
| Erreur API (0, 401, 403, 404, 500…)          | `useErrorRedirect` → `/error/:status`                      |
| Session refusée (401 / 403)                  | ErrorPage → lien « Retour à la connexion » qui ferme la session |
| Serveur injoignable (0) / erreur serveur (500) | ErrorPage → retour à la connexion (évite une boucle d'erreurs) |
| Composant qui plante au rendu                | `ErrorBoundary` → ErrorPage 500                            |
| Mauvais identifiants (400 / 401 au login)    | message sous le formulaire (erreur de saisie, pas une panne) |