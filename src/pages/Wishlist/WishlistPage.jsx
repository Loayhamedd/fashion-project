// src/pages/Wishlist/WishlistPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Trash2, Filter, 
  Share2, Eye, AlertCircle, ArrowRight 
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCartSync } from '../../features/cart/cartSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('recent');
  const [selectedItems, setSelectedItems] = useState([]);
  
  // بيانات المفضلة (مثال)
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Nordic Chair',
      description: 'Premium wooden chair with ergonomic design',
      price: 3000,
      originalPrice: 3500,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'Chairs',
      stock: 15,
      addedDate: '2024-02-15',
      isInStock: true,
      colors: ['#8B7355', '#2C3E50', '#BDC3C7']
    },
    {
      id: 2,
      name: 'Modern Sofa',
      description: '3-seater velvet sofa with wooden legs',
      price: 3200,
      originalPrice: 3800,
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'Sofas',
      stock: 8,
      addedDate: '2024-02-10',
      isInStock: true,
      colors: ['#8B7355', '#7D3C98', '#F39C12']
    },
    {
      id: 3,
      name: 'Armchair',
      description: 'Leather armchair with adjustable back',
      price: 2600,
      originalPrice: 3000,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'Chairs',
      stock: 0,
      addedDate: '2024-02-05',
      isInStock: false,
      colors: ['#8B7355', '#34495E', '#7F8C8D']
    },
    {
      id: 4,
      name: 'Dining Table',
      description: '6-seater oak dining table',
      price: 4500,
      originalPrice: 5000,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'Tables',
      stock: 5,
      addedDate: '2024-01-28',
      isInStock: true,
      colors: ['#8B7355', '#D35400', '#2ECC71']
    },
    {
      id: 5,
      name: 'Office Chair',
      description: 'Ergonomic office chair with lumbar support',
      price: 2400,
      originalPrice: 2800,
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'Chairs',
      stock: 12,
      addedDate: '2024-01-20',
      isInStock: true,
      colors: ['#8B7355', '#27AE60', '#3498DB']
    },
    {
      id: 6,
      name: 'Side Table',
      description: 'Minimalist side table with marble top',
      price: 800,
      originalPrice: 1000,
      image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'Tables',
      stock: 20,
      addedDate: '2024-01-15',
      isInStock: true,
      colors: ['#E74C3C', '#F1C40F', '#9B59B6']
    }
  ]);
  
  const categories = ['All', 'Chairs', 'Sofas', 'Tables', 'Lamps'];
  
  // فرز العناصر
  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'discount':
        const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
        const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
        return discountB - discountA;
      default: // recent
        return new Date(b.addedDate) - new Date(a.addedDate);
    }
  });
  
  const handleAddToCart = (item) => {
    const cartItem = {
      product: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      description: item.description
    };
    
    dispatch(addToCartSync(cartItem));
    alert(`${item.name} added to cart!`);
  };
  
  const handleRemoveFromWishlist = (id) => {
    if (window.confirm('Remove this item from your wishlist?')) {
      setWishlistItems(items => items.filter(item => item.id !== id));
      setSelectedItems(selected => selected.filter(itemId => itemId !== id));
    }
  };
  
  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };
  
  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to remove');
      return;
    }
    
    if (window.confirm(`Remove ${selectedItems.length} item(s) from wishlist?`)) {
      setWishlistItems(items => items.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };
  
  const handleAddSelectedToCart = () => {
    const selected = wishlistItems.filter(item => selectedItems.includes(item.id) && item.isInStock);
    
    if (selected.length === 0) {
      alert('No in-stock items selected');
      return;
    }
    
    selected.forEach(item => {
      const cartItem = {
        product: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        description: item.description
      };
      dispatch(addToCartSync(cartItem));
    });
    
    alert(`${selected.length} item(s) added to cart!`);
  };
  
  const totalSavings = wishlistItems.reduce((sum, item) => 
    sum + (item.originalPrice - item.price), 0
  );
  
  const inStockItems = wishlistItems.filter(item => item.isInStock);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSelectAll}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                {selectedItems.length === wishlistItems.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{wishlistItems.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <Heart size={24} className="text-pink-600 fill-pink-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{inStockItems.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingCart size={24} className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-green-600 mt-1">${totalSavings.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertCircle size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <Filter size={20} className="text-gray-600 flex-shrink-0" />
              {categories.map(category => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Sort and Bulk Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
                >
                  <option value="recent">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
              
              {selectedItems.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={handleAddSelectedToCart}
                    className="px-4 py-2 bg-[#8B7355] text-white rounded-lg text-sm font-medium hover:bg-[#A38B6D] transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add Selected ({selectedItems.filter(id => 
                      wishlistItems.find(item => item.id === id)?.isInStock
                    ).length})
                  </button>
                  
                  <button
                    onClick={handleRemoveSelected}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Remove Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love for later. Click the heart icon on any product to add it here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#8B7355] text-white rounded-lg font-medium hover:bg-[#A38B6D] transition-colors"
              >
                <ArrowRight size={20} />
                Browse Products
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                {/* Item Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="h-5 w-5 rounded border-gray-300 text-[#8B7355] focus:ring-[#8B7355]/30"
                      />
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.isInStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isInStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Item Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Discount Badge */}
                  {item.originalPrice > item.price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save ${(item.originalPrice - item.price).toFixed(2)}
                    </div>
                  )}
                  
                  {/* View Button */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link
                      to={`/product/${item.id}`}
                      className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      <Eye size={18} />
                      View Details
                    </Link>
                  </div>
                </div>
                
                {/* Item Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 line-clamp-1 hover:text-[#8B7355] transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice > item.price && (
                      <>
                        <span className="text-lg text-gray-400 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm font-bold text-red-600">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Color Options */}
                  <div className="flex gap-2 mb-6">
                    {item.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={`Color option ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isInStock}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                        item.isInStock
                          ? 'bg-[#8B7355] text-white hover:bg-[#A38B6D]'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      {item.isInStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Recommendations */}
        {wishlistItems.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
              <Link 
                to="/products" 
                className="text-[#8B7355] hover:underline font-medium flex items-center gap-2"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 7,
                  name: 'Lounge Chair',
                  price: 2800,
                  image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 8,
                  name: 'Coffee Table',
                  price: 1200,
                  image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 9,
                  name: 'Bookshelf',
                  price: 1800,
                  image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 10,
                  name: 'Floor Lamp',
                  price: 600,
                  image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
                }
              ].map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
                    <button
                      onClick={() => {
                        const item = {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                          description: product.name
                        };
                        handleAddToCart(item);
                      }}
                      className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;