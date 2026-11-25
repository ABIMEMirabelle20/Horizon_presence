import { createContext } from 'react'

// Contexte défini dans un fichier à part : les fichiers .jsx n'exportent ainsi
// que des composants, ce qui garde le fast refresh de Vite fonctionnel.
export const ParentContext = createContext(null)
