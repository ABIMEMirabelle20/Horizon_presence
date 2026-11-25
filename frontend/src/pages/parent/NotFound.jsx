import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="hp-notfound">
      <span className="hp-notfound__icon"><Compass aria-hidden="true" /></span>
      <h1>Page introuvable</h1>
      <p>Cette adresse n’existe pas dans l’espace parent.</p>
      <Link className="hp-btn hp-btn--primary" to="/parent">Retour à l’accueil</Link>
    </div>
  )
}
