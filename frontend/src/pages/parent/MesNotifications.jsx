import React, { useState } from 'react';
import { initialNotifications } from '../../data/parentData';
import './MesNotifications.css';

export default function MesNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications || []);

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({
        ...notif,
        read: true,
      }))
    );
  };

  const handleToggleRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };

  return (
    <div className="hp-notif-container">
      
      <div className="hp-notif-header">
        <h1 className="hp-notif-title">Mes notifications</h1>
        
        <button 
          type="button"
          onClick={handleMarkAllAsRead}
          className="hp-notif-btn-all"
        >
          Tout marquer comme lu
        </button>
      </div>
      
      <div className="hp-notif-card-box">
        {notifications.map((notif) => {
          const isRead = Boolean(notif.read);
          const isAbsence = notif.type === 'absence';

          return (
            <div 
              key={notif.id} 
              className={`hp-notif-item ${isRead ? 'read' : 'unread'}`}
            >
              
              <div className={`hp-notif-icon ${isAbsence ? 'absence' : 'default'}`}>
                {isAbsence ? '🔔' : '📄'}
              </div>
              
              <div className="hp-notif-content">
                <p className="hp-notif-item-title">
                  {notif.title}
                </p>
                <p className="hp-notif-item-msg">
                  {notif.message}
                </p>
                <p className="hp-notif-item-date">
                  {notif.date}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleRead(notif.id)}
                className={`hp-notif-action-btn ${isRead ? 'read' : 'unread'}`}
              >
                {isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
              </button>

              {!isRead && (
                <div className="hp-notif-dot"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}