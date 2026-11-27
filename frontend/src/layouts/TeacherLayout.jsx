import {
  LayoutDashboard, Users, ClipboardCheck, CalendarDays, History, BarChart3, User,
} from 'lucide-react';
import PortalLayout from '../components/layout/PortalLayout';

const links = [
  { to: '/teacher', label: 'Mon tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/teacher/classes', label: 'Mes classes', icon: Users },
  { to: '/teacher/appel', label: "Faire l'appel", icon: ClipboardCheck },
  { to: '/teacher/emploi-du-temps', label: 'Mon emploi du temps', icon: CalendarDays },
  { to: '/teacher/historique', label: 'Historique des présences', icon: History },
  { to: '/teacher/rapports', label: 'Mes rapports', icon: BarChart3 },
  { to: '/teacher/profil', label: 'Mon profil', icon: User },
];

export default function TeacherLayout() {
  return <PortalLayout links={links} />;
}