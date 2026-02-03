// src/pages/Products/ProductsPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCartSync } from '../../features/cart/cartSlice';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [priceRange, setPriceRange] = useState({ min: 250, max: 725 });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const dispatch = useDispatch();
  
  // مجموعة من الصور للتبديل
  const heroImages = [
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  ];

  // تغيير الصورة تلقائياً كل 5 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5000 مللي ثانية = 5 ثواني
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // تغيير الصورة يدوياً
  const nextImage = () => {
    setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // بيانات المنتجات - 9 منتجات
  const products = [
    // الصف الأول
    {
      id: 1,
      name: "Nordic Chair",
      price: "3000$",
      category: "CHAIR",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#2C3E50", "#BDC3C7"]
    },
    {
      id: 2,
      name: "Armchair Chair",
      price: "2600$",
      category: "CHAIR",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#34495E", "#7F8C8D"]
    },
    {
      id: 3,
      name: "Reckine Chair",
      price: "2600$",
      category: "CHAIR",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#16A085", "#95A5A6"]
    },
    // الصف الثاني
    {
      id: 4,
      name: "Nordic Chair",
      price: "250$",
      category: "LAMP",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#E74C3C", "#F1C40F", "#9B59B6"]
    },
    {
      id: 5,
      name: "Nordic Chair",
      price: "725$",
      category: "TAPLE",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#27AE60", "#3498DB"]
    },
    {
      id: 6,
      name: "Nordic Chair",
      price: "3000$",
      category: "CHAIR",
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#E67E22", "#1ABC9C"]
    },
    // الصف الثالث
    {
      id: 7,
      name: "Nordic Chair",
      price: "2600$",
      category: "Sofa",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#D35400", "#2ECC71"]
    },
    {
      id: 8,
      name: "Nordic Chair",
      price: "2600$",
      category: "CHAIR",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#C0392B", "#2980B9"]
    },
    {
      id: 9,
      name: "Modern Sofa",
      price: "3200$",
      category: "Sofa",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#7D3C98", "#F39C12"]
    },
  ];

  const categories = ["ALL", "CHAIR", "TAPLE", "Sofa", "LAMP"];
  const filters = [
    { id: "preOrder", label: "Pre Order" },
    { id: "almostGone", label: "Almost Gone" },
    { id: "topDiscount", label: "Top Discount" },
    { id: "forLivingRoom", label: "For LivingRoom" },
    { id: "forBedRoom", label: "For BedRoom" }
  ];

  // Pagination - 9 منتجات لكل صفحة
  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // معالجة إضافة إلى السلة
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      product: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('$', '')),
      image: product.image,
      quantity: 1,
      description: `${product.category} - ${product.name}`
    };
    
    dispatch(addToCartSync(cartItem));
    alert(`${product.name} added to cart!`);
  };

  const handleFilterChange = (filterId) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section under Navbar - صورة متغيرة */}
      <div className="relative h-56 md:h-64 lg:h-72 w-full overflow-hidden mb-6">
        <img
          src={heroImages[heroImageIndex]}
          alt="Furniture Collection"
          className="w-full h-full object-contain transition-opacity duration-500"
          key={heroImageIndex}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                heroImageIndex === index 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Collection</h1>
            <p className="text-base md:text-lg">Discover premium furniture for your home</p>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Filters */}
        <div className="w-80 flex-shrink-0 ml-2">
          <div className="bg-white p-4">
            {/* Search Bar */}
            <div className="mb-6 bg-[#EDEBEB]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-black mb-3">Categories</h3>
              <div className="space-y-1.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      w-full text-left px-3 py-2 rounded transition-colors text-sm
                      ${selectedCategory === category 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Shop By Price - تصميم فاخر */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-[black] mb-3">Shop By</h3>
              <div className="space-y-3 bg-[#EDEBEB] p-3 rounded-lg border border-gray-200">
                <div className="flex justify-between text-gray-900 text-xs font-medium">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-800 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                      placeholder="Min"
                    />
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-semibold text-black">Filter</h3>
                <Filter size={18} className="text-gray-600" />
              </div>
              <div className="space-y-2.5">
                {filters.map((filter) => (
                  <label key={filter.id} className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(filter.id)}
                        onChange={() => handleFilterChange(filter.id)}
                        className="sr-only peer"
                      />
                      <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center peer-checked:bg-gray-800 peer-checked:border-gray-800 transition-colors">
                        {selectedFilters.includes(filter.id) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-gray-700 text-sm group-hover:text-gray-900">{filter.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Products Grid */}
        <div className="flex-1 px-10">
          {/* Products Grid - 3 Rows */}
          <div className="space-y-8">
            {/* جميع الصفوف بنفس تصميم الصف الأول */}
            {[0, 3, 6].map((startIndex) => (
              <div key={startIndex} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {currentProducts.slice(startIndex, startIndex + 3).map((product) => (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id}
                    className="block"
                  >
                    <div className="bg-gray-100 rounded-4xl overflow-hidden p-6 hover:shadow-md transition-shadow">
                      {/* Product Image with Heart */}
                      <div className="relative mb-3">
                        {/* حاوية الصورة فقط */}
                        <div className="h-54 overflow-hidden rounded-3xl">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        {/* Heart Icon - خارج حاوية الصورة */}
                        <button 
                          className="
                            absolute 
                            top-0 
                            right-0 
                            z-50
                            transform 
                            translate-x-4 
                            -translate-y-4
                            bg-white 
                            p-3 
                            rounded-full 
                            shadow-2xl 
                            hover:bg-gray-50 
                            transition-all
                            border-2 border-gray-300
                            hover:shadow-3xl
                            hover:scale-110
                            active:scale-95
                            group
                          "
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // إضافة إلى المفضلة
                          }}
                        >
                          <Heart 
                            size={28} 
                            className="
                              text-gray-700 
                              group-hover:text-red-500 
                              group-hover:fill-red-500/20
                              transition-all 
                              duration-300
                            " 
                          />
                        </button>
                      </div>
                      {/* Product Info */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semi text-gray-800 text-center">
                          {product.name}
                        </h3>
                        
                        <div className="text-lg font-bold text-gray-800 text-center">
                          {product.price}
                        </div>

                        {/* Add to Cart Button and Color Options */}
                        <div className="flex items-center justify-between">
                          {/* Add to Cart Button - على اليسار */}
                          <button 
                            onClick={(e) => handleAddToCart(product, e)}
                            className="bg-white hover:bg-gray-300 text-black px-4 py-3 rounded-4xl font-semibold transition-colors flex items-center gap-4 text-sm w-40 justify-center"
                          >
                            <ShoppingCart size={18} />
                            Add To Cart
                          </button>

                          {/* Color Dots - على اليمين */}
                          <div className="flex gap-2">
                            {product.colors.map((color, index) => (
                              <button
                                key={index}
                                className="w-7 h-7 rounded-full border border-gray-300 shadow-xs"
                                style={{ backgroundColor: color }}
                                title={`Color ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Pagination - مع تباعد أكبر */}
          <div className="mt-10 mb-8 flex justify-end">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <ChevronLeft size={18} />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`
                    w-8 h-8 rounded text-sm font-medium transition-colors
                    ${currentPage === index + 1
                      ? 'bg-gray-800 text-white'
                      : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;