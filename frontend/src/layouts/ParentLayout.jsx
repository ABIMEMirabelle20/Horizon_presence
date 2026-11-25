import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  ClipboardCheck,
  FilePlus2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
} from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb.jsx'
import { useParent } from '../context/useParent.js'

// 3 entrées seulement : Mes enfants, Notifications et Profil sont à faire par le binôme.
const PARENT_NAV_ITEMS = [
  { to: '/parent', label: 'Accueil', Icon: LayoutDashboard, end: true },
  { to: '/parent/assiduite', label: 'Assiduité', Icon: ClipboardCheck },
  { to: '/parent/justifier-absence', label: 'Justifier une absence', Icon: FilePlus2 },
]

const PAGE_TITLES = {
  '/parent': 'Tableau de bord',
  '/parent/assiduite': 'Assiduité',
  '/parent/justifier-absence': 'Justifier une absence',
}

export default function ParentLayout() {
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const mainRef = useRef(null)
  const sidebarRef = useRef(null)
  const menuButtonRef = useRef(null)
  const { user, initials, logout } = useParent()

  const title = PAGE_TITLES[pathname] || 'Espace parent'

  // À chaque changement de page : titre du navigateur et focus sur le contenu.
  useEffect(() => {
    document.title = `${title} | Horizon`
    mainRef.current?.focus()
  }, [pathname, title])

  // Le tiroir mobile se ferme dès qu'un lien du layout est utilisé.
  const closeDrawer = () => setDrawerOpen(false)

  // Menu mobile : Échap, piège de focus et blocage du défilement.
  useEffect(() => {
    if (!drawerOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    sidebarRef.current?.querySelector('a')?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const nodes = sidebarRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!nodes?.length) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerOpen])

  return (
    <>
      <a className="hp-skip-link" href="#contenu-principal">Aller au contenu</a>

      <div className="hp-app">
        {drawerOpen && (
          <button
            type="button"
            className="hp-backdrop hp-backdrop--visible"
            aria-label="Fermer le menu"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <aside
          id="menu-parent"
          ref={sidebarRef}
          className={`hp-sidebar${drawerOpen ? ' hp-sidebar--open' : ''}`}
        >
          <div className="hp-brand">
            <span className="hp-brand__mark"><GraduationCap aria-hidden="true" /></span>
            <span className="hp-brand__text">
              <strong>Horizon</strong>
              <span>Espace parent</span>
            </span>
          </div>

          <nav className="hp-nav" aria-label="Menu de l’espace parent">
            {PARENT_NAV_ITEMS.map(({ to, label, Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeDrawer}
                className={({ isActive }) => `hp-nav__item${isActive ? ' hp-nav__item--active' : ''}`}
              >
                <Icon aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hp-sidebar__footer">
            <span className="hp-sidebar__secure"><ShieldCheck aria-hidden="true" /> Espace sécurisé</span>
            <span className="hp-sidebar__session">Dernière connexion : {user.lastLogin}</span>
            <button type="button" className="hp-logout" onClick={logout}>
              <LogOut aria-hidden="true" /> Déconnexion
            </button>
          </div>
        </aside>

        <div className="hp-main">
          <header className="hp-topbar">
            <button
              ref={menuButtonRef}
              type="button"
              className="hp-icon-button hp-menu-button"
              aria-label="Ouvrir le menu"
              aria-expanded={drawerOpen}
              aria-controls="menu-parent"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu aria-hidden="true" />
            </button>

            <div className="hp-topbar__title">{title}</div>

            <div className="hp-topbar__actions">
              <div className="hp-user-chip">
                <span>{user.name}</span>
                <span className="hp-avatar">{initials}</span>
              </div>
            </div>
          </header>

          <main id="contenu-principal" ref={mainRef} tabIndex={-1} className="hp-content">
            <Breadcrumb current={title} />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
