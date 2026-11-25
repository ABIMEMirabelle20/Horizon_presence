import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ title = 'Horizon Présence', links = [] }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">{title}</div>
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