import React from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

const Payments = ({ setPage, paymentMethods, setPaymentMethods }) => {

  const addPayment = () => {
    const type = window.prompt("Type de paiement (VISA ou MM) ?").toUpperCase();
    if (type !== 'VISA' && type !== 'MM') {
      alert("Seuls les paiements VISA ou MM (Mobile Money) sont acceptés en simulation.");
      return;
    }
    const details = window.prompt("Saisissez les détails (ex: +237... ou •••• 4242) :");
    if (details) {
      setPaymentMethods([...paymentMethods, { id: Date.now(), type, name: type === 'VISA' ? 'Nouvelle Carte' : 'Nouveau Wallet MM', details }]);
    }
  };

  const removePayment = (id) => {
    if(window.confirm("Retirer ce moyen de paiement de votre portefeuille ?")) {
       setPaymentMethods(paymentMethods.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setPage('profile')} className="text-on-surface hover:text-primary transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-2xl text-primary font-normal">Paiement</h1>
      </div>

      <div className="flex flex-col gap-6 mb-10">
        {paymentMethods.map(p => (
           p.type === 'VISA' ? (
             <div key={p.id} className="bg-gradient-to-br from-[#0d1c32] to-[#1a2d4c] rounded-lg p-6 shadow-ambient overflow-hidden relative">
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
               <button onClick={() => removePayment(p.id)} className="absolute top-4 right-4 text-white/50 hover:text-error transition"><Trash2 size={16} /></button>
               
               <div className="flex justify-between items-start mb-10 relative z-10">
                 <span className="text-white/60 font-sans tracking-widest text-xs uppercase">{p.name || 'Carte Privilège'}</span>
                 <span className="text-white font-serif italic text-lg opacity-90">VISA</span>
               </div>
               
               <div className="relative z-10">
                 <p className="font-sans text-white/50 text-[10px] tracking-widest uppercase mb-1">Numéro de carte</p>
                 <p className="font-sans text-white text-xl tracking-[0.15em] mb-4">{p.details}</p>
                 
                 <div className="flex justify-between items-center">
                   <div>
                     <p className="font-sans text-white/50 text-[9px] tracking-widest uppercase mb-1">Titulaire</p>
                     <p className="font-sans text-white text-sm uppercase">{p.owner || 'Lilly Dubois'}</p>
                   </div>
                   <div className="text-right">
                     <p className="font-sans text-white/50 text-[9px] tracking-widest uppercase mb-1">Expire</p>
                     <p className="font-sans text-white text-sm">{p.expiry || '12/30'}</p>
                   </div>
                 </div>
               </div>
             </div>
           ) : (
             <div key={p.id} className="bg-surface-container-low border border-outline-variant/20 rounded-lg p-5 flex items-center justify-between shadow-sm relative pr-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-white font-serif text-xs">MM</div>
                  <div>
                    <h3 className="font-sans text-sm font-medium text-primary mb-1">{p.name || 'Mobile Money'}</h3>
                    <p className="font-sans text-xs text-on-surface/50">{p.details}</p>
                  </div>
                </div>
                <button onClick={() => removePayment(p.id)} className="absolute right-4 text-on-surface/30 hover:text-error transition"><Trash2 size={16} /></button>
             </div>
           )
        ))}
      </div>

      <button onClick={addPayment} className="w-full bg-surface-container-low border border-outline-variant/30 text-primary-container py-5 rounded-sm flex items-center justify-center gap-3 font-sans text-sm hover:bg-surface-container-high transition-colors">
        <Plus size={18} />
        <span>Ajouter un moyen de paiement</span>
      </button>

    </div>
  );
};

export default Payments;
