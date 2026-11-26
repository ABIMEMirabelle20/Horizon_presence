import React, { useState } from 'react';
import { initialNotifications } from '../../data/parentData';

export default function MesNotifications() {
  // On initialise l'état avec les données du fichier
  const [notifications, setNotifications] = useState(initialNotifications || []);

  // 1. Fonction "Tout marquer comme lu" corrigée de façon explicite
  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({
        ...notif,
        read: true, // Force explicitement toutes les notifications à l'état "lu"
      }))
    );
  };

  // 2. Fonction pour basculer l'état d'une seule notification (Lu <-> Non lu)
  const handleToggleRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };

  return (
    <div style={{ padding: '30px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#0f2e5b', margin: 0, fontSize: '24px' }}>Mes notifications</h1>
        
        {/* Bouton global : Tout marquer comme lu */}
        <button 
          type="button"
          onClick={handleMarkAllAsRead}
          style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
        >
          Tout marquer comme lu
        </button>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        
        {notifications.map((notif) => {
          // Si notif.read est true, le message est lu (fond transparent). S'il est false, il est non lu (fond bleuté).
          const isRead = Boolean(notif.read);

          return (
            <div 
              key={notif.id} 
              style={{ 
                display: 'flex', gap: '15px', padding: '15px', 
                borderBottom: '1px solid #edf2f7', alignItems: 'center', 
                backgroundColor: isRead ? 'transparent' : '#f0f9ff', 
                borderRadius: '8px', marginBottom: '10px' 
              }}
            >
              
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                backgroundColor: notif.type === 'absence' ? '#fee2e2' : '#dbeafe', 
                color: notif.type === 'absence' ? '#ef4444' : '#3b82f6', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' 
              }}>
                {notif.type === 'absence' ? '🔔' : '📄'}
              </div>
              
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#0f2e5b', fontSize: '15px' }}>
                  {notif.title}
                </p>
                <p style={{ margin: '0 0 5px 0', color: '#4a5568', fontSize: '13px' }}>
                  {notif.message}
                </p>
                <p style={{ margin: 0, color: '#a0aec0', fontSize: '12px' }}>
                  {notif.date}
                </p>
              </div>

              {/* Bouton individuel pour changer l'état */}
              <button
                type="button"
                onClick={() => handleToggleRead(notif.id)}
                style={{
                  backgroundColor: isRead ? '#edf2f7' : '#ebf8ff',
                  color: isRead ? '#4a5568' : '#2b6cb0',
                  border: '1px solid',
                  borderColor: isRead ? '#cbd5e0' : '#bee3f8',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginRight: '10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
              </button>

              {/* Point bleu visible uniquement si le message n'est pas lu */}
              {!isRead && (
                <div style={{ width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '50%', flexShrink: 0 }}></div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}