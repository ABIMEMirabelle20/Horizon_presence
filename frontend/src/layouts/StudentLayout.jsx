import {
  Home, CalendarDays, QrCode, CheckCircle2, Clock, FileText, Bell, User,
} from 'lucide-react';
import PortalLayout from '../components/layout/PortalLayout';

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
  return <PortalLayout links={links} />;
}