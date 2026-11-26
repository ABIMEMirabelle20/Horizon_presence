import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Clock3 } from 'lucide-react'
import { children, formatFrenchDate } from '../../data/parentData'
import { useParent } from '../../context/useParent.js'
import Badge from '../../components/ui/Badge'
import Calendar from '../../components/ui/Calendar'
import './JustifyAbscence.css'
const MAX_FILE_SIZE = 2 * 1024 * 1024

export default function JustifyAbsence() {
  const { justifications, addJustification } = useParent()
  const [childId, setChildId] = useState('')
  const [date, setDate] = useState('2026-11-17')
  const [reason, setReason] = useState('')
  const [errors, setErrors] = useState({})
  const [fileError, setFileError] = useState('')
  const [fileName, setFileName] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const clearFeedback = () => {
    setSent(false)
    setErrors({})
  }

  const onFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file && file.size > MAX_FILE_SIZE) {
      setFileError('Le justificatif doit faire 2 Mo maximum.')
      setFileName('')
      event.target.value = ''
      return
    }
    setFileError('')
    setFileName(file ? `${file.name} · ${(file.size / 1024).toFixed(0)} Ko` : '')
  }

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!childId) nextErrors.child = 'Choisissez un enfant.'
    if (!date) nextErrors.date = 'Choisissez une date sur le calendrier.'
    if (reason.trim().length < 5) nextErrors.reason = 'Le motif doit contenir au moins 5 caractères.'
    if (fileError) nextErrors.file = fileError

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSending(true)
    // Petite pause pour montrer l'état "en cours" ; aucun appel réseau n'est fait.
    await new Promise((resolve) => setTimeout(resolve, 400))
    addJustification({
      childId: Number(childId),
      date,
      course: 'Absence sélectionnée',
      reason: reason.trim(),
      status: 'pending',
    })
    setSending(false)
    setSent(true)
    setReason('')
    setChildId('')
  }

  const confirmCancel = (event) => {
    if ((childId || reason.trim()) && !window.confirm('Abandonner la demande en cours ?')) {
      event.preventDefault()
    }
  }

  return (
    <>
      <header className="hp-page-head">
        <div>
          <h1>Justifier une absence</h1>
          <p>Page dédiée : choisissez une date sur le calendrier puis écrivez le motif.</p>
        </div>
      </header>

      <div className="hp-form-layout">
        <form className="hp-card hp-form" onSubmit={submit}>
          <h2 className="hp-card__title">Nouvelle justification</h2>
          <p className="hp-card__subtitle">Le parent sélectionne la date et indique le motif de l’absence.</p>

          {sent && (
            <p className="hp-success" role="status">
              <Check aria-hidden="true" /> Demande envoyée. Elle est en attente de décision.
            </p>
          )}

          <div className="hp-field">
            <label className="hp-label" htmlFor="enfant">Enfant *</label>
            <select
              className="hp-select"
              id="enfant"
              required
              value={childId}
              aria-invalid={Boolean(errors.child)}
              aria-describedby={errors.child ? 'erreur-enfant' : undefined}
              onChange={(event) => {
                setChildId(event.target.value)
                clearFeedback()
              }}
            >
              <option value="">Choisir un enfant</option>
              {children.map((child) => (
                <option value={child.id} key={child.id}>{child.name} — {child.className}</option>
              ))}
            </select>
            {errors.child && (
              <span className="hp-field__error" id="erreur-enfant" role="alert">{errors.child}</span>
            )}
          </div>

          <fieldset className="hp-field hp-fieldset">
            <legend className="hp-label">Date de l’absence *</legend>
            <Calendar
              pick
              name="date-absence"
              selected={date}
              onSelect={(value) => {
                setDate(value)
                clearFeedback()
              }}
            />
            <span className="hp-hint">Cliquez sur une date de novembre 2026 pour la choisir.</span>
            {errors.date && <span className="hp-field__error" role="alert">{errors.date}</span>}
          </fieldset>

          <div className="hp-field">
            <label className="hp-label" htmlFor="motif">Motif *</label>
            <textarea
              className="hp-textarea"
              id="motif"
              rows={4}
              required
              minLength={5}
              value={reason}
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={errors.reason ? 'erreur-motif' : undefined}
              placeholder="Ex. : rendez-vous médical, maladie, cérémonie familiale…"
              onChange={(event) => {
                setReason(event.target.value)
                clearFeedback()
              }}
            />
            <span className="hp-hint">Le motif est obligatoire (au moins 5 caractères).</span>
            {errors.reason && (
              <span className="hp-field__error" id="erreur-motif" role="alert">{errors.reason}</span>
            )}
          </div>

          <div className="hp-field">
            <label className="hp-label" htmlFor="justificatif">Justificatif (facultatif)</label>
            <input
              className="hp-input"
              type="file"
              id="justificatif"
              accept=".pdf,.jpg,.jpeg,.png"
              aria-invalid={Boolean(fileError)}
              aria-describedby={fileError ? 'erreur-fichier' : 'hint-fichier'}
              onChange={onFileChange}
            />
            <span className="hp-hint" id="hint-fichier">PDF, JPG ou PNG · 2 Mo maximum.</span>
            {fileName && <span className="hp-hint">Fichier sélectionné : {fileName}</span>}
            {fileError && (
              <span className="hp-field__error" id="erreur-fichier" role="alert">{fileError}</span>
            )}
          </div>

          <div className="hp-form__actions">
            <button type="submit" className="hp-btn hp-btn--primary" disabled={sending}>
              {sending ? <Clock3 aria-hidden="true" /> : <Check aria-hidden="true" />}
              {sending ? 'Envoi en cours…' : 'Envoyer la demande'}
            </button>
            <Link
              className="hp-btn hp-btn--ghost"
              to="/parent/assiduite"
              onClick={confirmCancel}
            >
              Annuler
            </Link>
          </div>
        </form>

        <aside className="hp-card">
          <h2 className="hp-card__title">Mes demandes en cours</h2>
          <p className="hp-card__subtitle">Une seule demande en attente par absence.</p>
          {justifications.length === 0 ? (
            <div className="hp-empty-state">Aucune demande en cours.</div>
          ) : (
            justifications.map((request) => (
              <div className="hp-request" key={request.id}>
                <div className="hp-request__head">
                  <strong>{children.find((child) => child.id === request.childId)?.name || 'Enfant'}</strong>
                  <Badge status={request.status} />
                </div>
                <p>
                  <time dateTime={request.date}>{formatFrenchDate(request.date)}</time> · {request.course}
                </p>
                <p className="hp-hint">{request.reason}</p>
              </div>
            ))
          )}
          <p className="hp-hint">Après décision de l’administration : acceptée ou refusée.</p>
        </aside>
      </div>
    </>
  )
}
