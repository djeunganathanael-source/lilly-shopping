import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, UploadCloud, CheckCircle } from 'lucide-react';

const Cart = ({ setPage, cart, updateQuantity, removeFromCart, currency, formatPrice, handleCheckout }) => {
  const [proofFile, setProofFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subTotal; 
  
  const submitPayment = async () => {
    setIsProcessing(true);
    await handleCheckout(proofFile);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in fade-in duration-300 relative">
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
                  <img src={item.image_url || item.imageUrl || item.image} alt={item.title} className="w-full h-full object-cover" />
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
              <span className="font-sans text-sm text-on-surface/60">Livraison Privilège</span>
              <span className="font-serif text-base text-tertiary-fixed">Gracieusement Offerte</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm font-medium uppercase tracking-wider text-on-surface">Total</span>
              <span className="font-serif text-2xl text-primary-container">{formatPrice(total, currency)}</span>
            </div>
          </div>

          {/* PAYMENT METHODS SECTION LIGHT LUXURY REDESIGN */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-sm p-6 mb-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            
            <h2 className="font-serif text-xl text-primary mb-2 flex items-center justify-between relative z-10">
              Finalisation 
              <span className="h-[1px] w-12 bg-primary/20 block"></span>
            </h2>
            
            <p className="font-sans text-[11px] text-on-surface/50 tracking-widest uppercase mb-8 leading-loose relative z-10">
              Veuillez honorer votre solde de <span className="text-primary font-black block mt-1">{formatPrice(total, currency)}</span> via nos canaux sécurisés.
            </p>

            <div className="flex flex-col gap-4 mb-8 relative z-10">
              
              {/* ORANGE MONEY LUXURY CARD */}
              <div className="relative p-5 border border-outline-variant/20 bg-surface-container-low rounded-sm flex items-center gap-5 group hover:border-[#FF6600]/40 transition-colors shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6600]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="w-12 h-12 rounded-full border border-[#FF6600]/20 bg-white flex items-center justify-center shrink-0 shadow-[0_5px_15px_rgba(255,102,0,0.08)]">
                  <span className="font-serif text-lg font-black text-[#FF6600]">O</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] font-black text-on-surface/90">Orange Money</h3>
                  <p className="font-serif text-lg text-on-surface/50 mt-1 tracking-wider">+237 6 96 23 55 19</p>
                </div>
              </div>

              {/* MTN MOBILE MONEY LUXURY CARD */}
              <div className="relative p-5 border border-outline-variant/20 bg-surface-container-low rounded-sm flex items-center gap-5 group hover:border-[#FFCC00]/50 transition-colors shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFCC00]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="w-12 h-12 rounded-full border border-[#FFCC00]/30 bg-white flex items-center justify-center shrink-0 shadow-[0_5px_15px_rgba(255,204,0,0.1)]">
                  <span className="font-serif text-lg font-black text-[#FFCC00]">M</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] font-black text-on-surface/90">Mobile Money</h3>
                  <p className="font-serif text-lg text-on-surface/50 mt-1 tracking-wider">+237 6 79 88 40 96</p>
                </div>
              </div>

            </div>

            <div className="border-t border-outline-variant/20 pt-8 relative z-10">
              <p className="font-sans text-[10px] text-primary uppercase tracking-[0.2em] font-black mb-4">Attestation de Transfert</p>
              
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setProofFile(e.target.files[0])} 
                  className="hidden" 
                  id="proof-upload" 
                />
                <label 
                  htmlFor="proof-upload" 
                  className={`w-full border p-8 rounded-sm flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${proofFile ? 'border-primary bg-primary/5 shadow-inner' : 'border-outline-variant/30 bg-surface-container-low hover:border-primary/40 hover:bg-white inset-shadow'}`}
                >
                  {proofFile ? (
                    <>
                      <CheckCircle size={32} strokeWidth={1} className="text-primary drop-shadow-sm" />
                      <span className="font-sans text-[11px] font-black text-primary uppercase tracking-widest text-center truncate w-full px-4">{proofFile.name}</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={32} strokeWidth={1} className="text-primary/30 group-hover:text-primary transition-colors" />
                      <span className="font-sans text-[9px] font-medium text-primary/60 uppercase tracking-[0.25em] text-center leading-loose">
                        Insérer le justificatif <br/> <span className="opacity-50">(Capture d'écran)</span>
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          <button 
            onClick={submitPayment}
            disabled={isProcessing || !proofFile}
            className="w-full bg-tertiary-fixed text-on-tertiary-fixed py-6 rounded-sm flex items-center justify-center font-sans font-black uppercase tracking-[0.3em] text-[11px] hover:bg-tertiary-fixed-dim transition-all shadow-[0_15px_40px_rgba(204,255,0,0.25)] hover:shadow-[0_20px_50px_rgba(204,255,0,0.4)] hover:-translate-y-1 mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Vérification...' : 'Confirmer Ma Commande'}
          </button>
        </>
      )}
    </div>
  );
};
export default Cart;
