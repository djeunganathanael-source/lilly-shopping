import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Edit2, Trash2, LogOut, ArrowLeft, RefreshCw, Archive, ImagePlus } from 'lucide-react';

const AdminDashboard = ({ setPage, session }) => {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'customers'
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    category: '',
    price: '',
    old_price: '',
    stock: '',
    image_url: '',
    description: ''
  });

  // Redirect if not logged in or not admin
  if (!session || session.user?.email?.toLowerCase() !== 'djeunganathanael@gmail.com') {
    // If they are somehow logged in but not an admin, boot them back to home
    if (session) {
      setPage('home');
    } else {
      setPage('admin_login');
    }
    return null;
  }

  // Fetch Supabase Products
  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error(error);
    else setProducts(data || []);
    setLoading(false);
  };

  // Fetch Customers & Stats
  const loadCustomers = async () => {
    setLoading(true);
    // Fetch profiles
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
    if (pError) console.error(pError);

    // Fetch orders (Assume an 'orders' table exists or use fallback logic)
    const { data: orders, error: oError } = await supabase.from('orders').select('*');
    
    const enrichedCustomers = (profiles || []).map(profile => {
      const userOrders = (orders || []).filter(o => o.user_id === profile.id);
      const totalSpent = userOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      return {
        ...profile,
        orderCount: userOrders.length,
        totalSpent: totalSpent,
        lastOrder: userOrders[0]?.created_at || 'Aucune'
      };
    });

    setCustomers(enrichedCustomers);
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'inventory') loadProducts();
    else loadCustomers();
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setPage('home');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = formData.image_url;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('lilly-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        alert("Erreur Upload: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage.from('lilly-images').getPublicUrl(filePath);
      finalImageUrl = publicUrl;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      price: parseInt(formData.price, 10),
      old_price: formData.old_price ? parseInt(formData.old_price, 10) : null,
      stock: parseInt(formData.stock, 10),
      image_url: finalImageUrl,
      description: formData.description
    };

    if (formData.id) {
      await supabase.from('products').update(payload).eq('id', formData.id);
    } else {
      await supabase.from('products').insert([payload]);
    }

    setFormData({ id: null, title: '', category: '', price: '', old_price: '', stock: '', image_url: '', description: '' });
    setImageFile(null);
    await loadProducts();
  };

  const editProduct = (p) => {
    setFormData({ ...p });
    setImageFile(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-outline-variant/20">
        <div className="flex items-center gap-6">
          <button onClick={() => setPage('home')} className="text-on-surface hover:text-primary">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <div className="flex gap-4">
             <button 
               onClick={() => setActiveTab('inventory')}
               className={`font-sans text-xs uppercase tracking-widest font-black transition-colors ${activeTab === 'inventory' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface/40 hover:text-on-surface'}`}
             >
               Inventaire
             </button>
             <button 
               onClick={() => setActiveTab('customers')}
               className={`font-sans text-xs uppercase tracking-widest font-black transition-colors ${activeTab === 'customers' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface/40 hover:text-on-surface'}`}
             >
               Clients
             </button>
          </div>
        </div>
        <button onClick={handleLogout} className="text-on-surface/50 hover:text-error transition p-2">
          <LogOut size={20} strokeWidth={1.5} />
        </button>
      </div>

      {activeTab === 'inventory' ? (
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* PANNEAU DE CONTRÔLE */}
          <div className="w-full lg:w-[40%] bg-surface-container-low p-8 rounded-sm shadow-lg border border-outline-variant/10 lg:sticky lg:top-8 z-10 animate-in slide-in-from-left-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary/10 p-2 rounded-full">
                <Plus size={20} className="text-primary-container" />
              </div>
              <h2 className="font-sans text-sm font-black uppercase text-primary tracking-widest">
                {formData.id ? 'Mode Modification' : 'Créer un Produit'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <input type="text" placeholder="Titre du produit" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface border border-outline-variant/20 p-4 text-sm rounded-sm focus:border-primary shadow-sm"/>
              <input type="text" placeholder="Catégorie" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-surface border border-outline-variant/20 p-4 text-sm rounded-sm focus:border-primary shadow-sm"/>
              
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface/50 mb-1 block font-bold">Prix Vente</label>
                  <input type="number" placeholder="FCFA" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-surface border border-outline-variant/20 p-4 text-sm shadow-sm"/>
                </div>
                <div className="w-1/2">
                  <label className="text-[10px] uppercase tracking-widest text-error/60 mb-1 block font-bold">Prix Promo</label>
                  <input type="number" placeholder="Optionnel" value={formData.old_price || ''} onChange={e => setFormData({...formData, old_price: e.target.value})} className="w-full bg-surface border border-error/20 p-4 text-sm shadow-sm"/>
                </div>
              </div>
              
              <input type="number" placeholder="Stock" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-surface border border-outline-variant/20 p-4 text-sm shadow-sm"/>

              <div className="relative mt-2">
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="w-full bg-surface border-2 border-dashed border-primary/30 p-8 rounded-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-primary/5 shadow-sm">
                  <ImagePlus size={32} className={imageFile ? "text-tertiary-fixed" : "text-primary"} />
                  <span className="font-sans text-xs font-black uppercase tracking-wider text-center">{imageFile ? imageFile.name : "Déposer Photo"}</span>
                </label>
              </div>

              <textarea placeholder="Description..." rows={4} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface border border-outline-variant/20 p-4 text-sm shadow-sm mt-2"></textarea>
              
              <div className="flex gap-4 mt-6">
                <button type="submit" className="w-full bg-primary text-on-primary py-4 text-[11px] uppercase font-black tracking-widest rounded-sm shadow-lg hover:bg-primary-container transition-all" disabled={loading}>
                  {loading ? '...' : (formData.id ? 'Valider' : 'Enregistrer')}
                </button>
              </div>
            </form>
          </div>

          {/* LISTE PRODUITS */}
          <div className="w-full lg:w-[60%] bg-surface border border-outline-variant/10 rounded-sm p-6 animate-in slide-in-from-right-4">
            <h2 className="font-serif text-2xl text-primary mb-6">Stock Actuel</h2>
            <div className="flex flex-col gap-3">
              {products.map(p => (
                <div key={p.id} className="bg-surface-container-low p-4 rounded-sm border border-outline-variant/10 flex items-center gap-5">
                  <img src={p.image_url} alt={p.title} className="w-16 h-20 object-cover rounded-sm shadow-sm" />
                  <div className="flex-1">
                    <p className="font-sans text-sm font-black text-primary truncate">{p.title}</p>
                    <p className="font-serif text-base text-primary-container">{p.price} FCFA</p>
                    <span className="font-sans text-[9px] font-bold uppercase text-on-surface/50 tracking-widest">Stock: {p.stock}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => editProduct(p)} className="p-2 bg-surface rounded-full border border-outline-variant/20 text-primary-container"><Edit2 size={14} /></button>
                    <button onClick={async () => { if(window.confirm("Supprimer?")) { await supabase.from('products').delete().eq('id', p.id); loadProducts(); } }} className="p-2 bg-error/5 rounded-full border border-error/20 text-error"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* VUE CLIENTS */
        <div className="animate-in fade-in duration-500">
           <div className="bg-surface border border-outline-variant/10 rounded-sm p-8 shadow-sm">
             <div className="flex justify-between items-center mb-10 border-b border-outline-variant/10 pb-6">
                <div>
                  <h2 className="font-serif text-3xl text-primary">Gestion des Clients</h2>
                  <p className="font-sans text-xs uppercase tracking-widest text-on-surface/40 mt-1">Base de données des Résidents Lilly Shopping</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-surface-container-low px-6 py-4 rounded-sm border border-outline-variant/10">
                    <span className="block text-[9px] uppercase tracking-widest text-on-surface/40 font-black mb-1">Total Clients</span>
                    <span className="font-serif text-2xl text-primary">{customers.length}</span>
                  </div>
                </div>
             </div>

             <div className="overflow-x-auto border border-outline-variant/30 rounded-sm">
               <table className="w-full text-left border-collapse bg-white/5">
                 <thead>
                   <tr className="bg-primary/5 border-b border-outline-variant/30">
                     <th className="py-5 px-6 text-[10px] uppercase tracking-[0.25em] font-black text-primary border-r border-outline-variant/10">Résident</th>
                     <th className="py-5 px-6 text-[10px] uppercase tracking-[0.25em] font-black text-primary border-r border-outline-variant/10">Email</th>
                     <th className="py-5 px-6 text-[10px] uppercase tracking-[0.25em] font-black text-primary border-r border-outline-variant/10 text-center">Status</th>
                     <th className="py-5 px-6 text-[10px] uppercase tracking-[0.25em] font-black text-primary border-r border-outline-variant/10 text-center">Commandes</th>
                     <th className="py-5 px-6 text-[10px] uppercase tracking-[0.25em] font-black text-primary text-right">Total Dépensé</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-outline-variant/20">
                   {customers.map(customer => (
                     <tr key={customer.id} className="even:bg-primary/[0.02] hover:bg-tertiary-fixed/10 transition-colors group">
                       <td className="py-6 px-6 border-r border-outline-variant/10">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center font-serif text-primary text-sm shadow-sm border border-primary/10">
                             {customer.full_name?.split(' ').filter(n => n).map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                           </div>
                           <span className="font-sans text-sm font-black text-primary group-hover:drop-shadow-sm">{customer.full_name || "Anonyme"}</span>
                         </div>
                       </td>
                       <td className="py-6 px-6 font-sans text-xs text-on-surface/70 border-r border-outline-variant/10 italic">{customer.email}</td>
                       <td className="py-6 px-6 border-r border-outline-variant/10 text-center">
                         <span className={`text-[9px] uppercase font-black px-3 py-1.5 rounded-full tracking-widest shadow-sm ${customer.status === 'Client VIP' ? 'bg-tertiary-fixed text-on-tertiary-fixed border border-on-tertiary-fixed/20' : 'bg-surface-container-high text-on-surface/60 border border-outline-variant/20'}`}>
                           {customer.status}
                         </span>
                       </td>
                       <td className="py-6 px-6 text-center font-serif text-base text-primary border-r border-outline-variant/10">{customer.orderCount}</td>
                       <td className="py-6 px-6 text-right font-serif text-lg text-primary-container font-black bg-primary/5 group-hover:bg-primary/10 transition-colors">
                         {customer.totalSpent?.toLocaleString()} <span className="text-[10px] font-sans font-normal opacity-50 ml-1">FCFA</span>
                       </td>
                     </tr>
                   ))}
                   {customers.length === 0 && (
                     <tr>
                       <td colSpan="5" className="py-24 text-center font-sans text-[11px] text-on-surface/30 uppercase tracking-[0.3em] font-black">Aucun résultat dans la base de données</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
