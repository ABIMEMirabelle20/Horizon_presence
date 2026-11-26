import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail.");
      return;
    }
    if (!password) {
      setError("Veuillez saisir votre mot de passe.");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/admin/cours');
    } catch (err) {
      setError(err.message || "Identifiants incorrects.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    loginAsDemo(role);
    if (role === 'admin') {
      navigate('/admin/cours');
    } else {
      navigate('/emploi-du-temps');
    }
  };

  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[580px]">
        
        {/* Left Side: Brand & Visual Hero (matches 01-connexion.jpeg) */}
        <div className="relative bg-gradient-to-b from-[#EBF3FC] via-[#DBEAFE]/80 to-[#BFDBFE]/60 p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Subtle curved background overlay */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none">
            <svg
              className="w-full h-44 text-[#2864DC]/10"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,100 C150,200 250,50 400,120 L400,200 L0,200 Z" />
            </svg>
            <svg
              className="w-full h-32 text-[#244568]/15 absolute bottom-0 left-0"
              viewBox="0 0 400 160"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,120 C180,40 280,180 400,100 L400,160 L0,160 Z" />
            </svg>
          </div>

          {/* Top Brand & Title */}
          <div className="text-center z-10 pt-2">
            <div className="inline-flex p-3 bg-white/90 backdrop-blur-xs rounded-2xl shadow-sm text-royal mb-4 border border-white">
              <GraduationCap className="w-9 h-9" />
            </div>
            <h1 className="text-3xl font-extrabold text-ink tracking-tight">
              Horizon <span className="text-royal">Présence</span>
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-2 max-w-xs mx-auto leading-relaxed">
              Une école connectée, une présence maîtrisée.
            </p>
          </div>

          {/* 3D-Style Books & Cap Illustration (Vectorial SVG) */}
          <div className="relative z-10 my-8 flex items-center justify-center">
            <div className="relative w-48 h-40 flex items-center justify-center">
              {/* Stack of books */}
              <div className="w-36 h-8 bg-royal/90 rounded-lg shadow-md transform -rotate-1 border-t-2 border-white/40"></div>
              <div className="absolute w-40 h-9 bg-white rounded-lg shadow-lg transform rotate-2 top-16 border border-slate-200/80 flex items-center px-3">
                <div className="w-full h-1 bg-slate-200 rounded"></div>
              </div>
              <div className="absolute w-44 h-10 bg-royal rounded-xl shadow-xl top-24 border-t-2 border-white/30 flex items-center justify-between px-3">
                <div className="w-1.5 h-6 bg-mist rounded"></div>
                <div className="text-[10px] tracking-widest text-white/80 font-mono">HORIZON</div>
              </div>

              {/* Graduation Cap on top of books */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                {/* Cap diamond */}
                <div className="w-24 h-12 bg-horizon rounded-md shadow-lg transform rotate-12 flex items-center justify-center border-t border-white/20">
                  <div className="w-3 h-3 rounded-full bg-warn/90"></div>
                </div>
                {/* Cap skull base */}
                <div className="w-12 h-6 bg-[#1b344e] rounded-b-lg -mt-3 shadow-md"></div>
                {/* Tassel cord */}
                <div className="absolute top-2 right-4 w-1 h-12 bg-warn rounded-full transform rotate-12"></div>
                <div className="absolute top-12 right-2 w-2.5 h-4 bg-warn rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-xs text-slate-500 z-10 hidden sm:block">
            Plateforme de gestion pour établissements primaires et secondaires
          </div>
        </div>

        {/* Right Side: Login Form (matches 01-connexion.jpeg) */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-ink tracking-tight">Connexion</h2>
            <p className="text-sm text-slate-500 mt-1">Accédez à votre espace</p>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-danger/10 border border-danger/20 rounded-xl flex items-center gap-2.5 text-danger text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-cloud border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-cloud border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-royal focus:ring-royal/30 border-slate-300"
                />
                <span>Se souvenir de moi</span>
              </label>

              <button
                type="button"
                className="text-royal hover:underline font-semibold"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-royal hover:bg-royal/90 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/80"></div>
            </div>
            <span className="relative px-3 bg-white text-xs text-slate-400 font-medium lowercase">
              ou
            </span>
          </div>

          {/* Google Login button */}
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-3 shadow-2xs hover:border-slate-300"
          >
            {/* Google Colorful G icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
              />
            </svg>
            <span>Se connecter avec Google</span>
          </button>

          {/* Quick Demo Access Bar (From Mirabelle's Guide) */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-2.5">
              Accès démo rapide par rôle
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-1.5 px-2 bg-mist/60 hover:bg-mist text-royal text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('teacher')}
                className="py-1.5 px-2 bg-ice hover:bg-mist text-royal text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Enseignant
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200/80 text-ink text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Élève
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('parent')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200/80 text-ink text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Parent
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
