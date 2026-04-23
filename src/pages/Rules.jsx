import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, RefreshCcw, Lock } from 'lucide-react';

const Rules = ({ setPage }) => {
  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in fade-in duration-300 relative">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setPage('home')} className="text-on-surface hover:text-primary transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-2xl text-primary font-normal">Règles de la Maison</h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* Intro */}
        <section className="text-center mb-16">
          <h2 className="font-serif text-4xl text-primary mb-4 tracking-tighter">Charte d'Excellence</h2>
          <div className="w-16 h-px bg-tertiary-fixed mx-auto mb-6"></div>
          <p className="font-sans text-on-surface-variant leading-loose">
            Maison Lilly Dubois s'engage à offrir une expérience d'exception à ses membres. 
            Découvrez nos engagements et les règles qui régissent notre atelier.
          </p>
        </section>

        {/* Section 1 */}
        <div className="bg-white border border-outline-variant/30 p-8 rounded-sm shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all"></div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans font-black uppercase tracking-widest text-primary text-sm mb-2">Authenticité Garantie</h3>
              <p className="font-sans text-on-surface-variant text-sm leading-relaxed text-justify">
                Chaque pièce présentée dans notre atelier est rigoureusement sélectionnée et vérifiée. 
                Nous condamnons formellement la contrefaçon. Tout achat sur Lilly Shopping garantit 
                une qualité premium irréprochable.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-outline-variant/30 p-8 rounded-sm shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-tertiary-fixed group-hover:w-2 transition-all"></div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed/10 flex items-center justify-center shrink-0">
              <Truck size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans font-black uppercase tracking-widest text-primary text-sm mb-2">Expéditions Privilèges</h3>
              <ul className="space-y-3 font-sans text-on-surface-variant text-sm mt-4">
                <li className="flex gap-2">
                  <span className="text-tertiary-fixed font-black">✓</span> 
                  Traitement de la commande sous 24h ouvrées.
                </li>
                <li className="flex gap-2">
                  <span className="text-tertiary-fixed font-black">✓</span> 
                  Livraison offerte pour tous les Membres Privilège.
                </li>
                <li className="flex gap-2">
                  <span className="text-tertiary-fixed font-black">✓</span> 
                  Livraison suivie et sécurisée contre signature.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white border border-outline-variant/30 p-8 rounded-sm shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all"></div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
              <RefreshCcw size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans font-black uppercase tracking-widest text-primary text-sm mb-2">Politique de Retour Flexible</h3>
              <p className="font-sans text-on-surface-variant text-sm leading-relaxed text-justify">
                Si une création ne correspond pas parfaitement à vos attentes, la Maison Lilly vous accorde 
                un délai de 14 jours pour procéder à un échange ou obtenir un avoir. Les articles doivent nous 
                revenir intacts, avec leurs sceaux d'authenticité.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-white border border-outline-variant/30 p-8 rounded-sm shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:w-2 transition-all"></div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
              <Lock size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans font-black uppercase tracking-widest text-primary text-sm mb-2">Sécurité & Données</h3>
              <p className="font-sans text-on-surface-variant text-sm leading-relaxed text-justify">
                Les règlements par Mobile Money et Orange Money sont strictement vérifiés par nos équipes 
                pour prévenir toute fraude. Vos données personnelles sont chiffrées selon les normes de 
                sécurité militaire et ne sont jamais partagées à des tiers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Rules;
