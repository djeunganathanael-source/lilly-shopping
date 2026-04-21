import React from 'react';

// Icône WhatsApp simple en SVG pour éviter un package lourd
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/237621857659"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 right-6 z-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg')] bg-center bg-no-repeat bg-[length:24px_24px] bg-white border border-outline-variant/20 p-6 rounded-full shadow-ambient hover:scale-110 transition-transform"
      aria-label="Contacter sur WhatsApp"
    >
      {/* L'icône est maintenant gérée par l'image de fond officielle */}
    </a>
  );
};

export default FloatingWhatsApp;
