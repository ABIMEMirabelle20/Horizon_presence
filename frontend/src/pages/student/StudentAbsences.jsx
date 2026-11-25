import { useState } from 'react';
import { Link } from 'react-router-dom';
import { student, historique } from '../../data/studentMock';
import './StudentAbsences.css';

const incidents = historique.filter((h) => h.statut !== 'present');

const FILTRES = [
  { value: 'tous', label: 'Tous' },
  { value: 'absent', label: 'Absences' },
  { value: 'retard', label: 'Retards' },
];

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

export default function StudentAbsences() {
  const [filtre, setFiltre] = useState('tous');

  const nbAbsences = incidents.filter((i) => i.statut === 'absent').length;
  const nbRetards = incidents.filter((i) => i.statut === 'retard').length;
  const nbNonJustifiees = incidents.filter((i) => i.statut === 'absent' && !i.justifie).length;

  const liste = incidents
    .filter((i) => filtre === 'tous' || i.statut === filtre)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <h1>Mes absences et retards</h1>
      <p className="absences__subtitle">Classe {student.classe}</p>

      <section className="absences__stats">
        <div className="absences__stat absences__stat--danger">
          <div className="absences__stat-label">Absences</div>
          <div className="absences__stat-value">{nbAbsences}</div>
        </div>
        <div className="absences__stat absences__stat--warning">
          <div className="absences__stat-label">Retards</div>
          <div className="absences__stat-value">{nbRetards}</div>
        </div>
        <div className="absences__stat">
          <div className="absences__stat-label">Non justifiées</div>
          <div className="absences__stat-value">{nbNonJustifiees}</div>
        </div>
      </section>

      <div className="absences__filters">
        {FILTRES.map((f) => (
          <button
            key={f.value}
            className={`absences__filter${filtre === f.value ? ' absences__filter--active' : ''}`}
            onClick={() => setFiltre(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="absences__wrapper">
        {liste.length === 0 ? (
          <p className="absences__empty">Rien à afficher.</p>
        ) : (
          <table className="absences__table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Matière</th>
                <th>Créneau</th>
                <th>Type</th>
                <th>Détail</th>
              </tr>
            </thead>
            <tbody>
              {liste.map((i) => (
                <tr key={i.id}>
                  <td>{formatDate(i.date)}</td>
                  <td>{i.matiere}</td>
                  <td>{i.creneau}</td>
                  <td>
                    <span className={`badge badge--${i.statut}`}>
                      {i.statut === 'absent' ? 'Absent' : 'Retard'}
                    </span>
                  </td>
                  <td>
                    {i.statut === 'retard' && `${i.minutes} min de retard`}
                    {i.statut === 'absent' && i.justifie && 'Justifiée'}
                    {i.statut === 'absent' && !i.justifie && (
                      <>
                        Non justifiée ·{' '}
                        <Link className="absences__link" to={`/student/demandes?type=justification&absence=${i.id}`}>Justifier</Link>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}