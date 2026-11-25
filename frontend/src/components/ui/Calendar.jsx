import { useId, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatLongDate } from '../../data/parentData'

const WEEKDAYS = [
  { short: 'L', long: 'Lundi' },
  { short: 'M', long: 'Mardi' },
  { short: 'M', long: 'Mercredi' },
  { short: 'J', long: 'Jeudi' },
  { short: 'V', long: 'Vendredi' },
  { short: 'S', long: 'Samedi' },
  { short: 'D', long: 'Dimanche' },
]
const STATUS_LABELS = {
  present: 'Présence',
  absent: 'Absence',
  excused: 'Absence justifiée',
}
const TODAY = '2026-11-25'
const MIN_DATE = '2026-11-01'
const MAX_DATE = '2026-11-30'
const pad = (value) => String(value).padStart(2, '0')

/**
 * Calendrier des données fictives de novembre 2026.
 * - statuses : { '2026-11-04': 'absent', ... } colore les jours.
 * - pick / selected / onSelect : mode choix de date avec boutons radio.
 * - name : nom du groupe de radios (généré automatiquement si absent).
 */
export default function Calendar({ statuses = {}, selected, onSelect, pick = false, name }) {
  const autoName = useId()
  const radioName = name || autoName
  const [view, setView] = useState({ year: 2026, month: 10 })

  const firstWeekday = new Date(view.year, view.month, 1).getDay()
  const startIndex = (firstWeekday + 6) % 7 // lundi en premier
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()

  const cells = Array(startIndex).fill(null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(`${view.year}-${pad(view.month + 1)}-${pad(day)}`)
  }
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let index = 0; index < cells.length; index += 7) weeks.push(cells.slice(index, index + 7))

  const label = new Date(view.year, view.month, 1).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })

  const shiftMonth = (delta) => {
    setView((current) => {
      const next = new Date(current.year, current.month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  const isAvailable = (key) => key >= MIN_DATE && key <= MAX_DATE
  const dayNumber = (key) => Number(key.slice(-2))
  const accessibleLabel = (key) => {
    const status = statuses[key]
    const today = key === TODAY ? ' (aujourd’hui)' : ''
    return `${formatLongDate(key)}${status ? ` : ${STATUS_LABELS[status]}` : ''}${today}`
  }

  return (
    <div className="hp-calendar">
      <div className="hp-calendar__head">
        <button
          type="button"
          className="hp-calendar__arrow"
          aria-label="Mois précédent"
          onClick={() => shiftMonth(-1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <span className="hp-calendar__month" aria-live="polite">{label}</span>
        <button
          type="button"
          className="hp-calendar__arrow"
          aria-label="Mois suivant"
          onClick={() => shiftMonth(1)}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="hp-weekdays" role="row">
        {WEEKDAYS.map((day) => (
          <span key={day.long} role="columnheader" aria-label={day.long}>{day.short}</span>
        ))}
      </div>

      <div
        className={`hp-calendar__grid${pick ? ' hp-calendar__grid--pick' : ''}`}
        role="grid"
        aria-label={`Calendrier ${label}`}
      >
        {weeks.map((week, weekIndex) => (
          <div className="hp-calendar__row" role="row" key={`semaine-${weekIndex}`}>
            {week.map((key, dayIndex) => {
              if (!key) {
                return (
                  <span
                    key={`vide-${weekIndex}-${dayIndex}`}
                    className="hp-day hp-day--empty"
                    role="gridcell"
                  />
                )
              }

              const status = statuses[key]
              const todayClass = key === TODAY ? ' hp-day--today' : ''

              if (pick) {
                return (
                  <span className="hp-day hp-day--pick" role="gridcell" key={key}>
                    <label className="hp-day__label">
                      <input
                        type="radio"
                        name={radioName}
                        value={key}
                        checked={selected === key}
                        disabled={!isAvailable(key)}
                        aria-label={accessibleLabel(key)}
                        onChange={() => onSelect?.(key)}
                      />
                      <span className="hp-day__num">{dayNumber(key)}</span>
                    </label>
                  </span>
                )
              }

              const classes = `hp-day${status ? ` hp-day--${status}` : ''}${todayClass}`
              const content = (
                <>
                  <span className="hp-day__num">{dayNumber(key)}</span>
                  {status && <span className="hp-day__dot" aria-hidden="true" />}
                  {key === TODAY && <span className="hp-sr-only"> (aujourd’hui)</span>}
                </>
              )

              return (
                <span className="hp-day-cell" role="gridcell" key={key}>
                  {status ? (
                    <button
                      type="button"
                      className={classes}
                      title={STATUS_LABELS[status]}
                      aria-label={accessibleLabel(key)}
                      disabled={!isAvailable(key)}
                    >
                      {content}
                    </button>
                  ) : (
                    <span className={classes} aria-label={accessibleLabel(key)}>
                      {content}
                    </span>
                  )}
                </span>
              )
            })}
          </div>
        ))}
      </div>

      {!pick && (
        <div className="hp-legend">
          <span><i className="hp-legend__dot hp-legend__dot--present" /> Présent</span>
          <span><i className="hp-legend__dot hp-legend__dot--absent" /> Absent</span>
          <span><i className="hp-legend__dot hp-legend__dot--excused" /> Justifié</span>
        </div>
      )}
    </div>
  )
}
