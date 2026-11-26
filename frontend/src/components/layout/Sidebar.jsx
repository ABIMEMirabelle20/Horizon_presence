import { NavLink } from 'react-router-dom';
import { GraduationCap, X } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({
  title = 'Horizon',
  subtitle = 'Présence',
  links = [],
  open = false,
  onClose,
}) {
  return (
    <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <GraduationCap size={22} />
        </div>
        <div className="sidebar__brand-text">
          <span>{title}</span>
          <span>{subtitle}</span>
        </div>
        <button className="sidebar__close" onClick={onClose} aria-label="Fermer le menu">
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar__nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
          >
            {Icon && <Icon size={18} />}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}