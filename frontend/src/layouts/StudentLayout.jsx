import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Home, CalendarDays, QrCode, CheckCircle2, Clock, FileText, Bell, User, Menu,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import './StudentLayout.css';

const links = [
  { to: '/student', label: 'Mon accueil', icon: Home, end: true },
  { to: '/student/emploi-du-temps', label: 'Mon emploi du temps', icon: CalendarDays },
  { to: '/student/scanner', label: 'Scanner', icon: QrCode },
  { to: '/student/presences', label: 'Mes présences', icon: CheckCircle2 },
  { to: '/student/absences', label: 'Mes absences et retards', icon: Clock },
  { to: '/student/demandes', label: 'Mes demandes', icon: FileText },
  { to: '/student/notifications', label: 'Mes notifications', icon: Bell },
  { to: '/student/profil', label: 'Mon profil', icon: User },
];

export default function StudentLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const fermer = () => setMenuOpen(false);

  return (
    <div className="student-layout">
      <Sidebar links={links} open={menuOpen} onClose={fermer} />

      {menuOpen && <div className="student-layout__overlay" onClick={fermer} />}

      <div className="student-layout__content">
        <header className="student-layout__topbar">
          <button
            className="student-layout__menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>
          <strong>Horizon Présence</strong>
        </header>

        <main className="student-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}