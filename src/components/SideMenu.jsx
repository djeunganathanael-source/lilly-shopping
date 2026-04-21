import React from 'react';
import { X, ChevronRight, User, Heart, Settings, HelpCircle, ShieldAlert } from 'lucide-react';

const SideMenu = ({ isOpen, onClose, setPage }) => {
  return (
    <>
      {/* Overlay sombre */}
      <div 
        className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Tiroir coulissant */}
      <div className={`fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-surface z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header Tiroir */}
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/20">
          <h2 className="font-serif text-xl text-primary">Maison Lilly</h2>
          <button onClick={onClose} className="p-2 text-on-surface hover:text-error transition-colors">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Liens de navigation */}
        <nav className="p-6 flex flex-col gap-6">
          <button onClick={() => { setPage('profile'); onClose(); }} className="flex justify-between items-center group">
            <div className="flex items-center gap-4 text-on-surface group-hover:text-primary-container transition-colors">
              <User size={20} strokeWidth={1.5} />
              <span className="font-sans text-sm tracking-wide">Mon Espace</span>
            </div>
            <ChevronRight size={16} className="text-outline-variant group-hover:text-primary-container" />
          </button>

          <button onClick={() => { setPage('wishlist'); onClose(); }} className="flex justify-between items-center group">
            <div className="flex items-center gap-4 text-on-surface group-hover:text-primary-container transition-colors">
              <Heart size={20} strokeWidth={1.5} />
              <span className="font-sans text-sm tracking-wide">Liste d'envies</span>
            </div>
            <ChevronRight size={16} className="text-outline-variant group-hover:text-primary-container" />
          </button>

          <button onClick={() => { setPage('settings'); onClose(); }} className="flex justify-between items-center group">
            <div className="flex items-center gap-4 text-on-surface group-hover:text-primary-container transition-colors">
              <Settings size={20} strokeWidth={1.5} />
              <span className="font-sans text-sm tracking-wide">Paramètres</span>
            </div>
            <ChevronRight size={16} className="text-outline-variant group-hover:text-primary-container" />
          </button>

          <button onClick={() => { setPage('support'); onClose(); }} className="flex justify-between items-center group">
            <div className="flex items-center gap-4 text-on-surface group-hover:text-primary-container transition-colors">
              <HelpCircle size={20} strokeWidth={1.5} />
              <span className="font-sans text-sm tracking-wide">Service Client</span>
            </div>
            <ChevronRight size={16} className="text-outline-variant group-hover:text-primary-container" />
          </button>

          <button onClick={() => { setPage('admin_login'); onClose(); }} className="flex justify-between items-center group mt-8 pt-8 border-t border-outline-variant/20">
            <div className="flex items-center gap-4 text-error/80 group-hover:text-error transition-colors">
              <ShieldAlert size={20} strokeWidth={1.5} />
              <span className="font-sans text-sm tracking-wide">Espace Administrateur</span>
            </div>
            <ChevronRight size={16} className="text-outline-variant group-hover:text-error" />
          </button>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
