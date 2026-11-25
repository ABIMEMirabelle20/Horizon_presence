import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Tableau de bord', path: '/', icon: LayoutDashboard },
  { label: 'Elèves', path: '/admin/etudiants', icon: Users },
  { label: 'Enseignants', path: '/admin/enseignants', icon: UserCheck },
  { label: 'Classes', path: '/admin/classes', icon: Building2 },
  { label: 'Cours', path: '/admin/cours', icon: BookOpen },
  { label: 'Emploi du temps', path: '/admin/emplois-du-temps', icon: Calendar },
  { label: 'Présences', path: '/enseignant', icon: CheckSquare },
  { label: 'Demandes', path: '/demandes', icon: FileText },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Rapports', path: '/admin/rapports', icon: BarChart3 },
  { label: 'Paramètres', path: '/admin/parametres', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isCurrentPath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-horizon text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-royal rounded-xl text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white block">Horizon</span>
              <span className="text-xs text-mist font-medium tracking-wider -mt-1 block">Présence</span>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isCurrentPath(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-royal text-white shadow-sm font-semibold'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-white/70'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
