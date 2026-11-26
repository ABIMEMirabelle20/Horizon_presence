import React from 'react';

import { initialNotifications } from '../../data/parentData';

export default function MesNotifications() {
  return (
    <div style={{ padding: '30px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#0f2e5b', margin: 0, fontSize: '24px' }}>Mes notifications</h1>
        <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
          Tout marquer comme lu
        </button>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        
        
        {initialNotifications.map((notif) => (
          <div 
            key={notif.id} 
            style={{ 
              display: 'flex', gap: '15px', padding: '15px', 
              borderBottom: '1px solid #edf2f7', alignItems: 'center', 
              backgroundColor: notif.read ? 'transparent' : '#f0f9ff', 
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

    
            {!notif.read && (
              <div style={{ width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}