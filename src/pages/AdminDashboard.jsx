import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Edit2, Trash2, LogOut, ArrowLeft, RefreshCw, Archive, ImagePlus } from 'lucide-react';

const AdminDashboard = ({ setPage, session }) => {
  const [products, setProducts] = useState([]);
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

  // Redirect if not logged in
  if (!session) {
    setPage('admin_login');
    return null;
  }

  // Fetch Supabase Products
  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error(error);
      alert("Erreur de connexion à Supabase. Vérifiez vos clés et votre table 'products'.");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setPage('home');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = formData.image_url;

    // Supabase Upload Protocol
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`; // Organisé dans un dossier products

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('lilly-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        alert("Erreur lors de l'envoi de l'image (Vérifiez le Bucket Storage): " + uploadError.message);
        setLoading(false);
        return;
      }

      // Récupérer le lien public
      const { data: { publicUrl } } = supabase.storage
        .from('lilly-images')
        .getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    if (!finalImageUrl) {
      alert("Vous devez obligatoirement ajouter une image pour un nouveau produit.");
      setLoading(false);
      return;
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
      const { error } = await supabase.from('products').update(payload).eq('id', formData.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('products').insert([payload]);
      if (error) alert(error.message);
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

  const deleteProduct = async (id) => {
    if(window.confirm("Supprimer définitivement cet article ?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if(error) alert(error.message);
      else loadProducts();
    }
  };

  return (
    <div className="min-h-screen bg-surface px-6 pt-8 pb-32">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-outline-variant/20">
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('home')} className="text-on-surface hover:text-primary">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <div>
            <h1 className="font-serif text-2xl text-primary font-normal">Inventaire</h1>
            <p className="font-sans text-[10px] uppercase tracking-widest text-[#25D366] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
              Connecté
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-on-surface/50 hover:text-error transition p-2">
          <LogOut size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* PANNEAU DE CONTRÔLE (GAUCHE / TOUJOURS VISIBLE) */}
        <div className="w-full lg:w-[40%] bg-surface-container-low p-8 rounded-sm shadow-lg border border-outline-variant/10 lg:sticky lg:top-8 z-10 animate-in slide-in-from-left-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 p-2 rounded-full">
              <Plus size={20} className="text-primary-container" />
            </div>
            <h2 className="font-sans text-sm font-black uppercase text-primary tracking-widest">
              {formData.id ? 'Mode Modification Actif' : 'Créer un Produit'}
            </h2>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <input type="text" placeholder="Titre exact du produit (ex: Sac en Cuir)" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} spellCheck="true" autoCorrect="on" autoCapitalize="words" className="w-full bg-surface border border-outline-variant/20 p-4 text-sm font-sans rounded-sm focus:outline-none focus:border-primary text-on-surface shadow-sm"/>
            <input type="text" placeholder="Catégorie (ex: SACS, ACCESSOIRES...)" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} spellCheck="true" autoCorrect="on" autoCapitalize="characters" className="w-full bg-surface border border-outline-variant/20 p-4 text-sm font-sans rounded-sm focus:outline-none focus:border-primary text-on-surface shadow-sm"/>
            
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-[10px] uppercase tracking-widest text-on-surface/50 mb-1 block font-bold">Nouveau Prix (Vente)</label>
                <input type="number" placeholder="FCFA" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-surface border border-outline-variant/20 p-4 text-sm font-sans rounded-sm focus:outline-none focus:border-primary text-on-surface shadow-sm"/>
              </div>
              <div className="w-1/2">
                <label className="text-[10px] uppercase tracking-widest text-error/60 mb-1 block font-bold">Ancien Prix (Promo)</label>
                <input type="number" placeholder="FCFA (Optionnel)" value={formData.old_price || ''} onChange={e => setFormData({...formData, old_price: e.target.value})} className="w-full bg-surface border border-error/20 p-4 text-sm font-sans rounded-sm focus:outline-none focus:border-error text-error shadow-sm bg-error/5 placeholder-error/30"/>
              </div>
            </div>
            
            <div>
              <label className="text-[10px] uppercase tracking-widest text-on-surface/50 mb-1 block font-bold">Quantité disponible en stock</label>
              <input type="number" placeholder="Nombre d'articles" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-surface border border-outline-variant/20 p-4 text-sm font-sans rounded-sm focus:outline-none focus:border-primary text-on-surface shadow-sm"/>
            </div>

            <div className="relative mt-2">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImageFile(e.target.files[0])} 
                className="hidden" 
                id="file-upload" 
              />
              <label 
                htmlFor="file-upload" 
                className="w-full bg-surface border-2 border-dashed border-primary/30 p-8 rounded-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary transition-colors hover:bg-primary/5 shadow-sm"
              >
                <ImagePlus size={32} className={imageFile ? "text-tertiary-fixed" : "text-primary"} />
                <span className="font-sans text-xs text-on-surface font-black uppercase tracking-wider text-center">
                  {imageFile ? imageFile.name : (formData.image_url ? "Remplacer l'image existante" : "Déposer / Prendre une Photo")}
                </span>
                {!imageFile && !formData.image_url && <span className="font-sans text-[10px] text-on-surface/40 uppercase tracking-widest text-center">Ouvrira l'appareil photo ou la galerie</span>}
              </label>
            </div>

            <textarea placeholder="Description détaillée du produit..." rows={4} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} spellCheck="true" autoCorrect="on" autoCapitalize="sentences" className="w-full bg-surface border border-outline-variant/20 p-4 text-sm font-sans rounded-sm focus:outline-none focus:border-primary text-on-surface shadow-sm mt-2"></textarea>
            
            <div className="flex gap-4 mt-6">
              <button 
                type="button" 
                onClick={() => {
                  setFormData({ id: null, title: '', category: '', price: '', old_price: '', stock: '', image_url: '', description: '' }); 
                  setImageFile(null);
                }} 
                className="w-1/3 bg-surface border border-outline-variant/20 text-on-surface/70 py-4 text-[10px] uppercase font-black tracking-widest rounded-sm hover:bg-surface-container-low transition-colors shadow-sm"
              >
                Vider
              </button>
              <button 
                type="submit" 
                className="w-2/3 bg-primary text-on-primary py-4 text-[11px] uppercase font-black tracking-widest rounded-sm shadow-[0_0_15px_rgba(255,222,165,0.3)] hover:bg-primary-container hover:text-primary transition-all disabled:opacity-50" 
                disabled={loading}
              >
                {loading ? 'Traitement en cours...' : (formData.id ? 'Valider la Modification' : '+ Enregistrer le produit')}
              </button>
            </div>
          </form>
        </div>

        {/* PANNEAU INVENTAIRE (DROITE / TOUJOURS VISIBLE) */}
        <div className="w-full lg:w-[60%] bg-surface border border-outline-variant/10 rounded-sm p-6 animate-in slide-in-from-right-4">
          
          <div className="flex justify-between items-center border-b border-outline-variant/20 pb-6 mb-6">
            <div>
              <h2 className="font-serif text-2xl text-primary">Tous les produits</h2>
              <p className="font-sans text-[11px] text-on-surface/50 uppercase tracking-widest mt-1">Gérez votre stock actuel en direct</p>
            </div>
            <button onClick={loadProducts} className="px-5 py-3 bg-surface-container-low border border-outline-variant/20 text-primary rounded-sm flex items-center justify-center hover:bg-surface-container-high transition shadow-sm gap-2 font-sans font-bold text-[10px] uppercase tracking-widest">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Actualiser
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {products.length === 0 ? (
              <div className="text-center py-24 text-on-surface/30 flex flex-col items-center bg-surface-container-low/30 rounded-sm border border-dashed border-outline-variant/20">
                <Archive size={64} strokeWidth={0.5} className="mb-6"/>
                <p className="font-sans text-sm font-bold uppercase tracking-widest mb-2 text-primary/40">Inventaire vide</p>
                <p className="font-sans text-xs max-w-xs leading-relaxed">Commencez par ajouter votre tout premier produit en utilisant le formulaire situé juste à gauche !</p>
              </div>
            ) : (
              products.map(p => (
                <div key={p.id} className="bg-surface-container-low p-4 rounded-sm border border-outline-variant/10 flex items-center gap-5 hover:border-primary/30 transition-colors group">
                  
                  <div className="relative">
                    <img src={p.image_url} alt={p.title} className="w-16 h-20 object-cover rounded-sm bg-surface shadow-sm" />
                    {p.old_price && <span className="absolute -top-2 -left-2 bg-error text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase transform -rotate-6">Promo</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-black text-primary truncate mb-1">{p.title}</p>
                    <p className="font-serif text-base text-primary-container mb-2">{p.price} FCFA <span className="text-xs text-on-surface/30 line-through ml-2 font-sans">{p.old_price ? `${p.old_price} FCFA` : ''}</span></p>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[9px] font-bold uppercase text-on-surface/50 tracking-widest bg-surface border border-outline-variant/10 px-2 py-1 rounded-sm">{p.category}</span>
                      <span className={`font-sans text-[9px] font-bold uppercase px-2 py-1 rounded-sm tracking-widest ${p.stock > 0 ? 'bg-tertiary-fixed/10 text-tertiary-fixed' : 'bg-error/10 text-error'}`}>
                        Stock : {p.stock}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 shrink-0">
                    <button onClick={() => editProduct(p)} className="p-3 rounded-full bg-surface border border-outline-variant/20 text-primary-container hover:bg-primary-container hover:text-on-primary transition-colors shadow-sm" title="Modifier">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="p-3 rounded-full bg-error/5 border border-error/20 text-error hover:bg-error hover:text-white transition-colors shadow-sm" title="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
