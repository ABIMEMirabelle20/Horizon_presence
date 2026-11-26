import { Link } from 'react-router-dom'
import './ParentDashboard.css'
import {
  AlertCircle,
  Bell,
  ClipboardCheck,
  FilePlus2,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { absencesForChild, attendanceRecords, children } from '../../data/parentData'
import AttendanceTable from '../../components/common/AttendanceTable'
import Stat from '../../components/ui/Stat'
import { useParent } from '../../context/useParent.js'

export default function ParentDashboard() {
  const { user, unreadCount } = useParent()
  const latestAbsences = attendanceRecords
    .filter((record) => record.status !== 'present')
    .slice(-5)
    .reverse()

  const averageRate = Math.round(
    children.reduce((sum, child) => sum + child.rate, 0) / children.length,
  )
  const absencesCount = children.reduce(
    (sum, child) => sum + absencesForChild(child.id).length,
    0,
  )

  // Les accès vers Mes enfants, Notifications et Profil seront ajoutés par le binôme.
  const quickLinks = [
    { to: '/parent/assiduite', label: 'Assiduité', hint: 'Emploi du temps, calendrier et absences', Icon: ClipboardCheck },
    { to: '/parent/justifier-absence', label: 'Justifier une absence', hint: 'Choisir une date et un motif', Icon: FilePlus2 },
  ]

  return (
    <>
      <header className="hp-page-head">
        <div>
          <h1>Tableau de bord</h1>
          <p>Vue d’ensemble de la scolarité de vos enfants</p>
        </div>
      </header>

      <section className="hp-hero">
        <h2>Espace parent</h2>
        <p>Bienvenue, {user.name}</p>
        <span className="hp-hero__badge">
          <ShieldCheck aria-hidden="true" /> Année scolaire 2026-2027
        </span>
      </section>

      <div className="hp-stats">
        <Stat label="Enfants suivis" value={children.length} icon={Users} hint="Toutes les classes" />
        <Stat label="Taux de présence moyen" value={`${averageRate} %`} icon={ClipboardCheck} hint="Novembre 2026" />
        <Stat label="Absences enregistrées" value={absencesCount} icon={AlertCircle} hint="Novembre 2026" />
        <Stat label="Notifications non lues" value={unreadCount} icon={Bell} hint="Mises à jour en direct" />
      </div>

      <section className="hp-section">
        <div className="hp-section__head"><h2>Accès rapides</h2></div>
        <div className="hp-quick-grid">
          {quickLinks.map(({ to, label, hint, Icon }) => (
            <Link className="hp-quick" to={to} key={to}>
              <span className="hp-quick__icon"><Icon aria-hidden="true" /></span>
              <span>
                <strong>{label}</strong>
                <span>{hint}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hp-section">
        <div className="hp-section__head">
          <h2>Dernières absences</h2>
          <Link className="hp-link" to="/parent/assiduite">Tout voir</Link>
        </div>
        <AttendanceTable records={latestAbsences} showChild caption="Dernières absences (novembre 2026)" />
        <p className="hp-hint hp-note">
          Période affichée : novembre 2026 · dernière connexion : {user.lastLogin}.
        </p>
      </section>
    </>
  )
}
