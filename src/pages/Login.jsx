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
          // Wait for the animation before continuing
          setTimeout(() => {
            // No action needed, session update in App.jsx will handle navigation
          }, 4000);
        }
      } else {
        // ... (Signup logic remains same)
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        if (signUpError) throw signUpError;
        if (user) {
          await supabase.from('profiles').upsert({ id: user.id, full_name: name, email: email, status: 'Client Privilège' });
        }
        alert("Compte créé avec succès !");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-tertiary-fixed selection:text-primary">
      
      {/* Admin Welcome Screen Overlay */}
      {showAdminWelcome && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000 p-8 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container/20 via-transparent to-transparent animate-pulse"></div>
          <Heart size={80} className="text-tertiary-fixed mb-12 animate-bounce fill-tertiary-fixed/10" strokeWidth={0.5} />
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tighter leading-tight scale-105 transition-transform duration-1000">
            Salutations, <span className="text-tertiary-fixed italic font-light">Propriétaire</span>
          </h2>
          <div className="w-24 h-px bg-tertiary-fixed/50 mb-10"></div>
          <p className="font-sans text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed tracking-wide animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            Votre empire vous attend. Prenez les rênes de Maison Lilly et forgez la destinée de votre succès. <br/>
            <span className="text-white font-black uppercase tracking-[0.3em] block mt-8 text-sm">Vous êtes le Patron.</span>
          </p>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-primary-container/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-tertiary-fixed/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-xl z-10 animate-in fade-in zoom-in duration-1000">
        
        {/* Brand Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black border border-white/10 mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
            <Heart size={32} className="text-tertiary-fixed fill-tertiary-fixed/5" strokeWidth={1} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 tracking-tighter">
            Lilly <span className="italic font-light text-tertiary-fixed">Dubois</span>
          </h1>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-white/50 font-black">
            The Curated Atelier • Est. 2026
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#0f0f0f] border border-white/[0.08] p-10 md:p-14 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex gap-10 mb-12 border-b border-white/[0.03] pb-6 justify-center">
            <button 
              onClick={() => setIsLogin(true)}
              className={`text-xs tracking-[0.3em] uppercase font-black transition-all duration-500 ${isLogin ? 'text-tertiary-fixed border-b-2 border-tertiary-fixed pb-6' : 'text-white/20 hover:text-white/50 pb-6'}`}
            >
              Connexion
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`text-xs tracking-[0.3em] uppercase font-black transition-all duration-500 ${!isLogin ? 'text-tertiary-fixed border-b-2 border-tertiary-fixed pb-6' : 'text-white/20 hover:text-white/50 pb-6'}`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-8">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-[10px] uppercase tracking-widest font-black rounded-sm text-center animate-shake">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-black ml-1">Nom du Résident</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Votre nom complet"
                    className="w-full bg-[#181818] border border-white/[0.08] rounded-sm py-5 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-tertiary-fixed focus:bg-[#1a1a1a] transition-all placeholder:text-white/10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-black ml-1">Adresse de Correspondance</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre@email.com"
                  className="w-full bg-[#181818] border border-white/[0.08] rounded-sm py-5 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-tertiary-fixed focus:bg-[#1a1a1a] transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-black ml-1">Clé de Sécurité</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#181818] border border-white/[0.08] rounded-sm py-5 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-tertiary-fixed focus:bg-[#1a1a1a] transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-6 w-full bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-primary py-6 rounded-sm font-sans font-black uppercase tracking-[0.35em] text-[10px] flex items-center justify-center gap-4 transition-all duration-500 shadow-[0_15px_40px_rgba(255,222,165,0.15)] hover:shadow-[0_20px_50px_rgba(255,222,165,0.25)] hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              ) : (
                <>
                  {isLogin ? "S'authentifier" : "Rejoindre l'Atelier"}
                  <ArrowRight size={18} strokeWidth={3} />
                </>
              )}
            </button>
          </form>

          {isLogin && (
            <div className="text-center mt-12">
              <button className="text-[9px] text-white/20 hover:text-tertiary-fixed uppercase tracking-[0.2em] font-black transition-colors">
                Mot de passe égaré ?
              </button>
            </div>
          )}
        </div>

        {/* Policy Footer */}
        <div className="text-center mt-16 px-6">
          <p className="text-[9px] text-white/20 tracking-[0.2em] uppercase leading-loose max-w-sm mx-auto">
            Accès sécurisé pour les membres exclusifs de la <span className="text-white/40">Maison Lilly Dubois</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
