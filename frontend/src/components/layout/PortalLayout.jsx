import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import './PortalLayout.css';

export default function PortalLayout({ links, title = 'Horizon', subtitle = 'Présence' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const fermer = () => setMenuOpen(false);

  return (
    <div className="portal-layout">
      <Sidebar title={title} subtitle={subtitle} links={links} open={menuOpen} onClose={fermer} />

      {menuOpen && <div className="portal-layout__overlay" onClick={fermer} />}

      <div className="portal-layout__content">
        <header className="portal-layout__topbar">
          <button
            className="portal-layout__menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>
          <strong>{title} {subtitle}</strong>
        </header>

        <main className="portal-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}