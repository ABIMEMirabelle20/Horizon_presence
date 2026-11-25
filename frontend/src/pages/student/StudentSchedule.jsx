import { student, jours, creneaux, emploiDuTemps } from '../../data/studentMock';
import './StudentSchedule.css';

const findCours = (jour, creneau) =>
  emploiDuTemps.find((c) => c.jour === jour && c.creneau === creneau);

export default function StudentSchedule() {
  return (
    <div>
      <h1>Mon emploi du temps</h1>
      <p className="schedule__subtitle">Classe {student.classe}</p>

      <div className="schedule__wrapper">
        <table className="schedule">
          <thead>
            <tr>
              <th />
              {jours.map((j) => <th key={j}>{j}</th>)}
            </tr>
          </thead>
          <tbody>
            {creneaux.map((c) => (
              <tr key={c}>
                <th scope="row">{c}</th>
                {jours.map((j) => {
                  const cours = findCours(j, c);
                  return (
                    <td key={j}>
                      {cours ? (
                        <div className={`schedule__course schedule__course--${cours.couleur}`}>
                          <strong>{cours.matiere}</strong>
                          <span>{cours.salle}</span>
                        </div>
                      ) : (
                        <span className="schedule__empty">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}