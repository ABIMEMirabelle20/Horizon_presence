import { useState } from 'react'
import {
  initialJustifications,
  initialNotifications,
  parentUser as initialParentUser,
} from '../data/parentData'
import { ParentContext } from './parentContext'

// Ce fournisseur centralise les données qui doivent rester cohérentes entre les pages.
// Les pages Mes enfants, Notifications et Profil sont à faire par le binôme.
export function ParentProvider({ children }) {
  const [user, setUser] = useState(initialParentUser)
  const [justifications, setJustifications] = useState(initialJustifications)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const updateUser = (changes) => setUser((current) => ({ ...current, ...changes }))

  const addJustification = (request) =>
    setJustifications((current) => [{ ...request, id: current.length + 1 }, ...current])

  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  const initials = user.name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const unreadCount = initialNotifications.filter((item) => !item.read).length

  return (
    <ParentContext.Provider
      value={{
        user,
        updateUser,
        initials,
        unreadCount,
        justifications,
        addJustification,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </ParentContext.Provider>
  )
}
