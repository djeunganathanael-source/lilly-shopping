import React from 'react';
import { User, Package, MapPin, CreditCard, ChevronRight, ArrowLeft } from 'lucide-react';

const Profile = ({ setPage, user }) => {
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark px-6 pt-8 pb-32 animate-in slide-in-from-bottom-4 duration-300 transition-colors">
      
      {/* Header Retour */}
      <div className="mb-8">
        <button onClick={() => setPage('home')} className="text-on-surface dark:text-on-surface-dark hover:text-primary dark:hover:text-tertiary-fixed transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* En-tête Profil avec Badge VIP */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0 shadow-ambient font-serif text-xl">
          {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" /> : user.initials}
        </div>
        <div>
          <h1 className="font-serif text-2xl text-primary dark:text-white leading-tight mb-2">
            {user.name}
          </h1>
          <span className="inline-block bg-primary dark:bg-tertiary-fixed-dim px-3 py-1 text-[10px] text-tertiary-fixed dark:text-primary font-sans uppercase tracking-[0.2em] rounded-sm shadow-sm transition-colors">
            {user.status}
          </span>
        </div>
      </div>

      {/* Sections Profil */}
      <div className="flex flex-col gap-2">
        <button onClick={() => setPage('orders')} className="bg-surface-container-low p-5 rounded-sm flex items-center justify-between hover:bg-surface-container-high transition-colors">
          <div className="flex items-center gap-4 text-on-surface">
            <Package size={20} strokeWidth={1.5} className="text-primary-container" />
            <span className="font-sans text-sm font-medium">Mes Commandes</span>
          </div>
          <ChevronRight size={18} className="text-outline-variant" />
        </button>

        <button onClick={() => setPage('addresses')} className="bg-surface-container-low p-5 rounded-sm flex items-center justify-between hover:bg-surface-container-high transition-colors">
          <div className="flex items-center gap-4 text-on-surface">
            <MapPin size={20} strokeWidth={1.5} className="text-primary-container" />
            <span className="font-sans text-sm font-medium">Adresses de livraison</span>
          </div>
          <ChevronRight size={18} className="text-outline-variant" />
        </button>

        <button onClick={() => setPage('payments')} className="bg-surface-container-low p-5 rounded-sm flex items-center justify-between hover:bg-surface-container-high transition-colors">
          <div className="flex items-center gap-4 text-on-surface">
            <CreditCard size={20} strokeWidth={1.5} className="text-primary-container" />
            <span className="font-sans text-sm font-medium">Moyens de paiement</span>
          </div>
          <ChevronRight size={18} className="text-outline-variant" />
        </button>
      </div>

    </div>
  );
};

export default Profile;
