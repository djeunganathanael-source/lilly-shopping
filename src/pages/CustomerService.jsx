import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, PhoneCall, Mail, ChevronDown } from 'lucide-react';

const CustomerService = ({ setPage }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Quels sont les délais de livraison ?", a: "La livraison VIP express s'effectue sous 24 à 48 heures au Cameroun et à l'international." },
    { q: "Comment effectuer un retour ?", a: "Les retours sont garantis sous 14 jours. Écrivez à notre équipe WhatsApp pour un bordereau gratuit." },
    { q: "Avez-vous des points de vente physiques ?", a: "Notre concept store exclusif ouvre uniquement sur rendez-vous pour nos Clients VIP." }
  ];

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in slide-in-from-right-4 duration-300">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setPage('home')} className="text-on-surface">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-2xl text-primary font-normal">Service Client</h1>
      </div>

      {/* Boutons d'Action Massifs */}
      <div className="grid gap-4 mb-14">
        {/* L'intégration WhatsApp officielle */}
        <a href="https://wa.me/237621857659" target="_blank" rel="noreferrer" className="bg-[#25D366]/10 border border-[#25D366]/20 py-5 px-6 rounded-sm flex items-center justify-between text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
          <span className="font-sans text-sm font-medium">Discuter sur WhatsApp</span>
          <MessageCircle size={20} />
        </a>
        
        <a href="tel:+237621857659" className="bg-primary-container text-white py-5 px-6 rounded-sm flex items-center justify-between hover:bg-primary transition-colors shadow-ambient">
          <span className="font-sans text-sm font-medium">Appeler l'Atelier</span>
          <PhoneCall size={20} />
        </a>
        
        <a href="mailto:contact@lillyshopping.com" className="bg-surface-container-high text-primary-container py-5 px-6 rounded-sm flex items-center justify-between hover:bg-outline-variant/30 transition-colors">
          <span className="font-sans text-sm font-medium">Envoyer un E-mail</span>
          <Mail size={20} />
        </a>
      </div>

      {/* Accordéon FAQ */}
      <div>
        <h2 className="font-serif text-xl text-primary mb-6">Questions Fréquentes</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-surface-container-low rounded-sm overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
                className="w-full text-left p-5 flex justify-between items-center"
              >
                <span className="font-sans text-[13px] text-primary-container font-medium leading-snug pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`text-outline-variant transition-transform shrink-0 ${openFaq === idx ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              <div className={`px-5 font-sans text-sm text-on-surface/70 leading-relaxed overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CustomerService;
