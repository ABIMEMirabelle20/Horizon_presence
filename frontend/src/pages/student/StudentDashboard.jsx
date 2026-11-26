import { student, stats, prochainCours } from '../../data/studentMock';
import './StudentDashboard.css';

export default function StudentDashboard() {
	return (
		<div>
			<section className="student-home__welcome">
				<h1>Espace élève</h1>
				<p>Bienvenue, {student.prenom} · {student.classe}</p>
			</section>

			<section className="student-home__stats">
				<div className="student-card student-card--success">
					<div className="student-card__label">Taux de présence</div>
					<div className="student-card__value">{stats.taux}%</div>
				</div>
				<div className="student-card">
					<div className="student-card__label">Présences</div>
					<div className="student-card__value">{stats.presences}</div>
				</div>
				<div className="student-card">
					<div className="student-card__label">Absences</div>
					<div className="student-card__value">{stats.absences}</div>
				</div>
				<div className="student-card">
					<div className="student-card__label">Retards</div>
					<div className="student-card__value">{stats.retards}</div>
				</div>
			</section>

			<section className="student-card student-card--primary">
				<div className="student-card__label">Prochain cours</div>
				<div className="student-card__value">{prochainCours.matiere}</div>
				<p>{prochainCours.jour} · {prochainCours.horaire} · {prochainCours.enseignant}</p>
			</section>
		</div>
	);
}