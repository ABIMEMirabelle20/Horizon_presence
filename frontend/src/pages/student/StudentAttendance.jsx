import { useState } from 'react';
import { student, historique } from '../../data/studentMock';
import './StudentAttendance.css';



const formatDate = (iso) =>
	new Date(iso).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

export default function StudentAttendance() {
	const [matiere, setMatiere] = useState('');
	const presences = historique.filter((h) => h.statut === 'present');
	const matieres = [...new Set(presences.map((p) => p.matiere))];
	const liste = presences
		.filter((p) => !matiere || p.matiere === matiere)
		.sort((a, b) => b.date.localeCompare(a.date));

	return (
		<div>
			<h1>Mes présences</h1>
			<p className="attendance__subtitle">Classe {student.classe}</p>

			<div className="attendance__toolbar">
				<span className="attendance__count">
					{liste.length} présence{liste.length > 1 ? 's' : ''}
				</span>
				<select
					className="attendance__select"
					value={matiere}
					onChange={(e) => setMatiere(e.target.value)}
				>
					<option value="">Toutes les matières</option>
					{matieres.map((m) => <option key={m} value={m}>{m}</option>)}
				</select>
			</div>

			<div className="attendance__wrapper">
				{liste.length === 0 ? (
					<p className="attendance__empty">Aucune présence enregistrée.</p>
				) : (
					<table className="attendance__table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Matière</th>
								<th>Créneau</th>
								<th>Statut</th>
							</tr>
						</thead>
						<tbody>
							{liste.map((p) => (
								<tr key={p.id}>
									<td>{formatDate(p.date)}</td>
									<td>{p.matiere}</td>
									<td>{p.creneau}</td>
									<td><span className="badge badge--present">Présent</span></td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}