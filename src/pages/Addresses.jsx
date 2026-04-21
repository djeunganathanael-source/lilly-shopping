import React from 'react';
import { ArrowLeft, MapPin, Edit2, Plus, Trash2 } from 'lucide-react';

const Addresses = ({ setPage, addresses, setAddresses }) => {
  const addAddress = () => {
    const title = window.prompt("Nom de l'adresse (ex: Domicile, Bureau) :");
    const desc = window.prompt("Saisissez l'adresse complète :");
    if(title && desc) {
      setAddresses([...addresses, { id: Date.now(), title, desc, isDefault: addresses.length === 0 }]);
    }
  };

  const removeAddress = (id) => {
    if(window.confirm("Supprimer cette adresse ?")) {
       setAddresses(addresses.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setPage('profile')} className="text-on-surface hover:text-primary transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-2xl text-primary font-normal">Adresses d'expédition</h1>
      </div>

      <div className="flex flex-col gap-6">
        {addresses.map(adr => (
           <div key={adr.id} className={adr.isDefault ? "bg-primary text-white p-6 rounded-sm shadow-ambient relative" : "bg-surface-container-low border border-outline-variant/10 p-6 rounded-sm relative"}>
              {adr.isDefault && <span className="absolute top-4 right-6 text-[9px] font-sans uppercase tracking-[0.2em] bg-tertiary-fixed text-primary px-2 py-1 rounded-sm">Par défaut</span>}
              <MapPin size={24} strokeWidth={1} className={`${adr.isDefault ? 'text-tertiary-fixed' : 'text-primary-container'} mb-4`} />
              <h3 className={`font-serif text-lg mb-1 ${!adr.isDefault && 'text-primary'}`}>{adr.title}</h3>
              <p className={`font-sans text-sm leading-relaxed mb-4 ${adr.isDefault ? 'text-white/70' : 'text-on-surface/60'}`}>{adr.desc}</p>
              <div className={`flex items-center justify-between font-sans text-xs ${adr.isDefault ? 'text-tertiary-fixed/90' : 'text-primary-container'}`}>
                 <span onClick={() => alert("Édition simulée sur: " + adr.title)} className="uppercase tracking-wider hover:underline cursor-pointer flex items-center gap-1"><Edit2 size={12}/> Modifier</span>
                 {!adr.isDefault && <Trash2 size={14} className="text-error cursor-pointer" onClick={() => removeAddress(adr.id)} />}
              </div>
           </div>
        ))}
      </div>

      <button onClick={addAddress} className="mt-8 w-full border border-dashed border-outline-variant text-on-surface/60 py-5 rounded-sm flex items-center justify-center gap-3 font-sans text-sm hover:text-primary hover:border-primary transition-colors">
        <Plus size={18} />
        <span>Ajouter une nouvelle adresse</span>
      </button>
    </div>
  );
};
export default Addresses;
