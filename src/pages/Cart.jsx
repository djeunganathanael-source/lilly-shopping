import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = ({ setPage, cart, updateQuantity, removeFromCart, currency, formatPrice, handleCheckout }) => {
  const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subTotal; 

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setPage('home')} className="text-on-surface">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-2xl text-primary font-normal">Votre Sélection</h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-20 opacity-50">
          <ShoppingBag size={48} className="mb-4 text-outline-variant" strokeWidth={1} />
          <p className="font-sans text-on-surface">Votre panier est vide.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8 mb-12">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center animate-in slide-in-from-right-4">
                <div className="w-24 h-32 bg-surface-container-low shrink-0 relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between h-32 py-1">
                  <div>
                    <h3 className="font-sans text-sm font-medium text-on-surface mb-1">{item.title}</h3>
                    <p className="font-sans text-[11px] text-on-surface/50 tracking-wider uppercase">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-base text-primary-container">{formatPrice(item.price * item.quantity, currency)}</p>
                    <div className="flex items-center gap-3 bg-surface-container-low px-2 py-1 rounded-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-on-surface/60 hover:text-primary"><Minus size={14} /></button>
                      <span className="font-sans text-xs w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-on-surface/60 hover:text-primary"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="h-32 flex items-start pt-1 text-on-surface/30 hover:text-error transition-colors">
                  <Trash2 size={18} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-outline-variant/30 pt-6 mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-sans text-sm text-on-surface/60">Sous-total</span>
              <span className="font-serif text-base text-primary">{formatPrice(subTotal, currency)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-sans text-sm text-on-surface/60">Livraison VIP</span>
              <span className="font-serif text-base text-primary">Offerte</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm font-medium uppercase tracking-wider text-on-surface">Total</span>
              <span className="font-serif text-2xl text-primary-container">{formatPrice(total, currency)}</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full bg-primary text-on-primary py-4 rounded-sm flex items-center justify-center font-sans font-medium uppercase tracking-wider text-xs hover:bg-primary-container transition-colors shadow-ambient mt-auto"
          >
            Procéder au paiement
          </button>
        </>
      )}
    </div>
  );
};
export default Cart;
