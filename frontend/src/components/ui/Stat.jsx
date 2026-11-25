// Petite carte qui affiche un chiffre, son icône et une précision facultative.
export default function Stat({ label, value, icon: Icon, hint }) {
  return (
    <div className="hp-stat">
      <span className="hp-stat__icon">
        <Icon aria-hidden="true" />
      </span>
      <span>
        <span className="hp-stat__label">{label}</span>
        <span className="hp-stat__value">{value}</span>
        {hint && <span className="hp-stat__hint">{hint}</span>}
      </span>
    </div>
  )
}
