import React from 'react';
import { useNavigate } from 'react-router-dom';
import { children } from '../../data/parentData';
import './MesEnfants.css'; 

export default function MesEnfants() {
  const navigate = useNavigate();

  return (
    <div className="hp-children-container">
      <h1 style={{ color: '#0f2e5b', marginBottom: '20px', fontSize: '24px' }}>Mes enfants</h1>
      
      <div className="hp-children-grid"> 
        {children.map((enfant) => (
          <div 
            key={enfant.id}
            onClick={() => navigate(`/parent/assiduite`)}
            className="hp-child-card" 
          >
            <img 
              src={enfant.avatar} 
              alt={enfant.name}
              className="hp-child-avatar" 
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