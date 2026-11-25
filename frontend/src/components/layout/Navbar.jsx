import { Link } from 'react-router-dom';
import { Menu, Bell, User, Calendar, BookOpen } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 hover:text-ink hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Quick view switcher for demonstration */}
        <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-50 p-1 rounded-xl border border-slate-200/60">
          <Link
            to="/admin/cours"
            className="px-3 py-1 rounded-lg text-slate-600 hover:text-royal font-medium transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Cours
          </Link>
          <Link
            to="/admin/emplois-du-temps"
            className="px-3 py-1 rounded-lg text-slate-600 hover:text-royal font-medium transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Emploi du temps (Admin)
          </Link>
          <Link
            to="/emploi-du-temps"
            className="px-3 py-1 rounded-lg text-slate-600 hover:text-royal font-medium transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Emploi du temps (Lecture seule)
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative p-2 text-slate-400 hover:text-royal hover:bg-ice rounded-xl transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-royal rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-mist text-royal font-bold flex items-center justify-center text-xs shadow-xs">
            AD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-ink leading-tight">Administration</p>
            <p className="text-[11px] text-slate-400">Pôle Pédagogique</p>
          </div>
        </div>
      </div>
    </header>
  );
}
