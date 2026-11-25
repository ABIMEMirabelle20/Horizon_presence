import { useContext } from 'react'
import { ParentContext } from './parentContext'

// Petit hook pour lire le contexte parent depuis n'importe quelle page.
export function useParent() {
  const value = useContext(ParentContext)
  if (!value) throw new Error('useParent doit être utilisé dans <ParentProvider>.')
  return value
}
