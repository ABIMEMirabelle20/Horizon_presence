export const student = { prenom: 'Élève', classe: 'L2-IA' };

export const stats = { presences: 42, absences: 3, retards: 2, taux: 93 };

export const prochainCours = {
  matiere: 'Probabilités',
  jour: 'Jeudi',
  horaire: '08h – 10h',
  enseignant: 'Dr. Mensah',
};

export const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

export const creneaux = ['08h – 10h', '10h – 12h', '14h – 16h', '16h – 18h'];

// couleur : 'blue' | 'teal' | 'sky'
export const emploiDuTemps = [
  { jour: 'Lundi', creneau: '08h – 10h', matiere: 'IA Avancée', salle: 'Salle 12', couleur: 'sky' },
  { jour: 'Lundi', creneau: '10h – 12h', matiere: 'Probabilités', salle: 'Salle 4', couleur: 'blue' },
  { jour: 'Mardi', creneau: '14h – 16h', matiere: 'Bases de Données', salle: 'Labo 2', couleur: 'teal' },
  { jour: 'Mercredi', creneau: '08h – 10h', matiere: 'Machine Learning', salle: 'Salle 12', couleur: 'sky' },
  { jour: 'Mercredi', creneau: '14h – 16h', matiere: 'Probabilités', salle: 'Salle 4', couleur: 'blue' },
  { jour: 'Jeudi', creneau: '08h – 10h', matiere: 'Probabilités', salle: 'Salle 4', couleur: 'blue' },
  { jour: 'Jeudi', creneau: '10h – 12h', matiere: 'Bases de Données', salle: 'Labo 2', couleur: 'teal' },
  { jour: 'Vendredi', creneau: '10h – 12h', matiere: 'Réseaux', salle: 'Salle 7', couleur: 'sky' },
  { jour: 'Vendredi', creneau: '14h – 16h', matiere: 'Projet IA', salle: 'Labo 1', couleur: 'blue' },
];

// statut : 'present' | 'absent' | 'retard'
export const historique = [
  { id: 1, date: '2026-11-24', matiere: 'IA Avancée', creneau: '08h – 10h', statut: 'present' },
  { id: 2, date: '2026-11-24', matiere: 'Probabilités', creneau: '10h – 12h', statut: 'present' },
  { id: 3, date: '2026-11-20', matiere: 'Réseaux', creneau: '10h – 12h', statut: 'retard', minutes: 15 },
  { id: 4, date: '2026-11-20', matiere: 'Projet IA', creneau: '14h – 16h', statut: 'present' },
  { id: 5, date: '2026-11-19', matiere: 'Bases de Données', creneau: '10h – 12h', statut: 'absent', justifie: false },
  { id: 6, date: '2026-11-19', matiere: 'Probabilités', creneau: '08h – 10h', statut: 'present' },
  { id: 7, date: '2026-11-18', matiere: 'Machine Learning', creneau: '08h – 10h', statut: 'present' },
  { id: 8, date: '2026-11-18', matiere: 'Probabilités', creneau: '14h – 16h', statut: 'absent', justifie: true },
  { id: 9, date: '2026-11-17', matiere: 'IA Avancée', creneau: '08h – 10h', statut: 'present' },
  { id: 10, date: '2026-11-17', matiere: 'Probabilités', creneau: '10h – 12h', statut: 'retard', minutes: 10 },
];

// type : 'justification' | 'autorisation'
// statut : 'en_attente' | 'acceptee' | 'refusee'
export const demandes = [
  { id: 1, type: 'justification', absenceId: 8, motif: 'Rendez-vous médical', statut: 'acceptee', creeLe: '2026-11-19' },
  { id: 2, type: 'autorisation', du: '2026-12-02', au: '2026-12-03', motif: 'Cérémonie familiale', statut: 'en_attente', creeLe: '2026-11-22' },
  { id: 3, type: 'autorisation', du: '2026-10-28', au: '2026-10-28', motif: 'Démarches administratives', statut: 'refusee', creeLe: '2026-10-24' },
];

// type : 'absence' | 'retard' | 'demande' | 'emploi'
export const notificationsInitiales = [
  { id: 1, type: 'demande', titre: 'Demande acceptée', message: 'Ta justification pour Probabilités du 18 nov. a été acceptée.', date: '2026-11-24T14:30:00', lue: false },
  { id: 2, type: 'absence', titre: 'Absence enregistrée', message: 'Tu as été marqué absent en Bases de Données le 19 nov. Pense à la justifier.', date: '2026-11-19T11:00:00', lue: false },
  { id: 3, type: 'emploi', titre: 'Emploi du temps modifié', message: 'Le cours de Réseaux de vendredi est déplacé en Salle 7.', date: '2026-11-18T09:15:00', lue: true },
  { id: 4, type: 'retard', titre: 'Retard enregistré', message: 'Un retard de 10 min a été noté en Probabilités le 17 nov.', date: '2026-11-17T10:20:00', lue: true },
  { id: 5, type: 'demande', titre: 'Demande refusée', message: "Ta demande d'autorisation du 28 oct. a été refusée.", date: '2026-10-26T16:45:00', lue: true },
];

export const profil = {
  matricule: 'IFRI-2025-0142',
  nom: 'Houessou',
  prenom: 'Élève',
  niveau: 'L2',
  filiere: 'Intelligence Artificielle',
  dateNaissance: '2005-03-14',
  email: 'eleve@ifri.uac.bj',
  telephone: '+229 01 97 00 00 00',
  parents: [
    { id: 1, nom: 'Mme Houessou', lien: 'Mère', telephone: '+229 01 96 00 00 01' },
    { id: 2, nom: 'M. Houessou', lien: 'Père', telephone: '+229 01 96 00 00 02' },
  ],
};