import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Wishlist = ({ setPage, wishlist = [], openProduct, addToCart, toggleWishlist, currency, formatPrice }) => {
  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setPage('home')} className="text-on-surface">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-2xl text-primary font-normal">
          Liste d'envies ({wishlist.length})
        </h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-24 opacity-60">
          <Heart size={48} className="mb-6 text-tertiary-fixed" strokeWidth={1} />
          <p className="font-sans text-sm text-center text-on-surface/80 leading-relaxed px-4 mb-8">
            Votre liste d'envies est tristement vide.<br/> Ajoutez des coups de cœur pour les retrouver ici.
          </p>
          <button onClick={() => setPage('home')} className="text-xs font-sans uppercase tracking-[0.15em] text-primary border-b border-primary pb-1 hover:text-tertiary-fixed-dim transition-colors">
            Explorer les collections
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlist.map((product) => (
             <ProductCard 
                key={product.id}
                title={product.title}
                category={product.category}
                price={formatPrice(product.price, currency)}
                imageUrl={product.imageUrl}
                onClick={() => openProduct(product.id)}
                onAdd={() => addToCart(product)}
                onLike={() => toggleWishlist(product)}
                isLiked={true}
             />
          ))}
        </div>
      )}

    </div>
  );
};

export default Wishlist;
