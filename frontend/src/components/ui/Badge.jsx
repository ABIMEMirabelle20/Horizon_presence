import { Check, Clock3, X } from 'lucide-react'

// Dictionnaire : un statut -> son libellé et son icône.
const STATUSES = {
  present: { label: 'Présent', Icon: Check },
  absent: { label: 'Absent', Icon: X },
  excused: { label: 'Justifié', Icon: Clock3 },
  pending: { label: 'En attente', Icon: Clock3 },
  accepted: { label: 'Acceptée', Icon: Check },
  rejected: { label: 'Refusée', Icon: X },
}

export default function Badge({ status = 'pending', label }) {
  const { label: defaultLabel, Icon } = STATUSES[status] || STATUSES.pending

  return (
    <span className={`hp-badge hp-badge--${status}`}>
      <Icon aria-hidden="true" />
      {label || defaultLabel}
    </span>
  )
}
