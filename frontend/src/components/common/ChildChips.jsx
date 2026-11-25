import { useSearchParams } from 'react-router-dom'
import { children } from '../../data/parentData'

// Boutons Aminata / Koffi / Sarah. Le choix est gardé dans l'URL (?enfant=2).
export default function ChildChips() {
  const [params, setParams] = useSearchParams()
  const selected = Number(params.get('enfant') || 1)
  const current = children.find((child) => child.id === selected) || children[0]

  const select = (id) => {
    const next = new URLSearchParams(params)
    next.set('enfant', String(id))
    setParams(next)
  }

  return (
    <div className="hp-chips-wrap">
      <div className="hp-chips" role="group" aria-label="Choisir un enfant">
        {children.map((child) => (
          <button
            type="button"
            key={child.id}
            className={`hp-chip${selected === child.id ? ' hp-chip--active' : ''}`}
            aria-pressed={selected === child.id}
            title={`${child.name} — classe ${child.className}`}
            onClick={() => select(child.id)}
          >
            {child.name.split(' ')[0]}
          </button>
        ))}
      </div>
      <span className="hp-sr-only" aria-live="polite">
        Assiduité affichée pour {current.name}, classe {current.className}.
      </span>
    </div>
  )
}
