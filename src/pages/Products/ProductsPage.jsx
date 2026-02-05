import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ShoppingCart, Heart, ChevronLeft, ChevronRight, Star, Shield, Truck, Tag, X } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCartSync } from '../../features/cart/cartSlice';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();
  
  const heroImages = [
    "src/assets/slider/one.jpg",
    "src/assets/slider/tow.png",
    "src/assets/slider/three.png",
    "src/assets/slider/four.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleNextImage = () => {
    setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrevImage = () => {
    setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const allProducts = [
    {
      id: 1,
      name: "Nordic Minimalist Chair",
      price: 1299,
      category: "CHAIR",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#2C3E50", "#BDC3C7"],
      rating: 4.8,
      description: "Scandinavian design with premium oak wood",
      isNew: true,
      discount: 15,
      tags: ["topDiscount", "forLivingRoom", "premium"]
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      price: 899,
      category: "CHAIR",
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#2C3E50", "#34495E", "#BDC3C7"],
      rating: 4.5,
      description: "Adjustable height with lumbar support",
      isNew: false,
      discount: 10,
      tags: ["forOffice", "ergonomic"]
    },
    {
      id: 3,
      name: "Modern Accent Chair",
      price: 749,
      category: "CHAIR",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#E74C3C", "#F1C40F", "#2C3E50"],
      rating: 4.3,
      description: "Velvet fabric with metal legs",
      isNew: true,
      discount: 20,
      tags: ["forLivingRoom", "accent"]
    },
    {
      id: 4,
      name: "Solid Oak Dining Table",
      price: 2499,
      category: "TABLE",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#D35400", "#27AE60"],
      rating: 4.9,
      description: "Extendable table for 6-8 persons",
      isNew: true,
      discount: 25,
      tags: ["topDiscount", "forDiningRoom", "solidWood"]
    },
    {
      id: 5,
      name: "Glass Coffee Table",
      price: 599,
      category: "TABLE",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#3498DB", "#2C3E50", "#BDC3C7"],
      rating: 4.4,
      description: "Tempered glass with chrome frame",
      isNew: false,
      discount: 12,
      tags: ["forLivingRoom", "modern"]
    },
    {
      id: 6,
      name: "Wooden Console Table",
      price: 399,
      category: "TABLE",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#27AE60", "#F39C12"],
      rating: 4.6,
      description: "Entryway table with drawer storage",
      isNew: true,
      discount: 18,
      tags: ["forEntryway", "storage"]
    },
    {
      id: 7,
      name: "Leather Sectional Sofa",
      price: 4599,
      category: "SOFA",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#2C3E50", "#34495E"],
      rating: 4.9,
      description: "Premium Italian leather, L-shaped design",
      isNew: true,
      discount: 30,
      tags: ["topDiscount", "forLivingRoom", "premium", "almostGone"]
    },
    {
      id: 8,
      name: "Modern Fabric Sofa",
      price: 1999,
      category: "SOFA",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#E74C3C", "#9B59B6", "#F1C40F"],
      rating: 4.7,
      description: "3-seater with removable covers",
      isNew: false,
      discount: 15,
      tags: ["forLivingRoom", "washable"]
    },
    {
      id: 9,
      name: "Convertible Sleeper Sofa",
      price: 1599,
      category: "SOFA",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#3498DB", "#2C3E50", "#BDC3C7"],
      rating: 4.5,
      description: "Transforms into full-size bed",
      isNew: true,
      discount: 22,
      tags: ["forGuestRoom", "multiPurpose", "preOrder"]
    }
  ];

  const categories = ["ALL", "CHAIR", "TABLE", "SOFA"];
  const filters = [
    { id: "preOrder", label: "Pre Order" },
    { id: "almostGone", label: "Almost Gone" },
    { id: "topDiscount", label: "Top Discount" },
    { id: "forLivingRoom", label: "For Living Room" },
    { id: "forDiningRoom", label: "For Dining Room" },
    { id: "forOffice", label: "For Office" },
    { id: "premium", label: "Premium Quality" },
    { id: "ergonomic", label: "Ergonomic" }
  ];

  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== "ALL" && product.category !== selectedCategory) {
      return false;
    }
    
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    
    if (selectedFilters.length > 0) {
      const hasMatchingTag = selectedFilters.some(filter => 
        product.tags.includes(filter)
      );
      if (!hasMatchingTag) return false;
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const rows = [];
  for (let i = 0; i < currentProducts.length; i += 3) {
    rows.push(currentProducts.slice(i, i + 3));
  }

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      product: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      description: product.description,
      category: product.category
    };
    
    dispatch(addToCartSync(cartItem));
    
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right',
      icon: '🛒',
      style: {
        background: '#10B981',
        color: 'white',
        borderRadius: '10px',
        borderLeft: '4px solid #059669',
      },
    });
  };

  const handleAddToWishlist = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast(`${product.name} added to wishlist!`, {
      duration: 3000,
      position: 'top-right',
      icon: '❤️',
      style: {
        background: '#8B7355',
        color: 'white',
        borderRadius: '10px',
        borderLeft: '4px solid #6B5A45',
      },
    });
  };

  const handleFilterChange = (filterId) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
    setCurrentPage(1);
  };

  const removeFilter = (filterId) => {
    setSelectedFilters(prev => prev.filter(id => id !== filterId));
  };

  const clearAllFilters = () => {
    setSelectedCategory("ALL");
    setPriceRange({ min: 0, max: 10000 });
    setSelectedFilters([]);
    setSearchQuery("");
    setCurrentPage(1);
    
    toast.success("All filters have been cleared!", {
      duration: 2000,
      position: 'top-right',
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, selectedFilters, searchQuery]);

  const FilterButton = () => (
    <button
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="lg:hidden fixed bottom-6 right-6 z-50 bg-gray-800 text-white p-4 rounded-full shadow-2xl hover:bg-gray-700 transition-colors"
    >
      <Filter size={24} />
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-80 md:h-96 lg:h-[500px] w-full overflow-hidden mb-6 bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={heroImages[heroImageIndex]}
            alt="Furniture Collection"
            className="w-full h-full object-cover transition-opacity duration-700"
            key={heroImageIndex}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
        

        
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 border-3 border-[#755a3a] rounded-full shadow-2xl transition-all hover:scale-110 hover:shadow-3xl group"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="text-[#755a3a] group-hover:text-black transition-colors" />
        </button>
        
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 border-3 border-[#755a3a] rounded-full shadow-2xl transition-all hover:scale-110 hover:shadow-3xl group"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="text-[#755a3a] group-hover:text-black transition-colors" />
        </button>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`
                w-5 h-5 border-4 border-[#755a3a] rounded-full transition-all duration-300 transform hover:scale-125
                ${heroImageIndex === index 
                  ? 'bg-white w-8 shadow-lg' 
                  : 'bg-white/60 hover:bg-white/80'
                }
              `}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <FilterButton />

        <div className={`
          ${isFilterOpen ? 'block' : 'hidden'} 
          lg:block lg:w-80 flex-shrink-0 lg:ml-2 p-4 lg:p-0
          lg:sticky lg:top-4 lg:self-start
        `}>
          <div className="bg-white lg:bg-transparent p-4 lg:p-0">
            {isFilterOpen && (
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
            )}

            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm bg-white"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {searchQuery && (
                <div className="mt-2 text-xs text-gray-600 flex justify-between">
                  <span>{filteredProducts.length} products found</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {(selectedFilters.length > 0 || selectedCategory !== "ALL" || searchQuery || priceRange.min > 0 || priceRange.max < 10000) && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Active Filters</span>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== "ALL" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory("ALL")} className="hover:text-gray-900">
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedFilters.map(filterId => {
                    const filter = filters.find(f => f.id === filterId);
                    return (
                      <span key={filterId} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {filter?.label}
                        <button onClick={() => removeFilter(filterId)} className="hover:text-blue-900">
                          <X size={12} />
                        </button>
                      </span>
                    );
                  })}
                  {(priceRange.min > 0 || priceRange.max < 10000) && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Price: ${priceRange.min} - ${priceRange.max}
                      <button onClick={() => setPriceRange({ min: 0, max: 10000 })} className="hover:text-green-900">
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200
                      flex justify-between items-center group hover:shadow-md
                      ${selectedCategory === category 
                        ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                      }
                    `}
                  >
                    <span className="font-medium">{category}</span>
                    <span className={`
                      px-2 py-1 rounded text-xs font-medium transition-all duration-200
                      ${selectedCategory === category
                        ? 'bg-white/30 text-white'
                        : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                      }
                    `}>
                      {allProducts.filter(p => category === "ALL" ? true : p.category === category).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-gray-700 text-sm font-medium">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
                <div className="relative pt-1">
                  <div className="flex">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="50"
                      value={priceRange.min}
                      onChange={(e) => {
                        const minVal = parseInt(e.target.value);
                        setPriceRange({ 
                          min: Math.min(minVal, priceRange.max), 
                          max: priceRange.max 
                        });
                      }}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-700"
                    />
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="50"
                      value={priceRange.max}
                      onChange={(e) => {
                        const maxVal = parseInt(e.target.value);
                        setPriceRange({ 
                          min: priceRange.min, 
                          max: Math.max(maxVal, priceRange.min) 
                        });
                      }}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-700"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">Min</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ 
                          ...priceRange, 
                          min: Math.min(parseInt(e.target.value) || 0, priceRange.max) 
                        })}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">Max</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ 
                          ...priceRange, 
                          max: Math.max(parseInt(e.target.value) || 5000, priceRange.min) 
                        })}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                  {filteredProducts.length} products in range
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Filter size={18} className="text-gray-600" />
              </div>
              <div className="space-y-3">
                {filters.map((filter) => {
                  const count = allProducts.filter(p => p.tags.includes(filter.id)).length;
                  return (
                    <label key={filter.id} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(filter.id)}
                          onChange={() => handleFilterChange(filter.id)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center peer-checked:bg-gray-900 peer-checked:border-gray-900 transition-all duration-200 group-hover:border-gray-400">
                          {selectedFilters.includes(filter.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-gray-700 text-sm group-hover:text-gray-900 flex-1">
                        {filter.label}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded transition-colors group-hover:bg-gray-200">
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
              
              {(selectedCategory !== "ALL" || selectedFilters.length > 0 || priceRange.min > 0 || priceRange.max < 10000 || searchQuery) && (
                <button
                  onClick={clearAllFilters}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>


        <div className="flex-1 px-4 lg:px-10 py-4 lg:py-0">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "ALL" ? "All Products" : `${selectedCategory} Products`}
              </h2>
              <p className="text-gray-600">
                Showing {currentProducts.length} of {filteredProducts.length} products
                {selectedFilters.length > 0 && ` • ${selectedFilters.length} filters applied`}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {selectedFilters.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {selectedFilters.map(filterId => {
                    const filter = filters.find(f => f.id === filterId);
                    return (
                      <span key={filterId} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center gap-1 hover:bg-gray-200 transition-colors">
                        <Tag size={12} />
                        {filter?.label}
                        <button 
                          onClick={() => removeFilter(filterId)}
                          className="ml-1 hover:text-gray-900"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              
              <div className="hidden sm:block">
                <select className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white hover:bg-gray-50 transition-colors">
                  <option>Sort by: Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                  <option>Best Rated</option>
                </select>
              </div>
            </div>
          </div>

          {currentProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-300 text-6xl mb-4">🛋️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-lg transition-all duration-300 font-medium shadow hover:shadow-md"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-10 mb-10">
                {rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {row.map((product) => (
                      <Link 
                        to={`/product/${product.id}`} 
                        key={product.id}
                        className="block group"
                      >
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden p-5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                          <div className="relative mb-4">
                            <div className="h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-100">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                            
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {product.isNew && (
                                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                  NEW
                                </div>
                              )}
                              {product.discount > 0 && (
                                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                  -{product.discount}% OFF
                                </div>
                              )}
                            </div>
                            
                            <button 
                              className="
                                absolute 
                                top-4
                                right-4
                                bg-gradient-to-br from-white to-gray-50 
                                p-3.5 
                                rounded-full 
                                shadow-2xl 
                                hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 
                                transition-all duration-300
                                border-2 border-gray-200
                                hover:border-red-300
                                hover:shadow-3xl
                                hover:scale-110
                                active:scale-95
                                group/heart
                              "
                              onClick={(e) => handleAddToWishlist(product, e)}
                            >
                              <Heart 
                                size={24} 
                                className="
                                  text-gray-700 
                                  group-hover/heart:text-red-500 
                                  group-hover/heart:fill-red-500/30
                                  transition-all 
                                  duration-300
                                " 
                              />
                            </button>
                            
                            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black/90 to-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm shadow-lg">
                              <Star size={14} className="fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{product.rating}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                {product.category}
                              </span>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#8B7355] transition-colors line-clamp-1">
                                {product.name}
                              </h3>
                            </div>
                            
                            <p className="text-gray-600 text-sm line-clamp-2 h-10">
                              {product.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-gray-900">
                                  ${product.price}
                                </span>
                                {product.discount > 0 && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ${Math.round(product.price * 100 / (100 - product.discount))}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex gap-1.5">
                                {product.colors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm transition-all duration-300 hover:scale-125 hover:shadow-lg"
                                    style={{ backgroundColor: color }}
                                    title={`Color option ${index + 1}`}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <button 
                              onClick={(e) => handleAddToCart(product, e)}
                              className="w-full mt-4 py-3 bg-gradient-to-r from-white to-gray-50 hover:from-gray-900 hover:to-gray-800 hover:text-white text-gray-900 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-900 group/cart"
                            >
                              <ShoppingCart size={18} className="group-hover/cart:scale-110 transition-transform" />
                              <span>Add To Cart</span>
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {filteredProducts.length > 9 && (
                <div className="mt-12 mb-8 flex justify-center">
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-lg border border-gray-200">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-3 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                    
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`
                            w-12 h-12 rounded-lg text-sm font-medium transition-all duration-300
                            flex items-center justify-center
                            ${currentPage === index + 1
                              ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg transform scale-105'
                              : 'border border-gray-300 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                            }
                          `}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-3 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      <ChevronRight size={20} className="text-gray-700" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;