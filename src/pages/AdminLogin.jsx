import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Shield, ArrowRight, ArrowLeft } from 'lucide-react';

const AdminLogin = ({ setPage, session }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If already logged in, redirect immediately
  if (session) {
    setPage('admin_dashboard');
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setPage('admin_dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1c32] flex lg:items-center justify-center p-6 animate-in fade-in relative">
      <button onClick={() => setPage('home')} className="absolute top-8 left-6 text-white/50 hover:text-white transition">
        <ArrowLeft size={24} />
      </button>

      <div className="w-full max-w-md mt-24 lg:mt-0">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-ambient">
            <Shield size={32} className="text-primary-container" strokeWidth={1} />
          </div>
          <h1 className="font-serif text-3xl text-white mb-2 tracking-wide">Accès Réservé</h1>
          <p className="font-sans text-white/50 text-sm tracking-widest uppercase">Lilly Shopping Manager</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-500 border border-red-400 text-white p-4 rounded-sm text-sm font-sans text-center animate-in slide-in-from-top-2 shadow-lg font-medium">
              Identifiants incorrects ou utilisateur inexistant.
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase font-sans tracking-widest text-white/50 mb-2 block">Adresse Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white font-sans focus:outline-none focus:border-primary-container transition-colors"
              placeholder="admin@lillyshopping.com"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-sans tracking-widest text-white/50 mb-2 block">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white font-sans focus:outline-none focus:border-primary-container transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-4 rounded-sm font-sans font-extrabold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.4)] disabled:opacity-50 mt-4"
          >
            {loading ? 'Authentification...' : (
              <>Se connecter à l'administration <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
