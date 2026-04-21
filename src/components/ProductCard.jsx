import React from 'react';
import { Plus, Heart } from 'lucide-react';

const ProductCard = ({ title, category, price, oldPrice, imageUrl, onClick, onAdd, onLike, isLiked }) => {
  return (
    <div className="flex flex-col group cursor-pointer mb-8" onClick={onClick}>
      <div className="relative w-full aspect-[4/5] bg-surface-container-low mb-4 overflow-hidden">
        {oldPrice && (
          <span className="absolute top-4 left-4 z-20 bg-error text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm shadow-sm">
            En Promotion
          </span>
        )}
        <img 
          src={imageUrl} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if(onLike) onLike(); 
          }}
          className={`absolute bottom-4 right-16 p-3 rounded-full shadow-ambient transition-colors ${isLiked ? 'bg-white text-error' : 'bg-surface/80 text-on-surface backdrop-blur-md hover:bg-surface'}`}
        >
          <Heart size={20} strokeWidth={isLiked ? 2.5 : 2} className={isLiked ? "fill-current" : ""} />
        </button>

        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if(onAdd) onAdd(); 
          }}
          className="absolute bottom-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed p-3 rounded-full shadow-ambient hover:bg-tertiary-fixed-dim transition-colors"
        >
          <Plus size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="pt-4 px-2 pb-2">
        {/* Catégorie Ultra Fine et Espacée */}
        <span className="text-[9px] md:text-[10px] font-sans text-on-surface/50 tracking-[0.3em] font-bold uppercase mb-2 block">
          {category}
        </span>
        
        {/* Titre Majeur (Police Serif, Capitalisé automatiquement, Effet survol) */}
        <h3 className="text-lg md:text-xl font-serif text-primary leading-snug mb-3 capitalize tracking-wide group-hover:text-primary-container transition-colors duration-500">
          {title}
        </h3>
        
        {/* Prix Moderniste et Tranchant */}
        <div className="flex items-center gap-3">
          <p className="font-sans font-black text-sm md:text-base text-white tracking-widest">
            {price}
          </p>
          {oldPrice && (
            <p className="font-sans text-[10px] md:text-xs text-error/80 line-through decoration-error/50 font-bold uppercase tracking-widest">
              {oldPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
