import { Outlet } from 'react-router-dom';
import { Home, CalendarDays, CheckCircle2, Clock, FileText, Bell, User } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import './StudentLayout.css';

const links = [
  { to: '/student', label: 'Mon accueil', icon: Home, end: true },
  { to: '/student/emploi-du-temps', label: 'Mon emploi du temps', icon: CalendarDays },
  { to: '/student/presences', label: 'Mes présences', icon: CheckCircle2 },
  { to: '/student/absences', label: 'Mes absences et retards', icon: Clock },
  { to: '/student/demandes', label: 'Mes demandes', icon: FileText },
  { to: '/student/notifications', label: 'Mes notifications', icon: Bell },
  { to: '/student/profil', label: 'Mon profil', icon: User },
];

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <Sidebar links={links} />
      <main className="student-layout__main">
        <Outlet />
      </main>
    </div>
  );
}