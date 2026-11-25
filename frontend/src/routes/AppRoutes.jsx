import { Navigate, Route, Routes } from 'react-router-dom'
import ParentLayout from '../layouts/ParentLayout.jsx'
import ParentDashboard from '../pages/parent/ParentDashboard.jsx'
import Assiduite from '../pages/parent/Assiduite.jsx'
import JustifyAbsence from '../pages/parent/JustifyAbsence.jsx'
import ParentLogin from '../pages/parent/ParentLogin.jsx'
import NotFound from '../pages/parent/NotFound.jsx'
import { useParent } from '../context/useParent.js'

// Garde de démonstration : sans session, on renvoie vers la connexion.
function RequireParent({ children }) {
  const { isAuthenticated } = useParent()
  return isAuthenticated ? children : <Navigate to="/parent/connexion" replace />
}

// /parent est le "layout" commun ; les 3 pages livrées sont ses enfants.
// Les pages Mes enfants, Notifications et Profil sont laissées au binôme.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/parent" replace />} />
      <Route path="/parent/connexion" element={<ParentLogin />} />
      <Route
        path="/parent"
        element={<RequireParent><ParentLayout /></RequireParent>}
      >
        <Route index element={<ParentDashboard />} />
        <Route path="assiduite" element={<Assiduite />} />
        <Route path="presences" element={<Navigate to="/parent/assiduite" replace />} />
        <Route path="emploi-du-temps" element={<Navigate to="/parent/assiduite" replace />} />
        <Route path="justifier-absence" element={<JustifyAbsence />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
