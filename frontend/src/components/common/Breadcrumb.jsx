import { Link } from 'react-router-dom'

// Petit fil d’Ariane affiché au-dessus de chaque page de l’espace parent.
export default function Breadcrumb({ current }) {
  return (
    <nav className="hp-breadcrumb" aria-label="Fil d’Ariane">
      <ol>
        <li><Link to="/parent">Espace parent</Link></li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  )
}
