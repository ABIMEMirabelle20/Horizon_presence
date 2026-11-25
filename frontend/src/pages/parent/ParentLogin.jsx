import { useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useParent } from '../../context/useParent.js'

// Connexion de démonstration : aucun mot de passe n’est vérifié côté serveur.
export default function ParentLogin() {
  const { login } = useParent()
  const navigate = useNavigate()

  const enter = () => {
    login()
    navigate('/parent')
  }

  return (
    <div className="hp-login">
      <div className="hp-card hp-login__card">
        <span className="hp-brand__mark"><LockKeyhole aria-hidden="true" /></span>
        <h1>Espace parent</h1>
        <p>Connectez-vous pour suivre l’assiduité de vos enfants.</p>
        <button type="button" className="hp-btn hp-btn--primary" onClick={enter}>
          Entrer dans l’espace (démo)
        </button>
      </div>
    </div>
  )
}
