import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { student, historique, demandes as demandesInitiales } from '../../data/studentMock';
import './StudentRequests.css';

const STATUTS = {
  en_attente: { label: 'En attente', className: 'badge--attente' },
  acceptee: { label: 'Acceptée', className: 'badge--acceptee' },
  refusee: { label: 'Refusée', className: 'badge--refusee' },
};

const TYPES = {
  justification: "Justification d'absence",
  autorisation: "Autorisation d'absence",
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

const today = new Date().toISOString().slice(0, 10);

export default function StudentRequests() {
  const [params] = useSearchParams();
  const [demandes, setDemandes] = useState(demandesInitiales);
  const [type, setType] = useState(
    params.get('type') === 'autorisation' ? 'autorisation' : 'justification'
  );
  const [form, setForm] = useState({
    absenceId: params.get('absence') || '',
    du: '',
    au: '',
    motif: '',
    fichier: '',
  });
  const [erreur, setErreur] = useState('');
  const [succes, setSucces] = useState('');

  const fileRef = useRef(null);

  const retirerFichier = () => {
    if (fileRef.current) fileRef.current.value = '';
    setForm((f) => ({ ...f, fichier: '' }));
    };

  const absencesJustifiables = historique.filter(
    (h) =>
      h.statut === 'absent' &&
      !h.justifie &&
      !demandes.some(
        (d) => d.type === 'justification' && d.absenceId === h.id && d.statut !== 'refusee'
      )
  );

  const update = (champ) => (e) => setForm({ ...form, [champ]: e.target.value });

  const changerType = (t) => {
    setType(t);
    setErreur('');
    setSucces('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSucces('');

    if (type === 'justification' && !form.absenceId) {
      return setErreur('Sélectionne l\'absence à justifier.');
    }
    if (type === 'autorisation') {
      if (!form.du || !form.au) return setErreur('Renseigne les dates de début et de fin.');
      if (form.au < form.du) return setErreur('La date de fin doit être après la date de début.');
    }
    if (!form.motif.trim()) return setErreur('Le motif est obligatoire.');

    const nouvelle = {
      id: Date.now(),
      type,
      motif: form.motif.trim(),
      statut: 'en_attente',
      creeLe: today,
      ...(type === 'justification'
        ? { absenceId: Number(form.absenceId), fichier: form.fichier }
        : { du: form.du, au: form.au }),
    };

    setDemandes((prev) => [nouvelle, ...prev]);
    setForm({ absenceId: '', du: '', au: '', motif: '', fichier: '' });
    if (fileRef.current) fileRef.current.value = '';
    setErreur('');
    setSucces('Ta demande a bien été envoyée.');
  };

  const decrireObjet = (d) => {
    if (d.type === 'justification') {
      const abs = historique.find((h) => h.id === d.absenceId);
      return abs ? `${abs.matiere} · ${formatDate(abs.date)}` : '—';
    }
    return d.du === d.au
      ? `Le ${formatDate(d.du)}`
      : `Du ${formatDate(d.du)} au ${formatDate(d.au)}`;
  };

  return (
    <div>
      <h1>Mes demandes</h1>
      <p className="requests__subtitle">Classe {student.classe}</p>

      <section className="requests__card">
        <h2>Nouvelle demande</h2>

        <div className="requests__types">
          {Object.entries(TYPES).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`requests__type${type === value ? ' requests__type--active' : ''}`}
              onClick={() => changerType(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <form className="requests__form" onSubmit={handleSubmit}>
          {type === 'justification' ? (
            <>
              <label className="requests__field">
                Absence concernée
                <select value={form.absenceId} onChange={update('absenceId')}>
                  <option value="">Choisir une absence</option>
                  {absencesJustifiables.map((a) => (
                    <option key={a.id} value={a.id}>
                      {formatDate(a.date)} · {a.matiere} ({a.creneau})
                    </option>
                  ))}
                </select>
              </label>
              <div className="requests__field">
                    Justificatif (facultatif)
                    <div className="requests__file">
                        <label className="requests__file-btn">
                            <Upload size={16} />
                            Choisir un fichier
                            <input
                                ref={fileRef}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                hidden
                                onChange={(e) => setForm({ ...form, fichier: e.target.files[0]?.name || '' })}
                            />
                        </label>
                        <span className="requests__file-name">
                            {form.fichier || 'Aucun fichier sélectionné (PDF, JPG, PNG)'}
                        </span>
                            {form.fichier && (
                            <button type="button" className="requests__file-remove" onClick={retirerFichier} aria-label="Retirer le fichier">
                                <X size={16} />
                            </button>
                            )}
                    </div>
               </div>
            </>
          ) : (
            <div className="requests__row">
              <label className="requests__field">
                Du
                <input type="date" min={today} value={form.du} onChange={update('du')} />
              </label>
              <label className="requests__field">
                Au
                <input type="date" min={form.du || today} value={form.au} onChange={update('au')} />
              </label>
            </div>
          )}

          <label className="requests__field">
            Motif
            <textarea value={form.motif} onChange={update('motif')} placeholder="Explique la raison de ta demande" />
          </label>

          {erreur && <p className="requests__error">{erreur}</p>}
          {succes && <p className="requests__success">{succes}</p>}

          <button type="submit" className="requests__submit">Envoyer la demande</button>
        </form>
      </section>

      <section className="requests__card">
        <h2>Historique de mes demandes</h2>
        <div className="requests__wrapper">
          {demandes.length === 0 ? (
            <p className="requests__empty">Aucune demande pour le moment.</p>
          ) : (
            <table className="requests__table">
              <thead>
                <tr>
                  <th>Envoyée le</th>
                  <th>Type</th>
                  <th>Concerne</th>
                  <th>Motif</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((d) => (
                  <tr key={d.id}>
                    <td>{formatDate(d.creeLe)}</td>
                    <td>{TYPES[d.type]}</td>
                    <td>{decrireObjet(d)}</td>
                    <td>{d.motif}</td>
                    <td>
                      <span className={`badge ${STATUTS[d.statut].className}`}>
                        {STATUTS[d.statut].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}