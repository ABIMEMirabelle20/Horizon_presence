import { historique } from './studentMock';

const VALIDITE_MS = 120 * 1000;            // durée de validité du QR (sera définie par l'admin)
const NB_CODES = 3;                         // le code manuel change 3 fois pendant la validité
const INTERVALLE_MS = VALIDITE_MS / NB_CODES;

let presenceEnregistree = false;

const hash = (str) => {
    let h = 0;
    for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return h;
};

const creerSeance = () => {
    const debut = Date.now();
    const id = 101;
    return {
        id,
        matiere: 'Probabilités',
        salle: 'Salle 4',
        enseignant: 'Dr. Mensah',
        creneau: '08h – 10h',
        debut,
        finValidite: debut + VALIDITE_MS,
        token: `horizon-presence:${id}:${debut}`, // contenu du QR code
    };
};

let seance = creerSeance();

export const getSeance = () => seance;
export const isPresenceEnregistree = () => presenceEnregistree;

export const relancerSeanceMock = () => {
    presenceEnregistree = false;
    seance = creerSeance();
    return seance;
};

const slotDe = (t) =>
    Math.min(NB_CODES - 1, Math.max(0, Math.floor((t - seance.debut) / INTERVALLE_MS)));

const codeDuSlot = (slot) =>
    String(hash(`${seance.id}-${seance.debut}-${slot}`) % 1000000).padStart(6, '0');

export function getCodeManuelCourant(t = Date.now()) {
    const slot = slotDe(t);
    const finSlot = seance.debut + (slot + 1) * INTERVALLE_MS;
    return { code: codeDuSlot(slot), expireDans: Math.max(0, finSlot - t) };
}

// Tolérance : le code précédent reste accepté (temps de saisie)
const codesAcceptes = (t) => {
    const s = slotDe(t);
    return s > 0 ? [codeDuSlot(s), codeDuSlot(s - 1)] : [codeDuSlot(s)];
};

// Simule l'appel au serveur : { type: 'qr' | 'code', valeur }
export function verifierPresenceMock({ type, valeur }) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const t = Date.now();
            if (presenceEnregistree)
                return resolve({ ok: false, message: 'Ta présence est déjà enregistrée pour ce cours.' });
            if (t > seance.finValidite)
                return resolve({ ok: false, message: 'Cette session de présence est expirée.' });

            const valeurOk = type === 'qr' ? valeur === seance.token : codesAcceptes(t).includes(valeur);
            if (!valeurOk)
                return resolve({
                    ok: false,
                    message: type === 'qr' ? 'QR code invalide pour ce cours.' : 'Code incorrect ou expiré.',
                });

            historique.push({
                id: Date.now(),
                date: new Date().toLocaleDateString('fr-CA'), // format AAAA-MM-JJ
                matiere: seance.matiere,
                creneau: seance.creneau,
                statut: 'present',
            });
            presenceEnregistree = true;
            resolve({ ok: true, message: 'Ta présence a bien été enregistrée.' });
        }, 600);
    });
}