import React, { useState } from 'react';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Search = ({ openProduct, addToCart, setPage, toggleWishlist, wishlist, currency, formatPrice, products }) => {
  const [query, setQuery] = useState('');

  // Filtrage intelligent (Recherche sur le titre ou la catégorie)
  const results = products.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in fade-in duration-300">
      
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setPage('home')} className="text-on-surface hover:text-primary transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-3xl font-normal text-primary">Recherche</h1>
      </div>

      {/* Input de recherche premium */}
      <div className="relative mb-10 w-full group">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sacs, Lunettes, etc..." 
          className="w-full bg-surface-container-low text-on-surface py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-outline-variant/50 transition-all placeholder:text-on-surface/40 rounded-sm"
          autoFocus
        />
        <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/50" />
      </div>

      {query.length === 0 ? (
        /* État initial : Filtres tendance (Chips) */
        <div>
          <h2 className="font-sans text-xs tracking-[0.15em] uppercase text-on-surface/50 mb-4">Recherches Tendances</h2>
          <div className="flex flex-wrap gap-3">
            <span onClick={() => setQuery("Sacs")} className="px-5 py-2 bg-primary-container text-white rounded-full font-sans text-xs cursor-pointer shadow-ambient">Sacs Été</span>
            <span onClick={() => setQuery("Lunettes")} className="px-5 py-2 bg-surface-container-high text-on-surface rounded-full font-sans text-xs cursor-pointer hover:bg-surface-container-highest transition-colors">Lunettes Or</span>
            <span onClick={() => setQuery("Robes")} className="px-5 py-2 bg-surface-container-high text-on-surface rounded-full font-sans text-xs cursor-pointer hover:bg-surface-container-highest transition-colors">Robes</span>
            <span onClick={() => setQuery("Accessoires")} className="px-5 py-2 bg-surface-container-high text-on-surface rounded-full font-sans text-xs cursor-pointer hover:bg-surface-container-highest transition-colors">Accessoires</span>
          </div>
        </div>
      ) : (
        /* État de recherche : Résultats dynamiques */
        <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4">
          <h2 className="font-sans text-xs tracking-[0.15em] uppercase text-on-surface/50 mb-2">
            Résultats ({results.length})
          </h2>
          
          {results.length > 0 ? (
            results.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.title}
                category={product.category}
                price={formatPrice(product.price, currency)}
                imageUrl={product.imageUrl}
                onClick={() => openProduct(product.id)}
                onAdd={() => addToCart(product)}
                onLike={() => toggleWishlist(product)}
                isLiked={wishlist?.some(item => item.id === product.id)}
              />
            ))
          ) : (
            <p className="font-sans text-sm text-on-surface/60 mt-10 text-center">Aucun article ne correspond à "{query}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
