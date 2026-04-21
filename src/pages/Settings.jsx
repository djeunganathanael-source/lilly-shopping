import React from 'react';
import { ArrowLeft, Bell, Moon, Globe, LogOut } from 'lucide-react';

const Settings = ({ setPage, currency, setCurrency, isDark, setIsDark, setIsAuthenticated }) => {
  const toggleNotifications = () => { alert("Les notifications push sont simulées."); };
  
  const handleLogout = () => {
    if(window.confirm("Voulez-vous vraiment vous déconnecter ? L'historique sera sécurisé.")) {
      setIsAuthenticated(false);
      setPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark px-6 pt-8 pb-32 animate-in slide-in-from-right-4 duration-300">
      
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => setPage('profile')} className="text-on-surface dark:text-white">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-2xl text-primary dark:text-white font-normal">Paramètres</h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Toggle Notifications */}
        <div className="flex items-center justify-between border-b border-outline-variant/10 pb-6">
          <div className="flex items-center gap-4 text-on-surface dark:text-white">
            <Bell size={20} strokeWidth={1.5} className="text-primary-container dark:text-tertiary-fixed" />
            <span className="font-sans text-sm font-medium">Notifications Push</span>
          </div>
          <div onClick={toggleNotifications} className="w-12 h-6 rounded-full p-1 cursor-pointer transition-colors bg-primary">
            <div className={`w-4 h-4 bg-surface rounded-full shadow-md transform transition-transform translate-x-6`} />
          </div>
        </div>

        {/* Toggle Dark Mode REAL */}
        <div className="flex items-center justify-between border-b border-outline-variant/10 pb-6">
          <div className="flex items-center gap-4 text-on-surface dark:text-white">
            <Moon size={20} strokeWidth={1.5} className="text-primary-container dark:text-tertiary-fixed" />
            <span className="font-sans text-sm font-medium">Mode Sombre</span>
          </div>
          <div onClick={() => setIsDark(!isDark)} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isDark ? 'bg-primary' : 'bg-outline-variant/30'}`}>
            <div className={`w-4 h-4 bg-surface rounded-full shadow-md transform transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'}`} />
          </div>
        </div>

        {/* Select Devise REAL */}
        <div className="flex items-center justify-between border-b border-outline-variant/10 pb-6">
          <div className="flex items-center gap-4 text-on-surface dark:text-white">
            <Globe size={20} strokeWidth={1.5} className="text-primary-container dark:text-tertiary-fixed" />
            <span className="font-sans text-sm font-medium">Devise Globale</span>
          </div>
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-sm font-sans font-bold text-primary-container dark:text-tertiary-fixed focus:outline-none cursor-pointer"
          >
            <option value="CFA">CFA</option>
            <option value="EUR">Euros (€)</option>
            <option value="USD">Dollars ($)</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="mt-16 w-full bg-error/10 border border-error/20 text-error py-4 rounded-sm flex items-center justify-center gap-3 font-sans font-medium uppercase tracking-wider text-xs hover:bg-error/20 transition-colors"
      >
        <LogOut size={16} />
        Se déconnecter
      </button>

    </div>
  );
};
export default Settings;
