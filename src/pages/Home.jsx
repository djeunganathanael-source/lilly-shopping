import React from 'react';
import ProductCard from '../components/ProductCard';
import { Menu } from 'lucide-react';

const Home = ({ setPage, setMenuOpen, openProduct, addToCart, toggleWishlist, wishlist, currency, formatPrice, products }) => {
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
          <h1 className="font-serif text-3xl font-normal text-primary tracking-tight mb-1">
            Lilly Shopping
          </h1>
          <p className="font-sans text-sm text-on-surface/60">
            The Curated Atelier
          </p>
        </div>
        <button className="text-on-surface" onClick={() => setMenuOpen(true)}>
          <Menu size={24} strokeWidth={1} />
        </button>
      </header>

      {/* Hero Banner Luxueux (CSS-Based High-End Logo) */}
      <section className="px-6 mb-16 lg:mb-24">
        <div className="w-full h-72 md:h-96 rounded-sm bg-gradient-to-br from-[#0d1c32] via-[#091322] to-[#040810] relative flex items-center justify-center p-4 md:p-8 border border-primary-container/20 shadow-2xl overflow-hidden group cursor-default">
          
          {/* Effet lumineux en arrière-plan */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container/20 via-transparent to-transparent opacity-40"></div>
          
          {/* Cadre de luxe interne (Signature des grandes maisons) */}
          <div className="border border-primary-container/30 w-full h-full flex flex-col items-center justify-center relative z-10 p-6 backdrop-blur-sm group-hover:border-primary-container/60 transition-colors duration-1000">
            
            {/* La Devise en Or */}
            <span className="text-[9px] md:text-[11px] font-sans font-black tracking-[0.4em] uppercase mb-6 text-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#b38728] text-transparent bg-clip-text drop-shadow-sm">
              Maison de Prestige
            </span>
            
            {/* Le Logo Typographique Centré */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-normal leading-none text-center mb-8 tracking-wide drop-shadow-lg flex flex-col md:flex-row items-center gap-2">
              LILLY <span className="text-primary-container italic font-light drop-shadow-[0_0_15px_rgba(255,222,165,0.4)]">Dubois</span>
            </h2>
            
            {/* Le Slogan Luxueux */}
            <div className="flex items-center gap-4 md:gap-6">
              <span className="w-8 md:w-16 h-px bg-primary-container/50"></span>
              <p className="font-sans text-white/80 text-[10px] md:text-xs tracking-widest uppercase text-center font-bold">
                L'art de vivre réinventé
              </p>
              <span className="w-8 md:w-16 h-px bg-primary-container/50"></span>
            </div>
            
          </div>
        </div>
      </section>

      {/* Liste des produits dynamique depuis la BD regroupés par catégories */}
      <main className="px-6 flex flex-col gap-16">
        {Object.entries(groupedProducts).map(([category, items]) => (
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
                    imageUrl={product.imageUrl || product.image_url}
                    onClick={() => openProduct(product.id)}
                    onAdd={() => addToCart(product)}
                    onLike={() => toggleWishlist(product)}
                    isLiked={wishlist?.some(item => item.id === product.id)}
                  />
                </div>
              ))}
            </div>

          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
