import React, { useState, useEffect } from 'react';
// Déploiement Vercel.
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Settings from './pages/Settings';
import CustomerService from './pages/CustomerService';
import Orders from './pages/Orders';
import Addresses from './pages/Addresses';
import Payments from './pages/Payments';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import BottomNavBar from './components/BottomNavBar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SideMenu from './components/SideMenu';
import { products as fallbackProducts } from './data/products';
import { formatPrice } from './utils/currency';
import { supabase } from './lib/supabaseClient';

function App() {
  // ROUTING BASH
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(fallbackProducts[0].id);

  // SUPABASE SESSION
  const [session, setSession] = useState(null);

  // USER PROFILE (Fetched from DB)
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

 useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        // Profile
        const { data: pData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        
        if (pData) {
          const fullName = pData.full_name || session.user.user_metadata?.full_name || 'Client';
          setUser({
            name: fullName,
            email: pData.email,
            status: pData.status || 'Client Privilège',
            initials: fullName.split(' ').filter(n => n).map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'CP',
            memberSince: new Date(pData.created_at || Date.now()).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
          });
        }

        // Orders
        const { data: oData } = await supabase.from('orders').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
        // (Garde le reste de ton code d'orders si tu en avais un)
      }
    };

    fetchUserData();
  }, [session]);
  // GLOBAL PRODUCTS (Fetched from Supabase)
  const [activeProducts, setActiveProducts] = useState(fallbackProducts);

  useEffect(() => {
    const fetchGlobalProducts = async () => {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setActiveProducts(data);
      }
    };
    fetchGlobalProducts();
  }, [page]);

  // APP CONTEXT (Global settings)
  const [currency, setCurrency] = useState('CFA');
  const [isDark, setIsDark] = useState(false);

  // Apply dark mode to HTML tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // PANIER ET WISHLIST
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // DYNAMIQUE BACKEND: COMMANDES, ADRESSES, PAIEMENTS
  const [orders, setOrders] = useState([
    { 
      id: '#LS-4029', date: '12 Avril 2026', totalCfa: 120500, status: 'En livraison', items: 1, active: true,
      cartSnapshot: [{ ...fallbackProducts[0], quantity: 1 }]
    },
    { 
      id: '#LS-3891', date: '04 Février 2026', totalCfa: 335000, status: 'Livré', items: 2, active: false,
      cartSnapshot: [{ ...fallbackProducts[1], quantity: 1 }, { ...fallbackProducts[2], quantity: 1 }]
    }
  ]);
  
  const [addresses, setAddresses] = useState([
    { id: 1, title: 'Bureau (Atelier)', desc: 'Centre des Affaires Akwa, Douala, Cameroun', isDefault: false },
    { id: 2, title: 'Lilly Dubois', desc: 'Quartier Bonapriso, Rue des Palmiers, Douala', isDefault: true }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'VISA', name: 'Carte Privilège', details: '•••• •••• •••• 4242', owner: 'Lilly Dubois', expiry: '12/28' },
    { id: 2, type: 'MM', name: 'Mobile Money', details: '+237 6 ** ** ** 59' }
  ]);

  // Actions Panier
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`"${product.title}" ajouté à votre sélection.`);
  };

  const removeFromCart = (productId) => setCart(prevCart => prevCart.filter(item => item.id !== productId));
  
  const updateQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) return { ...item, quantity: Math.max(0, item.quantity + delta) };
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Traitement PAIEMENT !
  const handleCheckout = async () => {
    if(cart.length === 0) return;
    const subTotalCfa = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const newOrder = {
      user_id: session?.user?.id,
      date_string: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      total_amount: subTotalCfa,
      status: 'En préparation',
      items_count: cartCount,
      cart_snapshot: JSON.stringify(cart)
    };
    
    try {
      const { data, error } = await supabase.from('orders').insert([newOrder]).select();
      if (error) throw error;
      
      const savedOrder = {
        id: data[0].id,
        date: data[0].date_string,
        totalCfa: data[0].total_amount,
        status: data[0].status,
        items: data[0].items_count,
        active: true,
        cartSnapshot: JSON.parse(data[0].cart_snapshot)
      };

      setOrders([savedOrder, ...orders]);
      setCart([]);
      setPage('orders');
      alert(`Votre paiement a été validé ! Commande ${savedOrder.id} confirmée.`);
    } catch (err) {
      alert("Erreur lors de la validation: " + err.message);
    }
  };

  const removeOrder = (orderId) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cette commande de votre historique ?")) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
    }
  };

  // Actions Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const openProduct = (productId) => { setSelectedProductId(productId); setPage('product'); };

  // AUTH GATEWAY (Supabase Auth)
  if (!session) {
    return <Login setPage={setPage} />;
  }

  // Ensure user profile is loaded
  if (!user && session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-tertiary-fixed border-t-transparent animate-spin"></div>
          <p className="font-serif text-white/50 text-xs tracking-widest uppercase">Initialisation de votre espace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-surface dark:bg-surface-dark relative overflow-x-hidden pt-8 pb-32 transition-colors duration-300">
      
      {page === 'home' && <Home setPage={setPage} setMenuOpen={setIsMenuOpen} openProduct={openProduct} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} currency={currency} formatPrice={formatPrice} products={activeProducts} user={user} />}
      {page === 'product' && <ProductDetails setPage={setPage} productId={selectedProductId} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} currency={currency} formatPrice={formatPrice} products={activeProducts} />}
      {page === 'cart' && <Cart setPage={setPage} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} currency={currency} formatPrice={formatPrice} handleCheckout={handleCheckout} />}
      {page === 'search' && <Search openProduct={openProduct} addToCart={addToCart} setPage={setPage} toggleWishlist={toggleWishlist} wishlist={wishlist} currency={currency} formatPrice={formatPrice} products={activeProducts} user={user} />}
      {page === 'profile' && <Profile setPage={setPage} user={user} />}
      {page === 'wishlist' && <Wishlist setPage={setPage} wishlist={wishlist} openProduct={openProduct} addToCart={addToCart} toggleWishlist={toggleWishlist} currency={currency} formatPrice={formatPrice} user={user} />}
      {page === 'settings' && <Settings setPage={setPage} currency={currency} setCurrency={setCurrency} isDark={isDark} setIsDark={setIsDark} />}
      {page === 'support' && <CustomerService setPage={setPage} />}
      {page === 'orders' && <Orders setPage={setPage} orders={orders} removeOrder={removeOrder} currency={currency} formatPrice={formatPrice} />}
      {page === 'addresses' && <Addresses setPage={setPage} addresses={addresses} setAddresses={setAddresses} />}
      {page === 'payments' && <Payments setPage={setPage} paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods} />}
      
      {/* SUPABASE ADMIN PAGES */}
      {page === 'admin_login' && <AdminLogin setPage={setPage} session={session} />}
      {page === 'admin_dashboard' && <AdminDashboard setPage={setPage} session={session} />}
      
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} setPage={setPage} user={user} />
      <FloatingWhatsApp />
      <BottomNavBar setPage={setPage} currentPage={page} cartItemCount={cartItemCount} />

    </div>
  );
}

export default App;
