import React from 'react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

const BottomNavBar = ({ setPage, currentPage, cartItemCount }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-4">
      <nav className="mx-auto max-w-2xl w-full bg-surface/80 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-outline-variant/20 dark:border-white/10 rounded-full shadow-ambient dark:shadow-ambient-dark transition-colors duration-300">
        <ul className="flex items-center justify-between px-6 py-4">
          
          <li onClick={() => setPage('home')} className="flex flex-col items-center gap-1 group cursor-pointer relative">
            <div className={`p-2 rounded-full transition-all ${currentPage === 'home' || currentPage === 'product' ? 'bg-primary-container dark:bg-tertiary-fixed text-white dark:text-on-tertiary-fixed' : 'text-on-surface/50 dark:text-white/40 hover:text-primary-container dark:hover:text-tertiary-fixed'}`}>
              <Home size={22} strokeWidth={1.5} />
            </div>
            {(currentPage === 'home' || currentPage === 'product') && <span className="text-[10px] font-sans font-bold text-primary-container dark:text-tertiary-fixed tracking-wider uppercase">Accueil</span>}
          </li>

          <li onClick={() => setPage('search')} className="flex flex-col items-center gap-1 group cursor-pointer relative">
            <div className={`p-2 rounded-full transition-all ${currentPage === 'search' ? 'bg-primary-container dark:bg-tertiary-fixed text-white dark:text-on-tertiary-fixed' : 'text-on-surface/50 dark:text-white/40 hover:text-primary-container dark:hover:text-tertiary-fixed'}`}>
              <Search size={22} strokeWidth={1.5} />
            </div>
            {currentPage === 'search' && <span className="text-[10px] font-sans font-bold text-primary-container dark:text-tertiary-fixed tracking-wider uppercase">Recherche</span>}
          </li>

          <li onClick={() => setPage('cart')} className="flex flex-col items-center gap-1 group cursor-pointer relative">
            <div className={`p-2 rounded-full transition-all ${currentPage === 'cart' ? 'bg-primary-container dark:bg-tertiary-fixed text-white dark:text-on-tertiary-fixed' : 'text-on-surface/50 dark:text-white/40 hover:text-primary-container dark:hover:text-tertiary-fixed'}`}>
              <ShoppingBag size={22} strokeWidth={1.5} />
              
              {/* Le point rouge (Champagne) ne s'affiche que si le panier n'est pas vide */}
              {cartItemCount > 0 && (
                 <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${currentPage === 'cart' ? 'bg-tertiary-fixed border border-primary-container' : 'bg-tertiary-fixed dark:bg-tertiary-fixed-dim'} animate-pulse`}></span>
              )}
            </div>
            {currentPage === 'cart' && <span className="text-[10px] font-sans font-bold text-primary-container dark:text-tertiary-fixed tracking-wider uppercase">Panier</span>}
          </li>

          <li onClick={() => setPage('profile')} className="flex flex-col items-center gap-1 group cursor-pointer relative">
            <div className={`p-2 rounded-full transition-all ${currentPage === 'profile' ? 'bg-primary-container dark:bg-tertiary-fixed text-white dark:text-on-tertiary-fixed' : 'text-on-surface/50 dark:text-white/40 hover:text-primary-container dark:hover:text-tertiary-fixed'}`}>
              <User size={22} strokeWidth={1.5} />
            </div>
            {currentPage === 'profile' && <span className="text-[10px] font-sans font-bold text-primary-container dark:text-tertiary-fixed tracking-wider uppercase">Profil</span>}
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default BottomNavBar;
