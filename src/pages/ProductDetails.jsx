import React from 'react';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';

const ProductDetails = ({ setPage, productId, addToCart, toggleWishlist, wishlist, currency, formatPrice, products }) => {
  // Retrouve le bon produit
  const product = products.find(p => p.id === productId) || products[0];
  const isLiked = wishlist?.some(item => item.id === product?.id);

  if (!product) {
    return (
      <div className="bg-surface min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl text-primary mb-2">Collection Indisponible</h2>
        <p className="font-sans text-sm text-on-surface-variant mb-6">Maison Lilly prépare actuellement ses nouvelles pièces d'exception. Veuillez repasser plus tard.</p>
        <button onClick={() => setPage('home')} className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-sm font-black uppercase text-xs">Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen pb-32 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Top Navigation Overlay */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <button 
          onClick={() => setPage('home')}
          className="w-12 h-12 rounded-full bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-md flex items-center justify-center text-primary shadow-[0_5px_15px_rgba(11,36,71,0.1)] hover:bg-white hover:scale-110 hover:-rotate-12 transition-all pointer-events-auto"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
        <button
          onClick={() => toggleWishlist(product)} 
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-md shadow-[0_5px_15px_rgba(11,36,71,0.1)] pointer-events-auto hover:bg-white hover:scale-110 ${isLiked ? 'text-error border-error/20' : 'text-primary'}`}
        >
          <Heart size={20} strokeWidth={isLiked ? 2.5 : 1.5} className={isLiked ? "fill-error" : ""} />
        </button>
      </div>

      {/* Header Image (Hero Product View) */}
      <div className="relative w-full aspect-[4/5] bg-surface-container-high md:aspect-[16/9] md:max-h-[70vh] mb-8 overflow-hidden rounded-b-3xl shadow-[0_15px_40px_rgba(11,36,71,0.06)]">
        <img 
          src={product.imageUrl || product.image_url || product.image} 
          alt={product.title}
          className="object-cover w-full h-full object-center hover:scale-105 transition-transform duration-[2s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-primary/10 pointer-events-none"></div>
      </div>

      {/* Informations Produit (Psychological Layout) */}
      <div className="px-6 md:max-w-2xl md:mx-auto">
        <div className="flex flex-col mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary/5 border border-primary/10 rounded-sm text-[9px] font-sans text-primary/60 tracking-[0.2em] font-black uppercase mb-4">
              {product.category || 'Collection Exclusive'}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-primary font-black leading-tight mb-2 tracking-tighter">
              {product.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <p className="font-sans text-3xl font-black tracking-tighter text-primary">
              {formatPrice(product.price, currency)}
            </p>
            {product.old_price && (
              <span className="font-sans text-sm text-primary/40 line-through tracking-wider">
                {formatPrice(product.old_price, currency)}
              </span>
            )}
            <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-1 bg-tertiary-fixed/20 text-[#2B3B0A] text-[9px] font-black rounded-sm border border-tertiary-fixed/40 uppercase tracking-widest shadow-[0_0_10px_rgba(204,255,0,0.1)]">
              <span className="w-1.5 h-1.5 bg-tertiary-fixed rounded-full animate-pulse"></span>
              En Stock
            </span>
          </div>
        </div>

        {/* Action Button - High Conversion Lime Green */}
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-tertiary-fixed text-on-tertiary-fixed py-6 rounded-sm flex items-center justify-center gap-3 font-sans font-black uppercase tracking-[0.25em] text-xs hover:bg-tertiary-fixed-dim transition-all shadow-[0_15px_40px_rgba(204,255,0,0.25)] hover:shadow-[0_20px_50px_rgba(204,255,0,0.4)] hover:-translate-y-1 mb-10 active:scale-95"
        >
          <ShoppingBag size={18} strokeWidth={2.5} />
          Ajouter au Panier
        </button>

        {/* Description Editoriale */}
        <div className="mb-12">
          <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] font-black text-primary/40 mb-4 border-b border-outline-variant/40 pb-4">
            Détails de l'Atelier
          </h3>
          <p className="font-serif text-sm md:text-base text-on-surface-variant leading-relaxed text-justify first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-primary">
            {product.description || "Une pièce d'exception confectionnée avec le plus grand soin par nos artisans. Ce produit incarne l'essence même de Maison Lilly Dubois, alliant confort moderne et silhouette intemporelle."}
          </p>
        </div>

        {/* Trust Badges - Operational Features */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-sm p-6 space-y-4 shadow-sm">
          
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-tertiary-fixed/20 group-hover:text-tertiary-fixed transition-colors">
              <span className="font-serif italic font-bold">L</span>
            </div>
            <div>
              <p className="font-sans text-[10px] text-primary uppercase font-black tracking-widest mb-0.5">Livraison Privilège</p>
              <p className="font-sans text-[11px] text-on-surface-variant/80">Offerte dans toute la ville sous 24h à 48h.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
             <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-tertiary-fixed/20 group-hover:text-tertiary-fixed transition-colors">
              <span className="font-serif italic font-bold">R</span>
            </div>
            <div>
              <p className="font-sans text-[10px] text-primary uppercase font-black tracking-widest mb-0.5">Retours Simplifiés</p>
              <p className="font-sans text-[11px] text-on-surface-variant/80">Satisfaction garantie. Échange sous 14 jours.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
