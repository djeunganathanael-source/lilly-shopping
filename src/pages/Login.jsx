import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ArrowRight, User, Mail, Lock, Heart } from 'lucide-react';

const Login = ({ setPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdminWelcome, setShowAdminWelcome] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      if (err.message && err.message.includes('not enabled')) {
        setError(`Attention Boss : La connexion ${provider} n'est pas encore activée sur votre serveur Supabase. (Allez dans Authentication -> Providers).`);
      } else {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isAdmin = email.toLowerCase() === 'djeunganathanael@gmail.com';

    try {
      if (isLogin) {
        // LOGIN
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) throw signInError;

        if (isAdmin) {
          setShowAdminWelcome(true);
          setTimeout(() => {}, 4000);
        }
      } else {
        // SIGNUP
        const { data: { user, session }, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        
        if (signUpError) throw signUpError;
        
        if (user) {
          const { error: profileError } = await supabase.from('profiles').upsert({ 
            id: user.id, 
            full_name: name, 
            email: email, 
            status: 'Client Privilège' 
          });
          
          if (profileError) {
             console.error("Erreur de création du profil public:", profileError);
             // We don't throw because the user auth account IS technically created.
          }
        }

        // Check if session exists (Auto-login occurred). If not, email confirmation is required by Supabase settings.
        if (!session) {
           setError("Compte créé ! Cependant, Supabase demande une confirmation par email. Veuillez vérifier votre boîte mail. (Pour désactiver ça, allez dans Supabase -> Authentication -> Providers -> Email -> Désactiver 'Confirm email').");
        } else {
           alert("Compte créé et connecté avec succès !");
        }
      }
    } catch (err) {
      if (err.message.includes('User already registered')) {
         setError("Cet email possède déjà un compte. Veuillez vous connecter.");
      } else if (err.message.includes('Invalid login credentials')) {
         setError("Email ou mot de passe incorrect.");
      } else {
         setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-tertiary-fixed/30 selection:text-on-surface">
      
      {/* Admin Welcome Screen Overlay */}
      {showAdminWelcome && (
        <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000 p-8 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(204,255,0,0.08)_0%,_transparent_100%)] animate-pulse"></div>
          <Heart size={80} className="text-tertiary-fixed mb-12 animate-bounce fill-tertiary-fixed/10" strokeWidth={0.5} />
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tighter leading-tight scale-105 transition-transform duration-1000">
            Salutations, <span className="text-tertiary-fixed italic font-light">Boss</span>
          </h2>
          <div className="w-24 h-px bg-tertiary-fixed/50 mb-10"></div>
          <p className="font-sans text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed tracking-wide animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            Votre empire vous attend. Prenez les rênes de Maison Lilly et forgez la destinée de votre succès. <br/>
            <span className="text-tertiary-fixed font-black uppercase tracking-[0.3em] block mt-8 text-sm drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">Accès Prioritaire</span>
          </p>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-tertiary-fixed/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-xl z-10 animate-in fade-in zoom-in duration-1000 relative">
        
        {/* Brand Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary border border-tertiary-fixed/20 mb-8 shadow-[0_15px_40px_rgba(11,36,71,0.15)] relative">
            <div className="absolute inset-0 rounded-full border border-tertiary-fixed/30 scale-110"></div>
            <Heart size={32} className="text-tertiary-fixed fill-tertiary-fixed/10" strokeWidth={1} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-primary mb-4 tracking-tighter">
            Lilly <span className="italic font-light text-primary-container">Dubois</span>
          </h1>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-primary/40 font-black">
            The Curated Atelier
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white border border-outline-variant/30 p-10 md:p-14 rounded-sm shadow-[0_30px_60px_rgba(11,36,71,0.06)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"></div>

          <div className="flex gap-10 mb-12 border-b border-outline-variant/30 pb-6 justify-center">
            <button 
              onClick={() => setIsLogin(true)}
              className={`text-xs tracking-[0.3em] uppercase font-black transition-all duration-500 ${isLogin ? 'text-primary border-b-2 border-primary pb-6' : 'text-primary/30 hover:text-primary/60 pb-6'}`}
            >
              Connexion
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`text-xs tracking-[0.3em] uppercase font-black transition-all duration-500 ${!isLogin ? 'text-primary border-b-2 border-primary pb-6' : 'text-primary/30 hover:text-primary/60 pb-6'}`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-8 relative z-10">
            
            {error && (
              <div className="bg-error/10 border border-error/20 text-error p-4 text-[10px] uppercase tracking-widest font-black rounded-sm text-center animate-shake">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-[0.25em] text-primary/60 font-black ml-1">Nom du Résident</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Votre nom complet"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-sm py-5 pl-14 pr-6 text-on-surface text-sm focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-on-surface/20 shadow-inner"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.25em] text-primary/60 font-black ml-1">VOTRE EMAIL</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre@email.com"
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-sm py-5 pl-14 pr-6 text-on-surface text-sm focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-on-surface/20 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.25em] text-primary/60 font-black ml-1">MOT DE PASSE</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-sm py-5 pl-14 pr-6 text-on-surface text-sm focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-on-surface/20 shadow-inner"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-6 w-full bg-tertiary-fixed text-on-tertiary-fixed py-6 rounded-sm font-sans font-black uppercase tracking-[0.25em] text-[11px] flex items-center justify-center gap-4 transition-all duration-300 shadow-[0_10px_30px_rgba(204,255,0,0.3)] hover:shadow-[0_15px_40px_rgba(204,255,0,0.4)] hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-on-tertiary-fixed rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-on-tertiary-fixed rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-on-tertiary-fixed rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              ) : (
                <>
                  {isLogin ? "S'authentifier" : "Rejoindre l'Atelier"}
                  <ArrowRight size={18} strokeWidth={3} />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="relative mt-10 mb-8 z-10 hidden sm:block">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[9px] uppercase tracking-[0.3em] font-black text-primary/30">
                Ou continuer avec
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-8 sm:mt-0 relative z-10 w-full">
            <button 
              type="button"
              onClick={() => handleOAuthLogin('google')}
              disabled={loading}
              className="flex-1 bg-surface-container-low border border-outline-variant/20 hover:border-primary/20 text-primary py-4 rounded-sm flex items-center justify-center gap-3 transition-colors duration-300 disabled:opacity-50 group hover:bg-white inset-shadow"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              <span className="font-sans font-black uppercase text-[10px] tracking-widest text-primary/70 group-hover:text-primary transition-colors">Google</span>
            </button>
          </div>

          {isLogin && (
            <div className="text-center mt-12 relative z-10">
              <button className="text-[9px] text-primary/30 hover:text-primary uppercase tracking-[0.2em] font-black transition-colors">
                Mot de passe égaré ?
              </button>
            </div>
          )}
        </div>

        {/* Policy Footer */}
        <div className="text-center mt-16 px-6 relative z-10">
          <p className="text-[9px] text-primary/40 tracking-[0.2em] uppercase leading-loose max-w-sm mx-auto">
            Accès sécurisé pour les membres exclusifs de la <span className="text-primary font-black">Maison Lilly Dubois</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
