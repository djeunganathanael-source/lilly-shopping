import React from 'react';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';

const ProductDetails = ({ setPage, productId, addToCart, toggleWishlist, wishlist, currency, formatPrice, products }) => {
  // Retrouve le bon produit
  const product = products.find(p => p.id === productId) || products[0];
  const isLiked = wishlist?.some(item => item.id === product.id);

  return (
    <div className="bg-surface min-h-screen pb-32 animate-in slide-in-from-right-4 duration-300">
      {/* Header Image (Pleine largeur stylisée) */}
      <div className="relative w-full aspect-[3/4] bg-surface-container-low mb-8">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="object-cover w-full h-full"
        />
        
        {/* Top Navigation Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-primary/30 to-transparent">
          <button 
            onClick={() => setPage('home')}
            className="w-10 h-10 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-surface/40 transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => toggleWishlist(product)} 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isLiked ? 'bg-white text-error' : 'bg-surface/20 text-white backdrop-blur-md hover:bg-surface/40'}`}
          >
            <Heart size={20} strokeWidth={isLiked ? 2.5 : 1.5} className={isLiked ? "fill-current" : ""} />
          </button>
        </div>
      </div>

      {/* Informations Produit */}
      <div className="px-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-4">
            <span className="text-[10px] font-sans text-on-surface/50 tracking-[0.1em] uppercase mb-2 block">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl text-primary leading-tight mb-2">
              {product.title}
            </h1>
          </div>
          <div className="text-right shrink-0">
            <p className="font-serif text-2xl text-primary-container">
              {formatPrice(product.price, currency)}
            </p>
          </div>
        </div>

        {/* Description Editoriale */}
        <p className="font-sans text-sm text-on-surface/70 leading-relaxed mb-8">
          {product.description}
        </p>

        {/* Action Button - Couleur Luxe */}
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-tertiary-fixed text-on-tertiary-fixed py-4 rounded-sm flex items-center justify-center gap-3 font-sans font-medium uppercase tracking-wider text-xs hover:bg-tertiary-fixed-dim transition-colors shadow-ambient"
        >
          <ShoppingBag size={18} strokeWidth={2} />
          Ajouter à la sélection
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
