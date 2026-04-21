import React, { useState } from 'react';
import { ArrowLeft, Package, CheckCircle, ChevronDown, Trash2 } from 'lucide-react';

const Orders = ({ setPage, orders, removeOrder, currency, formatPrice }) => {
  const [openOrder, setOpenOrder] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => setPage('profile')} className="text-on-surface hover:text-primary transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif text-2xl text-primary font-normal">Historique</h1>
      </div>

      <div className="flex flex-col gap-6">
        {orders.length === 0 ? (
           <p className="text-sm font-sans text-on-surface/60 mt-10 text-center">Aucune commande pour le moment.</p>
        ) : (
          orders.map((order, idx) => (
            <div 
              key={idx} 
              onClick={() => toggleOrderDetails(order.id)}
              className="bg-surface-container-low p-5 rounded-sm border border-outline-variant/10 shadow-sm relative overflow-hidden transition-all duration-300 cursor-pointer"
            >
              {order.active && <div className="absolute top-0 left-0 w-1 h-full bg-tertiary-fixed"></div>}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-sans text-xs text-on-surface/50 tracking-wider uppercase mb-1">Commande {order.id}</p>
                  <p className="font-serif text-base text-primary leading-tight">{order.date}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-serif text-base text-primary-container mb-1">{formatPrice(order.totalCfa, currency)}</p>
                  <div className="flex items-center gap-1 text-on-surface/60">
                    <span className="font-sans text-[11px]">{order.items} article(s)</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${openOrder === order.id ? 'rotate-180 text-primary-container' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="bg-surface-container-high px-4 py-3 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {order.active ? (
                    <Package size={16} className="text-tertiary-fixed shrink-0" />
                  ) : (
                    <CheckCircle size={16} className="text-[#25D366] shrink-0" />
                  )}
                  <span className={`font-sans text-xs font-medium uppercase tracking-wide ${order.active ? 'text-tertiary-fixed' : 'text-[#25D366]'}`}>
                    {order.status}
                  </span>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); removeOrder(order.id); }} 
                  className="text-on-surface/30 hover:text-error transition-colors p-2 -mr-2"
                  title="Supprimer la commande de l'historique"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Order Details Dropdown */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openOrder === order.id ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-outline-variant/20' : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0'}`}
              >
                <p className="font-sans text-[10px] tracking-widest uppercase text-on-surface/40 mb-3">Détails de la commande</p>
                <div className="flex flex-col gap-3">
                  {order.cartSnapshot && order.cartSnapshot.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-high rounded-sm overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-xs font-medium text-primary line-clamp-1">{item.title}</p>
                        <p className="font-sans text-[10px] text-on-surface/50 uppercase">Qté: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-sans text-xs font-medium text-primary-container">{formatPrice(item.price * item.quantity, currency)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
