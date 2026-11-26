import React from 'react';
import { useNavigate } from 'react-router-dom';
import { children } from '../../data/parentData';

export default function MesEnfants() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ color: '#0f2e5b', marginBottom: '20px', fontSize: '24px' }}>Mes enfants</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {children.map((enfant) => (
          <div 
            key={enfant.id}
            onClick={() => navigate(`/parent/assiduite`)}
            style={{ 
              backgroundColor: 'white', borderRadius: '12px', padding: '20px', width: '240px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)', cursor: 'pointer', textAlign: 'center', border: '1px solid #e2e8f0'
            }}
          >
            
            <img 
              src={enfant.avatar} 
              alt={enfant.name}
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                margin: '0 auto 15px auto', 
                display: 'block',
                objectFit: 'cover'
              }}
            />
            
            <h3 style={{ margin: '0 0 5px 0', color: '#0f2e5b', fontSize: '16px' }}>{enfant.name}</h3>
            <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>{enfant.className}</p>
            
            <p style={{ marginTop: '15px', color: '#3b82f6', fontSize: '13px', fontWeight: 'bold' }}>Voir assiduité →</p>
          </div>
        ))}

      </div>
    </div>
  );
}