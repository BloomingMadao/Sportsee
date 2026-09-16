import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';
import Connexion from './pages/Connexion';
import ConnexionForm, { connexionAction } from './components/ConnexionForm';
import Dashboard from './pages/Dashboard';
// import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,          // route par défaut sur "/"
        element: <Connexion />,
        action: connexionAction,  // action pour gérer la soumission du formulaire
      },
      {
        path: "dashboard",    // accessible sur "/dashboard"
        element: <Dashboard />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router} />
  </StrictMode>,
)
