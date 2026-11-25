import { NavLink } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ title = 'Horizon', subtitle = 'Présence', links = [] }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <GraduationCap size={22} />
        </div>
        <div className="sidebar__brand-text">
          <span>{title}</span>
          <span>{subtitle}</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
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