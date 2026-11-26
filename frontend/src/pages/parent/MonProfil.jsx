import React, { useState } from 'react';
import { parentUser } from '../../data/parentData';
import './MonProfil.css';

export default function MonProfil() {
  const [nom, setNom] = useState(parentUser?.nom || '');
  const [prenom, setPrenom] = useState(parentUser?.prenom || '');
  const [email, setEmail] = useState(parentUser?.email || '');
  const [phone, setPhone] = useState(parentUser?.phone || '');
  const [messageInfo, setMessageInfo] = useState('');

  const [ancienMdp, setAncienMdp] = useState('');
  const [nouveauMdp, setNouveauMdp] = useState('');
  const [confirmerMdp, setConfirmerMdp] = useState('');
  const [messageMdp, setMessageMdp] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="hp-profile-container">
      <h1 className="hp-profile-title">Mon profil</h1>

      <form onSubmit={handleSaveProfile} className="hp-profile-card">
        <h2 className="hp-profile-card-title">Informations personnelles</h2>

        <div className="hp-profile-fields">
          <div className="hp-profile-row">
            <div>
              <label className="hp-profile-label">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Votre nom"
                className="hp-profile-input"
              />
            </div>

            <div>
              <label className="hp-profile-label">Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Votre prénom"
                className="hp-profile-input"
              />
            </div>
          </div>

          <div>
            <label className="hp-profile-label">Adresse e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              className="hp-profile-input"
            />
          </div>

          <div>
            <label className="hp-profile-label">Numéro de téléphone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+229 ..."
              className="hp-profile-input"
            />
          </div>

          {messageInfo && (
            <p className="hp-profile-msg-info">{messageInfo}</p>
          )}

          <button type="submit" className="hp-profile-btn-primary">
            Enregistrer les modifications
          </button>
        </div>
      </form>

      <form onSubmit={handleChangePassword} className="hp-profile-card">
        <h2 className="hp-profile-card-title">Sécurité</h2>

        <div className="hp-profile-fields">
          <div>
            <label className="hp-profile-label">Mot de passe actuel</label>
            <input
              type="password"
              value={ancienMdp}
              onChange={(e) => setAncienMdp(e.target.value)}
              placeholder="••••••••"
              className="hp-profile-input"
            />
          </div>

          <div>
            <label className="hp-profile-label">Nouveau mot de passe</label>
            <input
              type="password"
              value={nouveauMdp}
              onChange={(e) => setNouveauMdp(e.target.value)}
              placeholder="••••••••"
              className="hp-profile-input"
            />
          </div>

          <div>
            <label className="hp-profile-label">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={confirmerMdp}
              onChange={(e) => setConfirmerMdp(e.target.value)}
              placeholder="••••••••"
              className="hp-profile-input"
            />
          </div>

          {messageMdp && (
            <p className="hp-profile-msg-pwd">{messageMdp}</p>
          )}

          <button type="submit" className="hp-profile-btn-secondary">
            Changer le mot de passe
          </button>
        </div>
      </form>

      <div className="hp-profile-logout-wrap">
        <button
          type="button"
          onClick={handleLogout}
          className="hp-profile-btn-logout"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}