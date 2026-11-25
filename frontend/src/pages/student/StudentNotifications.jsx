import { useState } from 'react';
import { UserX, Clock, FileText, CalendarDays } from 'lucide-react';
import { student, notificationsInitiales } from '../../data/studentMock';
import './StudentNotifications.css';

const ICONES = {
  absence: UserX,
  retard: Clock,
  demande: FileText,
  emploi: CalendarDays,
};

const formatDate = (iso) =>
  new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

export default function StudentNotifications() {
  const [notifs, setNotifs] = useState(notificationsInitiales);
  const [filtre, setFiltre] = useState('toutes');

  const nonLues = notifs.filter((n) => !n.lue).length;

  const liste = notifs
    .filter((n) => filtre === 'toutes' || !n.lue)
    .sort((a, b) => b.date.localeCompare(a.date));

  const marquerLue = (id) =>
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, lue: true } : n)));

  const toutMarquerLu = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, lue: true })));

  return (
    <div>
      <h1>Mes notifications</h1>
      <p className="notifs__subtitle">
        Classe {student.classe} · {nonLues} non lue{nonLues > 1 ? 's' : ''}
      </p>

      <div className="notifs__toolbar">
        <div className="notifs__filters">
          <button
            className={`notifs__filter${filtre === 'toutes' ? ' notifs__filter--active' : ''}`}
            onClick={() => setFiltre('toutes')}
          >
            Toutes
          </button>
          <button
            className={`notifs__filter${filtre === 'nonlues' ? ' notifs__filter--active' : ''}`}
            onClick={() => setFiltre('nonlues')}
          >
            Non lues
          </button>
        </div>
        <button className="notifs__readall" onClick={toutMarquerLu} disabled={nonLues === 0}>
          Tout marquer comme lu
        </button>
      </div>

      {liste.length === 0 ? (
        <p className="notifs__empty">Aucune notification.</p>
      ) : (
        <div className="notifs__list">
          {liste.map((n) => {
            const Icon = ICONES[n.type];
            return (
              <article key={n.id} className={`notif${n.lue ? '' : ' notif--unread'}`}>
                <div className={`notif__icon notif__icon--${n.type}`}>
                  <Icon size={18} />
                </div>
                <div className="notif__body">
                  <h3 className="notif__title">{n.titre}</h3>
                  <p className="notif__message">{n.message}</p>
                  <div className="notif__date">{formatDate(n.date)}</div>
                </div>
                {!n.lue && (
                  <button className="notif__action" onClick={() => marquerLue(n.id)}>
                    Marquer comme lue
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}