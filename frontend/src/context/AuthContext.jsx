import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: 1,
  name: 'Administration',
  email: 'admin@horizon.edu',
  role: 'admin',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('horizon_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('horizon_user', JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
  }, [user]);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Veuillez renseigner votre e-mail et votre mot de passe.');
    }

    let role = 'admin';
    let name = 'Administration';

    if (email.includes('prof') || email.includes('enseignant')) {
      role = 'teacher';
      name = 'M. Dossou';
    } else if (email.includes('parent')) {
      role = 'parent';
      name = 'Parent d\'élève';
    } else if (email.includes('eleve') || email.includes('etudiant')) {
      role = 'student';
      name = 'Élève';
    }

    const loggedUser = {
      id: Date.now(),
      name,
      email,
      role,
    };

    setUser(loggedUser);
    return loggedUser;
  };

  const loginAsDemo = (role) => {
    const demoProfiles = {
      admin: { id: 1, name: 'Direction Pédagogique', email: 'direction@horizon.edu', role: 'admin' },
      teacher: { id: 2, name: 'M. Dossou (Enseignant)', email: 'dossou@horizon.edu', role: 'teacher' },
      student: { id: 3, name: 'Koffi Mensah (Élève 3ème)', email: 'koffi.mensah@eleve.horizon.edu', role: 'student' },
      parent: { id: 4, name: 'Mme Mensah (Parent)', email: 'parent.mensah@gmail.com', role: 'parent' },
    };

    const selected = demoProfiles[role] || demoProfiles.admin;
    setUser(selected);
    return selected;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('horizon_user');
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
