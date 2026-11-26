import React from 'react';
import { parentUser } from '../../data/parentData';

export default function MonProfil() {
  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ color: '#0f2e5b', marginBottom: '20px', fontSize: '24px' }}>Mon profil</h1>
      

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', maxWidth: '700px', marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#0f2e5b', fontSize: '18px' }}>Informations personnelles</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096', fontSize: '14px', fontWeight: 'bold' }}>Nom complet</label>
            <div style={{ width: '100%', padding: '12px', backgroundColor: '#f4f7f6', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#0f2e5b', fontWeight: 'bold' }}>
              {parentUser.name}
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096', fontSize: '14px', fontWeight: 'bold' }}>Adresse e-mail</label>
            <div style={{ width: '100%', padding: '12px', backgroundColor: '#f4f7f6', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#0f2e5b' }}>
              {parentUser.email}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096', fontSize: '14px', fontWeight: 'bold' }}>Numéro de téléphone</label>
            <div style={{ width: '100%', padding: '12px', backgroundColor: '#f4f7f6', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#0f2e5b' }}>
              {parentUser.phone}
            </div>
          </div>

          <button style={{ marginTop: '10px', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', width: '220px' }}>
            Enregistrer les modifications
          </button>
        </div>
      </div>

    
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', maxWidth: '700px', marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#0f2e5b', fontSize: '18px' }}>Sécurité</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096', fontSize: '14px', fontWeight: 'bold' }}>Mot de passe actuel</label>
            <div style={{ width: '100%', height: '45px', backgroundColor: '#f4f7f6', borderRadius: '8px', border: '1px solid #e2e8f0' }}></div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096', fontSize: '14px', fontWeight: 'bold' }}>Nouveau mot de passe</label>
            <div style={{ width: '100%', height: '45px', backgroundColor: '#f4f7f6', borderRadius: '8px', border: '1px solid #e2e8f0' }}></div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096', fontSize: '14px', fontWeight: 'bold' }}>Confirmer le nouveau mot de passe</label>
            <div style={{ width: '100%', height: '45px', backgroundColor: '#f4f7f6', borderRadius: '8px', border: '1px solid #e2e8f0' }}></div>
          </div>

          <button style={{ marginTop: '10px', padding: '12px', backgroundColor: '#0f2e5b', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', width: '220px' }}>
            Changer le mot de passe
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '700px', display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ padding: '12px 30px', backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Se déconnecter
        </button>
      </div>

    </div>
  );
}