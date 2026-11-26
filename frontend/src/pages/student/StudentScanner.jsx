import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { QRCodeSVG } from 'qrcode.react';
import { Camera, CameraOff, CheckCircle2, XCircle } from 'lucide-react';
import {
    getSeance,
    relancerSeanceMock,
    getCodeManuelCourant,
    verifierPresenceMock,
    isPresenceEnregistree,
} from '../../data/scanMock';
import './StudentScanner.css';

const MODE_DEMO = true; // passer à false pour masquer le panneau de démonstration
const READER_ID = 'qr-reader';

const formatTemps = (ms) => {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${m}:${s}`;
};

export default function StudentScanner() {
    const [seance, setSeance] = useState(getSeance());
    const [now, setNow] = useState(Date.now());
    const [mode, setMode] = useState('qr');
    const [cameraActive, setCameraActive] = useState(false);
    const [erreurCamera, setErreurCamera] = useState('');
    const [codeSaisi, setCodeSaisi] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultat, setResultat] = useState(
        isPresenceEnregistree() ? { ok: true, message: 'Ta présence a bien été enregistrée.' } : null
    );

    const occupeRef = useRef(false);
    const traiterRef = useRef(null);

    const restant = seance.finValidite - now;
    const expiree = restant <= 0;
    const valide = resultat?.ok === true;

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const traiter = async (type, valeur) => {
        if (occupeRef.current) return;
        occupeRef.current = true;
        setLoading(true);
        const res = await verifierPresenceMock({ type, valeur });
        setResultat((prev) => (prev?.ok ? prev : res)); // un succès n'est jamais écrasé par un refus
        setLoading(false);
        occupeRef.current = false;
    };
    traiterRef.current = traiter;

    // Démarrage / arrêt de la caméra
    useEffect(() => {
        if (!cameraActive) return;
        const scanner = new Html5Qrcode(READER_ID);
        let demarre = false;

        const demarrage = scanner
            .start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 220, height: 220 } },
                (texte) => {
                    if (occupeRef.current) return;
                    setCameraActive(false);
                    traiterRef.current('qr', texte);
                },
                () => { }
            )
            .then(() => { demarre = true; })
            .catch(() => {
                setErreurCamera(
                    "Impossible d'accéder à la caméra. Vérifie l'autorisation du navigateur ou utilise le code."
                );
                setCameraActive(false);
            });

        return () => {
            demarrage.then(() => {
                if (demarre) scanner.stop().then(() => scanner.clear()).catch(() => { });
            });
        };
    }, [cameraActive]);

    const changerMode = (m) => {
        setMode(m);
        setCameraActive(false);
        setResultat(null);
        setErreurCamera('');
    };

    const activerCamera = () => {
        setResultat(null);
        setErreurCamera('');
        setCameraActive(true);
    };

    const validerCode = (e) => {
        e.preventDefault();
        if (codeSaisi.length !== 6) {
            return setResultat({ ok: false, message: 'Le code contient 6 chiffres.' });
        }
        traiter('code', codeSaisi);
    };

    const relancerDemo = () => {
        setSeance(relancerSeanceMock());
        setResultat(null);
        setCodeSaisi('');
        setCameraActive(false);
    };

    const codeCourant = getCodeManuelCourant(now);

    return (
        <div>
            <h1>Scanner</h1>
            <p className="scanner__subtitle">Atteste ta présence au cours en cours.</p>

            <section className="scanner__card">
                <div className="scanner__course">
                    <div>
                        <div className="scanner__course-name">{seance.matiere}</div>
                        <p className="scanner__course-meta">
                            {seance.creneau} · {seance.salle} · {seance.enseignant}
                        </p>
                    </div>
                    <span className={`scanner__timer${expiree ? ' scanner__timer--expired' : ''}`}>
                        {expiree ? 'Session expirée' : `Valide encore ${formatTemps(restant)}`}
                    </span>
                </div>
            </section>

            {valide ? (
                <section className="scanner__card scanner__done">
                    <CheckCircle2 size={56} />
                    <h2>Présence enregistrée</h2>
                    <p>{seance.matiere} · {seance.creneau}</p>
                </section>
            ) : (
                <section className="scanner__card">
                    <div className="scanner__tabs">
                        <button
                            className={`scanner__tab${mode === 'qr' ? ' scanner__tab--active' : ''}`}
                            onClick={() => changerMode('qr')}
                        >
                            Scanner un QR code
                        </button>
                        <button
                            className={`scanner__tab${mode === 'code' ? ' scanner__tab--active' : ''}`}
                            onClick={() => changerMode('code')}
                        >
                            Saisir un code
                        </button>
                    </div>

                    {mode === 'qr' ? (
                        <div>
                            {cameraActive ? (
                                <div id={READER_ID} className="scanner__reader" />
                            ) : (
                                <div className="scanner__placeholder">
                                    <CameraOff size={32} />
                                    <p>La caméra est désactivée.</p>
                                </div>
                            )}
                            {erreurCamera && <p className="scanner__error">{erreurCamera}</p>}
                            <div className="scanner__center">
                                {cameraActive ? (
                                    <button className="scanner__btn scanner__btn--ghost" onClick={() => setCameraActive(false)}>
                                        <CameraOff size={18} /> Arrêter la caméra
                                    </button>
                                ) : (
                                    <button className="scanner__btn" onClick={activerCamera} disabled={expiree || loading}>
                                        <Camera size={18} /> Activer la caméra
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <form className="scanner__form" onSubmit={validerCode}>
                            <p>Saisis le code à 6 chiffres affiché par ton enseignant.</p>
                            <input
                                className="scanner__code-input"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="000000"
                                value={codeSaisi}
                                onChange={(e) => setCodeSaisi(e.target.value.replace(/\D/g, ''))}
                            />
                            <button className="scanner__btn" type="submit" disabled={expiree || loading}>
                                {loading ? 'Vérification...' : 'Valider ma présence'}
                            </button>
                        </form>
                    )}

                    {loading && mode === 'qr' && <p className="scanner__center">Vérification...</p>}

                    {resultat && !resultat.ok && (
                        <div className="scanner__result scanner__result--error">
                            <XCircle size={20} /> {resultat.message}
                        </div>
                    )}
                </section>
            )}

            {MODE_DEMO && (
                <section className="scanner__card scanner__demo">
                    <h2>Mode démo (à supprimer plus tard)</h2>
                    <div className="scanner__demo-body">
                        <QRCodeSVG value={seance.token} size={140} />
                        <div>
                            <div>Code actuel (change toutes les 40 s) :</div>
                            <div className="scanner__demo-code">{codeCourant.code}</div>
                            <div>Prochain changement dans {formatTemps(codeCourant.expireDans)}</div>
                        </div>
                    </div>
                    <div className="scanner__demo-actions">
                        <button
                            className="scanner__btn scanner__btn--ghost"
                            onClick={() => traiter('qr', seance.token)}
                            disabled={valide || loading}
                        >
                            Simuler le scan du QR
                        </button>
                        <button className="scanner__btn scanner__btn--ghost" onClick={relancerDemo}>
                            Relancer une session
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}