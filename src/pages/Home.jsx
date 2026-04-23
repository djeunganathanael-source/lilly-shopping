import React from 'react';
import ProductCard from '../components/ProductCard';
import { Menu } from 'lucide-react';

const Home = ({ setPage, setMenuOpen, openProduct, addToCart, toggleWishlist, wishlist, currency, formatPrice, products, user }) => {
  // Regrouper les produits par catégorie
  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.category || 'Autres Collections';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Editorial */}
      <header className="px-6 mb-12 flex justify-between items-start">
        <div>
          <span className="text-[10px] font-sans text-on-surface/50 dark:text-on-surface-dark/50 uppercase tracking-[0.2em] mb-1 block">
            Bienvenue, {user.name.split(' ')[0]}
          </span>
          <h1 className="font-serif text-3xl font-normal text-primary dark:text-white tracking-tight mb-1">
            Lilly Shopping
          </h1>
          <p className="font-sans text-sm text-on-surface/70 dark:text-on-surface-dark/70">
            The Curated Atelier
          </p>
        </div>
        <button className="text-on-surface" onClick={() => setMenuOpen(true)}>
          <Menu size={24} strokeWidth={1} />
        </button>
      </header>

      {/* Hero Banner Luxueux (Navy & Lime Contrast) */}
      <section className="px-6 mb-16 lg:mb-24">
        <div className="w-full h-72 md:h-96 rounded-sm bg-primary relative flex items-center justify-center p-4 md:p-8 border border-tertiary-fixed/10 shadow-[0_20px_50px_rgba(11,36,71,0.4)] overflow-hidden group cursor-default">
          
          {/* Effet lumineux en arrière-plan */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container/80 via-transparent to-transparent opacity-80"></div>
          
          {/* Cadre interne stylisé */}
          <div className="border border-tertiary-fixed/20 w-full h-full flex flex-col items-center justify-center relative z-10 p-6 backdrop-blur-sm group-hover:border-tertiary-fixed/50 transition-colors duration-1000">
            
            {/* L'Accroche Vert Citron */}
            <span className="text-[9px] md:text-[11px] font-sans font-black tracking-[0.4em] uppercase mb-6 text-center text-tertiary-fixed drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
              Maison de Prestige
            </span>
            
            {/* Le Logo Typographique Centré */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-black leading-none text-center mb-8 tracking-wide drop-shadow-lg flex flex-col md:flex-row items-center gap-2">
              LILLY <span className="text-tertiary-fixed italic font-medium drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">Dubois</span>
            </h2>
            
            {/* Le Slogan Luxueux */}
            <div className="flex items-center gap-4 md:gap-6">
              <span className="w-8 md:w-16 h-px bg-tertiary-fixed/60"></span>
              <p className="font-sans text-white/90 text-[10px] md:text-xs tracking-[0.3em] uppercase text-center font-bold">
                L'art de vivre réinventé
              </p>
              <span className="w-8 md:w-16 h-px bg-tertiary-fixed/60"></span>
            </div>
            
          </div>
        </div>
      </section>

      {/* Liste des produits dynamique depuis la BD regroupés par catégories */}
      <main className="px-6 flex flex-col gap-16">
        
        {Object.keys(groupedProducts).length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-surface-container-low border border-dashed border-outline-variant/40 rounded-sm">
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <span className="text-primary font-serif italic text-2xl">L</span>
            </div>
            <h3 className="font-serif text-2xl text-primary mb-3">La Collection se Précurise</h3>
            <p className="font-sans text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
              La boutique est actuellement vide. L'équipe d'administration prépare les nouveaux produits de la saison pour Maison Lilly Dubois.
            </p>
          </div>
        ) : (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category}>
              
              {/* Ligne de séparation élégante avec Nom de Catégorie */}
              <div className="flex items-center gap-6 mb-10 w-full max-w-4xl mx-auto">
                <span className="flex-1 h-px bg-gradient-to-r from-transparent to-primary-container/40"></span>
                <h2 className="font-serif text-3xl md:text-4xl text-primary antialiased font-light tracking-wide capitalize px-2 drop-shadow-sm">
                  {category}
                </h2>
                <span className="flex-1 h-px bg-gradient-to-l from-transparent to-primary-container/40"></span>
              </div>

              {/* La Grille Magnifique (4 par rangée sur Desktop, 2 sur Mobile) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
                {items.map((product) => (
                  <div key={product.id} className="w-full">
                    <ProductCard 
                      title={product.title}
                      category={product.category}
                      price={formatPrice(product.price, currency)}
                      oldPrice={product.old_price ? formatPrice(product.old_price, currency) : null}
                      imageUrl={product.imageUrl || product.image_url || product.image}
                      onClick={() => openProduct(product.id)}
                      onAdd={() => addToCart(product)}
                      onLike={() => toggleWishlist(product)}
                      isLiked={wishlist?.some(item => item.id === product.id)}
                      userStatus={user.status}
                    />
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
