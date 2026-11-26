import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, Clock3, Printer, X } from 'lucide-react'
import './Assiduite.css'
import {
  absencesForChild,
  children,
  dayNames,
  recordsForChild,
  scheduleSlots,
  statusesForChild,
} from '../../data/parentData'
import AttendanceTable from '../../components/common/AttendanceTable'
import ChildChips from '../../components/common/ChildChips'
import Calendar from '../../components/ui/Calendar'
import Stat from '../../components/ui/Stat'

function Day({ day, slots }) {
  return (
    <div className="hp-schedule__day">
      <h3>{day}</h3>
      {slots.length ? (
        slots.map((slot, index) => (
          <div className={`hp-slot hp-slot--${slot.tone}`} key={`${slot.course}-${index}`}>
            <strong>{slot.course}</strong>
            <span>{slot.time}</span>
            <span>Salle {slot.room}</span>
          </div>
        ))
      ) : (
        <p className="hp-slot-empty">Aucun cours</p>
      )}
    </div>
  )
}

export default function Assiduite() {
  const [params, setParams] = useSearchParams()
  const rawId = params.get('enfant')
  const requestedId = rawId === null ? children[0].id : Number(rawId)
  const child = children.find((item) => item.id === requestedId) || children[0]
  const unknownChild = rawId !== null && child.id !== requestedId

  // Une URL avec un identifiant inconnu est corrigée silencieusement.
  useEffect(() => {
    if (!unknownChild) return
    const next = new URLSearchParams(params)
    next.set('enfant', String(child.id))
    setParams(next, { replace: true })
  }, [unknownChild, child.id, params, setParams])

  const records = recordsForChild(child.id)
  const slots = scheduleSlots[child.id] || []

  return (
    <>
      <header className="hp-page-head">
        <div>
          <h1>Assiduité · {child.name.split(' ')[0]}</h1>
          <p>Emploi du temps, calendrier et absences de {child.name} (classe {child.className}).</p>
        </div>
        <ChildChips />
      </header>

      {unknownChild && (
        <p className="hp-notice" role="status">
          Cet identifiant d’enfant est inconnu. L’assiduité de {child.name} est affichée.
        </p>
      )}

      <div className="hp-stats hp-stats--three">
        <Stat
          label="Présents"
          value={records.filter((record) => record.status === 'present').length}
          icon={Check}
          hint="Novembre 2026"
        />
        <Stat
          label="Absents"
          value={records.filter((record) => record.status === 'absent').length}
          icon={X}
          hint="Novembre 2026"
        />
        <Stat
          label="Absences justifiées"
          value={records.filter((record) => record.status === 'excused').length}
          icon={Clock3}
          hint="Novembre 2026"
        />
      </div>

      <section className="hp-section hp-section--first">
        <div className="hp-section__head">
          <h2>Grille hebdomadaire</h2>
          <span className="hp-muted">Lundi → Samedi</span>
        </div>
        <div className="hp-card">
          <div className="hp-schedule__grid">
            {dayNames.map((day, index) => (
              <Day key={day} day={day} slots={slots.filter((slot) => slot.day === index + 1)} />
            ))}
          </div>
          <div className="hp-schedule__mobile">
            {dayNames.map((day, index) => (
              <Day key={day} day={day} slots={slots.filter((slot) => slot.day === index + 1)} />
            ))}
          </div>
        </div>
      </section>

      <section className="hp-section">
        <div className="hp-section__head">
          <h2>Calendrier des présences</h2>
          <span className="hp-muted">Absences en rouge, présences en vert</span>
        </div>
        <Calendar statuses={statusesForChild(child.id)} />
      </section>

      <section className="hp-section">
        <div className="hp-section__head">
          <h2>Absences de {child.name.split(' ')[0]}</h2>
          <div className="hp-section__actions">
            <button
              type="button"
              className="hp-btn hp-btn--ghost hp-btn--sm"
              onClick={() => window.print()}
            >
              <Printer aria-hidden="true" /> Imprimer
            </button>
            <Link className="hp-link" to="/parent/justifier-absence">Justifier une absence</Link>
          </div>
        </div>
        <AttendanceTable
          records={absencesForChild(child.id)}
          searchable
          paginate
          pageSize={5}
          caption={`Absences de ${child.name} — novembre 2026`}
        />
        <p className="hp-hint hp-note">
          Les absences sont affichées avec ou sans motif. Celles sans motif peuvent être justifiées depuis la page dédiée.
        </p>
      </section>
    </>
  )
}
