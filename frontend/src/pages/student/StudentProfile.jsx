import { useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';
import { profil as profilInitial } from '../../data/studentMock';
import './StudentProfile.css';

const calculerAge = (iso) => {
	const naissance = new Date(iso);
	const auj = new Date();
	let age = auj.getFullYear() - naissance.getFullYear();
	const m = auj.getMonth() - naissance.getMonth();
	if (m < 0 || (m === 0 && auj.getDate() < naissance.getDate())) age--;
	return age;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formDepuis = (p) => ({
	nom: p.nom,
	prenom: p.prenom,
	email: p.email,
	telephone: p.telephone,
});


function ReadOnlyField({ label, value, hint }) {
	return (
		<label className="profile__field">
			{label}
			<input value={value} readOnly />
			{hint && <span className="profile__hint">{hint}</span>}
		</label>
	);
}

function EditableField({ label, type = 'text', value, edition, onChange }) {
	return (
		<label className="profile__field">
			{label}
			<input type={type} value={value} readOnly={!edition} onChange={onChange} />
		</label>
	);
}

export default function StudentProfile() {
	const [profil, setProfil] = useState(profilInitial);
	const [edition, setEdition] = useState(false);
	const [form, setForm] = useState(formDepuis(profil));
	const [photo, setPhoto] = useState(null);
	const [erreur, setErreur] = useState('');
	const [succes, setSucces] = useState('');

	const initiales = `${profil.prenom[0]}${profil.nom[0]}`.toUpperCase();

	const handlePhoto = (e) => {
		const fichier = e.target.files[0];
		if (!fichier) return;
		setSucces('');
		if (!fichier.type.startsWith('image/')) return setErreur('Le fichier doit être une image.');
		if (fichier.size > 2 * 1024 * 1024) return setErreur('La photo ne doit pas dépasser 2 Mo.');
		setErreur('');
		setPhoto(URL.createObjectURL(fichier));
	};

	const commencerEdition = () => {
		setForm(formDepuis(profil));
		setErreur('');
		setSucces('');
		setEdition(true);
	};

	const annuler = () => {
		setEdition(false);
		setErreur('');
	};

	const enregistrer = (e) => {
		e.preventDefault();
		if (!form.nom.trim() || !form.prenom.trim()) return setErreur('Le nom et le prénom sont obligatoires.');
		if (!EMAIL_REGEX.test(form.email.trim())) return setErreur('Adresse email invalide.');
		if (form.telephone.replace(/\D/g, '').length < 8) return setErreur('Numéro de téléphone invalide.');
		setProfil({
			...profil,
			nom: form.nom.trim(),
			prenom: form.prenom.trim(),
			email: form.email.trim(),
			telephone: form.telephone.trim(),
		});
		setEdition(false);
		setErreur('');
		setSucces('Profil mis à jour.');
	};

	return (
		<div>
			<section className="profile__card">
				<div className="profile__header">
					{photo ? (
						<img className="profile__avatar" src={photo} alt="Photo de profil" />
					) : (
						<div className="profile__avatar">{initiales}</div>
					)}
					<div className="profile__identity">
						<h1>{profil.prenom} {profil.nom}</h1>
						<p>{profil.niveau} · {profil.filiere} · {profil.matricule}</p>
						<div className="profile__photo-actions">
							<label className="profile__photo-btn">
								<Camera size={16} />
								{photo ? 'Changer la photo' : 'Ajouter une photo'}
								<input type="file" accept="image/*" onChange={handlePhoto} />
							</label>
							{photo && (
								<button className="profile__photo-btn" onClick={() => setPhoto(null)}>
									<Trash2 size={16} /> Retirer
								</button>
							)}
						</div>
					</div>
				</div>
			</section>

			<form className="profile__card" onSubmit={enregistrer}>
				<h2>Informations personnelles</h2>
				<div className="profile__grid">
					<ReadOnlyField label="Matricule" value={profil.matricule} />
					<ReadOnlyField label="Niveau d'études" value={profil.niveau} hint="Non modifiable" />
					<ReadOnlyField label="Filière" value={profil.filiere} hint="Non modifiable" />
					<ReadOnlyField label="Âge" value={`${calculerAge(profil.dateNaissance)} ans`} />

					<EditableField
						label="Nom"
						value={edition ? form.nom : profil.nom}
						edition={edition}
						onChange={(e) => setForm({ ...form, nom: e.target.value })}
					/>
					<EditableField
						label="Prénom"
						value={edition ? form.prenom : profil.prenom}
						edition={edition}
						onChange={(e) => setForm({ ...form, prenom: e.target.value })}
					/>
					<EditableField
						label="Email"
						type="email"
						value={edition ? form.email : profil.email}
						edition={edition}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
					/>
					<EditableField
						label="Téléphone"
						type="tel"
						value={edition ? form.telephone : profil.telephone}
						edition={edition}
						onChange={(e) => setForm({ ...form, telephone: e.target.value })}
					/>
				</div>

				{erreur && <p className="profile__error">{erreur}</p>}
				{succes && <p className="profile__success">{succes}</p>}

				<div className="profile__actions">
					{edition ? (
						<>
							<button key="save" type="submit" className="profile__btn profile__btn--primary">
								Enregistrer
							</button>
							<button key="cancel" type="button" className="profile__btn profile__btn--ghost" onClick={annuler}>
								Annuler
							</button>
						</>
					) : (
						<button key="edit" type="button" className="profile__btn profile__btn--primary" onClick={commencerEdition}>
							Modifier mes informations
						</button>
					)}
				</div>
			</form>

			<section className="profile__card">
				<h2>Parents / tuteurs</h2>
				<div className="profile__parents">
					{profil.parents.map((p) => (
						<div key={p.id} className="profile__parent">
							<div>
								<strong>{p.nom}</strong>
								<span> · {p.lien}</span>
							</div>
							<span>{p.telephone}</span>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}