// Données fictives du front-end : aucun appel réseau, aucun backend.
// Quand l'API PHP sera prête, ce fichier pourra être remplacé par des appels fetch/axios.

export const parentUser = {
  name: 'M. Abime',
  email: 'abime@horizon-attendance.bj',
  phone: '+229 97 12 34 56',
  address: 'Cotonou, Bénin',
  memberSince: '12/09/2026',
  lastLogin: '25/11/2026 · 08:12',
}

export const children = [
  { id: 1, name: 'Aminata Abime', className: 'L2-A', level: 'Licence 2', rate: 92, tone: 'royal' },
  { id: 2, name: 'Koffi Abime', className: 'L1-B', level: 'Licence 1', rate: 78, tone: 'steel' },
  { id: 3, name: 'Sarah Abime', className: 'L3-A', level: 'Licence 3', rate: 96, tone: 'fresh' },
]

// Une entrée par jour du mois de novembre 2026 (18 jours renseignés).
const statusesByChild = {
  1: ['present', 'present', 'absent', 'present', 'excused', 'present', 'present',
      'absent', 'present', 'present', 'present', 'absent', 'present', 'present',
      'present', 'present', 'present', 'present'],
  2: ['absent', 'present', 'absent', 'present', 'present', 'absent', 'present',
      'excused', 'present', 'absent', 'present', 'present', 'present', 'present',
      'absent', 'present', 'present', 'present'],
  3: ['present', 'present', 'present', 'present', 'excused', 'present', 'present',
      'present', 'present', 'present', 'present', 'present', 'present', 'present',
      'present', 'present', 'present', 'present'],
}

const courses = [
  'Mathématiques', 'Français', 'Anglais', 'Histoire', 'Mathématiques', 'Français',
  'Anglais', 'Histoire', 'Mathématiques', 'Français', 'Anglais', 'Histoire',
  'Mathématiques', 'Français', 'Anglais', 'Histoire', 'Mathématiques', 'Français',
]

const times = [
  '08:00', '10:00', '08:00', '14:00', '08:00', '10:00', '08:00', '14:00',
  '08:00', '10:00', '08:00', '14:00', '08:00', '10:00', '08:00', '14:00',
  '08:00', '10:00',
]

const reasons = {
  '1-4': 'Motif non renseigné', '1-6': 'Maladie',
  '1-8': 'Rendez-vous médical', '1-12': 'Motif non renseigné',
  '2-1': 'Motif non renseigné', '2-3': 'Maladie', '2-6': 'Motif non renseigné',
  '2-8': 'Cérémonie familiale', '2-10': 'Motif non renseigné', '2-15': 'Demande en cours',
  '3-5': 'Compétition sportive',
}

// On transforme les tableaux ci-dessus en une liste d'objets utilisable par les pages.
export const attendanceRecords = Object.entries(statusesByChild).flatMap(([childId, statuses]) =>
  statuses.map((status, index) => ({
    id: `${childId}-${index + 1}`,
    childId: Number(childId),
    date: `2026-11-${String(index + 1).padStart(2, '0')}`,
    course: courses[index],
    time: times[index],
    status,
    reason: reasons[`${childId}-${index + 1}`] || 'Motif non renseigné',
  })),
)

export const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export const scheduleSlots = {
  1: [
    { day: 1, time: '08:00–10:00', course: 'Mathématiques', room: 'A-101', tone: 'royal' },
    { day: 1, time: '14:00–16:00', course: 'Histoire', room: 'B-204', tone: 'steel' },
    { day: 2, time: '10:00–12:00', course: 'Français', room: 'A-102', tone: 'royal' },
    { day: 3, time: '08:00–10:00', course: 'Anglais', room: 'C-301', tone: 'fresh' },
    { day: 4, time: '14:00–16:00', course: 'Histoire', room: 'B-204', tone: 'steel' },
    { day: 5, time: '10:00–12:00', course: 'Mathématiques', room: 'A-101', tone: 'royal' },
    { day: 6, time: '09:00–11:00', course: 'Français', room: 'A-102', tone: 'fresh' },
  ],
  2: [
    { day: 1, time: '10:00–12:00', course: 'Français', room: 'A-102', tone: 'royal' },
    { day: 2, time: '08:00–10:00', course: 'Mathématiques', room: 'A-101', tone: 'steel' },
    { day: 3, time: '14:00–16:00', course: 'Histoire', room: 'B-204', tone: 'royal' },
    { day: 4, time: '08:00–10:00', course: 'Anglais', room: 'C-301', tone: 'fresh' },
    { day: 5, time: '14:00–16:00', course: 'Mathématiques', room: 'A-101', tone: 'steel' },
    { day: 6, time: '10:00–12:00', course: 'Français', room: 'A-102', tone: 'fresh' },
  ],
  3: [
    { day: 1, time: '08:00–10:00', course: 'Anglais', room: 'C-301', tone: 'fresh' },
    { day: 2, time: '14:00–16:00', course: 'Mathématiques', room: 'A-101', tone: 'royal' },
    { day: 3, time: '10:00–12:00', course: 'Français', room: 'A-102', tone: 'steel' },
    { day: 4, time: '08:00–10:00', course: 'Histoire', room: 'B-204', tone: 'royal' },
    { day: 5, time: '10:00–12:00', course: 'Anglais', room: 'C-301', tone: 'fresh' },
  ],
}

export const initialNotifications = [
  { id: 1, type: 'absence', title: 'Absence détectée', message: 'Aminata était absente au cours d’Anglais du 04/11/2026.', date: '25/11/2026 · 08:12', iso: '2026-11-25T08:12:00', read: false, icon: 'i-x' },
  { id: 2, type: 'alert', title: 'Alerte d’absences répétées', message: 'Koffi a atteint 3 absences non justifiées sur les 30 derniers jours.', date: '24/11/2026 · 16:40', iso: '2026-11-24T16:40:00', read: false, icon: 'i-alert' },
  { id: 3, type: 'info', title: 'Feuille validée', message: 'La feuille de présence du cours de Français du 23/11/2026 a été validée.', date: '23/11/2026 · 11:05', iso: '2026-11-23T11:05:00', read: true, icon: 'i-clipboard' },
  { id: 4, type: 'success', title: 'Permission acceptée', message: 'La justification du 04/11/2026 de Koffi a été acceptée.', date: '22/11/2026 · 09:30', iso: '2026-11-22T09:30:00', read: true, icon: 'i-check' },
  { id: 5, type: 'info', title: 'Emploi du temps publié', message: 'Le nouvel emploi du temps de la classe L3-A est disponible.', date: '20/11/2026 · 14:15', iso: '2026-11-20T14:15:00', read: true, icon: 'i-calendar' },
]

export const initialJustifications = [
  { id: 1, childId: 2, date: '2026-11-20', course: 'Anglais', reason: 'Rendez-vous médical imprévu', status: 'pending' },
]

// Petites fonctions utilitaires partagées par les pages.
export const recordsForChild = (childId) =>
  attendanceRecords.filter((record) => record.childId === Number(childId))

export const absencesForChild = (childId) =>
  recordsForChild(childId).filter((record) => record.status !== 'present').reverse()

export const statusesForChild = (childId) =>
  Object.fromEntries(recordsForChild(childId).map((record) => [record.date, record.status]))

// Formate une date AAAA-MM-JJ en français, sans dépendre du fuseau horaire.
export const formatFrenchDate = (isoDate) =>
  new Date(`${isoDate}T12:00:00`).toLocaleDateString('fr-FR')

export const formatLongDate = (isoDate) =>
  new Date(`${isoDate}T12:00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
