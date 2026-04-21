import React from 'react';
import { User, Package, MapPin, CreditCard, ChevronRight, ArrowLeft } from 'lucide-react';

const Profile = ({ setPage }) => {
  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in slide-in-from-bottom-4 duration-300">
      
      {/* Header Retour */}
      <div className="mb-8">
        <button onClick={() => setPage('home')} className="text-on-surface hover:text-primary transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* En-tête Profil avec Badge VIP */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0 shadow-ambient">
          <User size={32} strokeWidth={1} />
        </div>
        <div>
          <h1 className="font-serif text-2xl text-primary leading-tight mb-2">
            Lilly Dubois
          </h1>
          <span className="inline-block bg-primary px-3 py-1 text-[10px] text-tertiary-fixed font-sans uppercase tracking-[0.2em] rounded-sm shadow-sm">
            Client VIP
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
