import React, { useState } from 'react';
import { parentUser } from '../../data/parentData';

export default function MonProfil() {
  // États initialisés dynamiquement depuis les données (ou vides par défaut)
  const [nom, setNom] = useState(parentUser?.nom || '');
  const [prenom, setPrenom] = useState(parentUser?.prenom || '');
  const [email, setEmail] = useState(parentUser?.email || '');
  const [phone, setPhone] = useState(parentUser?.phone || '');
  const [messageInfo, setMessageInfo] = useState('');

  // États pour la sécurité (Mot de passe)
  const [ancienMdp, setAncienMdp] = useState('');
  const [nouveauMdp, setNouveauMdp] = useState('');
  const [confirmerMdp, setConfirmerMdp] = useState('');
  const [messageMdp, setMessageMdp] = useState('');

  // Style commun pour les inputs de formulaire
  const inputStyle = {
    width: '100%',
    padding: '12px',
    height: '45px',
    backgroundColor: '#f4f7f6',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
  };

  // Actions des boutons
  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Ici, tu pourras ajouter la logique pour envoyer les données modifiées au backend
    setMessageInfo('✅ Modifications enregistrées avec succès !');
    setTimeout(() => setMessageInfo(''), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!ancienMdp || !nouveauMdp || !confirmerMdp) {
      setMessageMdp('⚠️ Veuillez remplir tous les champs de mot de passe.');
      return;
    }
    if (nouveauMdp !== confirmerMdp) {
      setMessageMdp('❌ Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    setMessageMdp('✅ Mot de passe modifié avec succès !');
    setAncienMdp('');
    setNouveauMdp('');
    setConfirmerMdp('');
    setTimeout(() => setMessageMdp(''), 3000);
  };

  const handleLogout = () => {
    alert('Déconnexion effectuée.');
    // Logique de déconnexion ici (ex: suppression du token, redirection)
  };

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#0f2e5b', marginBottom: '20px', fontSize: '24px' }}>
        Mon profil
      </h1>

    
      <form
        onSubmit={handleSaveProfile}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <h2 style={{ margin: '0 0 20px 0', color: '#0f2e5b', fontSize: '18px' }}>
          Informations personnelles
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>
              Nom
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Votre nom"
              style={inputStyle}
            />
          </div>


          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>
              Prénom
            </label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Votre prénom"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>
              Adresse e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>
              Numéro de téléphone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+229 ..."
              style={inputStyle}
            />
          </div>

          {messageInfo && (
            <p style={{ color: '#2f855a', fontWeight: 'bold', margin: 0 }}>{messageInfo}</p>
          )}

          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '12px 24px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: 'fit-content',
            }}
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>

      <form
        onSubmit={handleChangePassword}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <h2 style={{ margin: '0 0 20px 0', color: '#0f2e5b', fontSize: '18px' }}>
          Sécurité
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={ancienMdp}
              onChange={(e) => setAncienMdp(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={nouveauMdp}
              onChange={(e) => setNouveauMdp(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              value={confirmerMdp}
              onChange={(e) => setConfirmerMdp(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          {messageMdp && (
            <p style={{ color: '#0f2e5b', fontWeight: 'bold', margin: 0 }}>{messageMdp}</p>
          )}

          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '12px 24px',
              backgroundColor: '#0f2e5b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: 'fit-content',
            }}
          >
            Changer le mot de passe
          </button>
        </div>
      </form>

  
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: '12px 30px',
            backgroundColor: '#fee2e2',
            color: '#c53030',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}