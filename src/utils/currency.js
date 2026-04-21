export const formatPrice = (priceCfa, currency) => {
  if (currency === 'EUR') {
    return `€ ${(priceCfa / 655).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  }
  if (currency === 'USD') {
    return `$ ${(priceCfa / 600).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  }
  // Default CFA
  return `CFA ${priceCfa.toLocaleString('fr-FR')}`;
};
