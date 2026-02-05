import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, ChevronDown, X, Filter } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCartSync } from '../../features/cart/cartSlice';
import toast from 'react-hot-toast';

const AllChairsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    type: [],
    color: [],
    priceRange: { min: 0, max: 5000 },
    material: []
  });

  const filterOptions = {
    type: ["Office", "Dining", "Accent", "Recliner", "Rocking", "Armchair"],
    color: ["#8B7355", "#2C3E50", "#E74C3C", "#3498DB", "#27AE60", "#F1C40F", "#9B59B6", "#34495E"],
    material: ["Wood", "Leather", "Fabric", "Metal", "Plastic", "Velvet"],
    priceRange: { min: 0, max: 5000 }
  };

  const allProducts = [
    {
      id: 1,
      name: "Nordic Office Chair",
      price: 3000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#2C3E50", "#BDC3C7"],
      material: "Wood",
      type: "Office",
      rating: 4.5,
      discount: 15,
      tags: ["wood", "office"]
    },
    {
      id: 2,
      name: "Leather Armchair",
      price: 2600,
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#2C3E50", "#34495E", "#7F8C8D"],
      material: "Leather",
      type: "Armchair",
      rating: 4.3,
      discount: 10,
      tags: ["leather", "living-room"]
    },
    {
      id: 3,
      name: "Fabric Recliner Chair",
      price: 3200,
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#16A085", "#95A5A6"],
      material: "Fabric",
      type: "Recliner",
      rating: 4.7,
      discount: 20,
      tags: ["fabric", "recliner"]
    },
    {
      id: 4,
      name: "Modern Dining Chair",
      price: 1800,
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#E74C3C", "#F1C40F", "#9B59B6"],
      material: "Wood",
      type: "Dining",
      rating: 4.2,
      discount: 5,
      tags: ["wood", "dining"]
    },
    {
      id: 5,
      name: "Metal Accent Chair",
      price: 1200,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#27AE60", "#3498DB"],
      material: "Metal",
      type: "Accent",
      rating: 4.0,
      discount: 0,
      tags: ["metal", "accent"]
    },
    {
      id: 6,
      name: "Wooden Rocking Chair",
      price: 2200,
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#E67E22", "#1ABC9C"],
      material: "Wood",
      type: "Rocking",
      rating: 4.4,
      discount: 12,
      tags: ["wood", "rocking"]
    },
    {
      id: 7,
      name: "Velvet Armchair",
      price: 2800,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#C0392B", "#2980B9"],
      material: "Velvet",
      type: "Armchair",
      rating: 4.6,
      discount: 15,
      tags: ["velvet", "armchair"]
    },
    {
      id: 8,
      name: "Executive Office Chair",
      price: 4500,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#2C3E50", "#34495E", "#7F8C8D"],
      material: "Leather",
      type: "Office",
      rating: 4.8,
      discount: 25,
      tags: ["leather", "office"]
    },
    {
      id: 9,
      name: "Plastic Dining Chair",
      price: 650,
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#3498DB", "#27AE60", "#F1C40F"],
      material: "Plastic",
      type: "Dining",
      rating: 3.8,
      discount: 0,
      tags: ["plastic", "dining"]
    },
    {
      id: 10,
      name: "Modern Accent Chair",
      price: 1900,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#9B59B6", "#E74C3C", "#F1C40F"],
      material: "Fabric",
      type: "Accent",
      rating: 4.3,
      discount: 8,
      tags: ["fabric", "accent"]
    },
    {
      id: 11,
      name: "Classic Wooden Chair",
      price: 2400,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#D35400", "#2ECC71"],
      material: "Wood",
      type: "Dining",
      rating: 4.5,
      discount: 10,
      tags: ["wood", "classic"]
    },
    {
      id: 12,
      name: "Lounge Armchair",
      price: 3500,
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#34495E", "#2C3E50", "#7F8C8D"],
      material: "Leather",
      type: "Armchair",
      rating: 4.7,
      discount: 18,
      tags: ["leather", "lounge"]
    }
  ];

  const applyFilters = () => {
    return allProducts.filter(product => {
      
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        if (!product.name.toLowerCase().includes(query) && 
            !product.material.toLowerCase().includes(query) && 
            !product.type.toLowerCase().includes(query)) {
          return false;
        }
      }

      if (filters.type.length > 0 && !filters.type.includes(product.type)) {
        return false;
      }

      if (filters.material.length > 0 && !filters.material.includes(product.material)) {
        return false;
      }

      if (filters.color.length > 0) {
        const hasMatchingColor = filters.color.some(color => 
          product.colors.includes(color)
        );
        if (!hasMatchingColor) return false;
      }

      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      return true;
    });
  };

  const filteredProducts = applyFilters();

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'priceRange') {
        return { ...prev, priceRange: value };
      }
      
      const currentValues = prev[filterType];
      if (currentValues.includes(value)) {
        return { 
          ...prev, 
          [filterType]: currentValues.filter(item => item !== value) 
        };
      } else {
        return { 
          ...prev, 
          [filterType]: [...currentValues, value] 
        };
      }
    });
    setCurrentPage(1);
  };

  const clearFilter = (filterType, value = null) => {
    if (value === null) {
      setFilters(prev => ({ ...prev, [filterType]: [] }));
    } else {
      handleFilterChange(filterType, value);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      type: [],
      color: [],
      priceRange: { min: 0, max: 5000 },
      material: []
    });
    setSearchQuery("");
    setCurrentPage(1);
    
    toast.success("All filters have been cleared!", {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: 'white',
        borderRadius: '10px',
        borderLeft: '4px solid #059669',
      },
    });
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      product: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      description: `${product.material} ${product.name}`,
      category: "Chairs"
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

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  const activeFilterCount = Object.values(filters).reduce((count, filter) => {
    if (Array.isArray(filter)) {
      return count + filter.length;
    }
    return count;
  }, 0) + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">

      <div className="px-4 sm:px-8 lg:px-30 py-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Chairs</h1>
          <p className="text-lg text-red-600">Discount 50% for the first purchase</p>
        </div>

        <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chairs by name, material, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-gray-800 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="mb-8">

          {activeFilterCount > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Filter size={16} />
                Active filters ({activeFilterCount}):
              </span>
              
              {searchQuery && (
                <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full flex items-center gap-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-gray-300">
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {filters.type.map(type => (
                <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1">
                  Type: {type}
                  <button onClick={() => clearFilter('type', type)} className="ml-1 hover:text-blue-600">
                    <X size={14} />
                  </button>
                </span>
              ))}
              
              {filters.material.map(material => (
                <span key={material} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center gap-1">
                  Material: {material}
                  <button onClick={() => clearFilter('material', material)} className="ml-1 hover:text-green-600">
                    <X size={14} />
                  </button>
                </span>
              ))}
              
              {filters.color.map(color => (
                <span key={color} className="px-3 py-1 text-white text-sm rounded-full flex items-center gap-1" style={{ backgroundColor: color }}>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <button onClick={() => clearFilter('color', color)} className="ml-1">
                    <X size={14} />
                  </button>
                </span>
              ))}
              
              {(filters.priceRange.min > 0 || filters.priceRange.max < 5000) && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center gap-1">
                  Price: ${filters.priceRange.min} - ${filters.priceRange.max}
                  <button onClick={() => clearFilter('priceRange')} className="ml-1 hover:text-purple-600">
                    <X size={14} />
                  </button>
                </span>
              )}
              
              <button
                onClick={clearAllFilters}
                className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full hover:bg-red-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-3 justify-center">
            {["Type", "Material", "Color", "Price"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(activeFilter === filter.toLowerCase() ? null : filter.toLowerCase())}
                className={`
                  flex items-center justify-between gap-3 px-6 py-3 rounded-full
                  transition-all duration-300 min-w-[140px]
                  ${activeFilter === filter.toLowerCase() 
                    ? 'bg-[#FBF8EF] border-2 border-gray-800 shadow-md' 
                    : 'bg-[#FBF8EF] hover:bg-[#F5F2E9] border-2 border-gray-300'
                  }
                `}
              >
                <span className={`
                  text-base font-semibold whitespace-nowrap
                  ${activeFilter === filter.toLowerCase() 
                    ? 'text-gray-900' 
                    : 'text-gray-700'
                  }
                `}>
                  {filter}
                  {filter.toLowerCase() === 'type' && filters.type.length > 0 && (
                    <span className="ml-1 text-xs bg-gray-800 text-white px-2 py-0.5 rounded-full">
                      {filters.type.length}
                    </span>
                  )}
                  {filter.toLowerCase() === 'material' && filters.material.length > 0 && (
                    <span className="ml-1 text-xs bg-gray-800 text-white px-2 py-0.5 rounded-full">
                      {filters.material.length}
                    </span>
                  )}
                  {filter.toLowerCase() === 'color' && filters.color.length > 0 && (
                    <span className="ml-1 text-xs bg-gray-800 text-white px-2 py-0.5 rounded-full">
                      {filters.color.length}
                    </span>
                  )}
                </span>
                
                <ChevronDown 
                  size={20} 
                  className={`
                    flex-shrink-0 transition-transform duration-300
                    ${activeFilter === filter.toLowerCase() 
                      ? 'text-gray-900 rotate-180' 
                      : 'text-gray-600'
                    }
                  `}
                />
              </button>
            ))}
          </div>

          <div className="mt-4">
            {activeFilter === 'type' && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Chair Types</h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.type.map(type => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange('type', type)}
                      className={`
                        px-3 py-2 rounded-lg text-sm transition-colors
                        ${filters.type.includes(type)
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeFilter === 'material' && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.material.map(material => (
                    <button
                      key={material}
                      onClick={() => handleFilterChange('material', material)}
                      className={`
                        px-3 py-2 rounded-lg text-sm transition-colors
                        ${filters.material.includes(material)
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }
                      `}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeFilter === 'color' && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {filterOptions.color.map(color => (
                    <button
                      key={color}
                      onClick={() => handleFilterChange('color', color)}
                      className={`
                        w-10 h-10 rounded-full border-3 transition-transform
                        ${filters.color.includes(color)
                          ? 'border-gray-800 scale-110 shadow-lg'
                          : 'border-white hover:border-gray-300 hover:scale-105'
                        }
                      `}
                      style={{ backgroundColor: color }}
                      title={`Color: ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeFilter === 'price' && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Min: ${filters.priceRange.min}</span>
                    <span>Max: ${filters.priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', { 
                      ...filters.priceRange, 
                      max: parseInt(e.target.value) 
                    })}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-800"
                  />
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                      <input
                        type="number"
                        value={filters.priceRange.min}
                        onChange={(e) => handleFilterChange('priceRange', { 
                          ...filters.priceRange, 
                          min: Math.min(parseInt(e.target.value) || 0, filters.priceRange.max) 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                      <input
                        type="number"
                        value={filters.priceRange.max}
                        onChange={(e) => handleFilterChange('priceRange', { 
                          ...filters.priceRange, 
                          max: Math.max(parseInt(e.target.value) || 5000, filters.priceRange.min) 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-bold">{currentProducts.length}</span> of{" "}
            <span className="font-bold">{filteredProducts.length}</span> chairs
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🪑</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No chairs found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>

            <div className="space-y-12 mb-12">
              {[0, 3, 6].map((startIndex) => (
                <div key={startIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentProducts.slice(startIndex, startIndex + 3).map((product) => (
                    <Link 
                      to={`/product/${product.id}`} 
                      key={product.id}
                      className="block group"
                    >
                      <div className="bg-gray-100 rounded-4xl overflow-hidden p-8 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">

                        <div className="relative mb-2">

                          <div className="h-58 overflow-hidden rounded-3xl">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          
                          {product.discount > 0 && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              -{product.discount}%
                            </div>
                          )}
                          
                          <button 
                            className="
                              absolute 
                              top-4
                              right-4
                              bg-white 
                              p-3 
                              rounded-full 
                              shadow-xl 
                              hover:bg-red-50 
                              transition-all duration-300
                              border-2 border-gray-300
                              hover:border-red-300
                              hover:shadow-2xl
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
                          

                          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                            <span className="text-yellow-400">★</span>
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        

                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold text-gray-800 text-center group-hover:text-[#8B7355] transition-colors">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ${product.price}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-sm text-gray-400 line-through">
                                ${Math.round(product.price * 100 / (100 - product.discount))}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-center text-sm text-gray-600">
                            <span className="bg-gray-200 px-2 py-1 rounded-full mr-2">
                              {product.type}
                            </span>
                            <span className="bg-gray-200 px-2 py-1 rounded-full">
                              {product.material}
                            </span>
                          </div>


                          <div className="flex items-center justify-between mt-4">

                            <button 
                              onClick={(e) => handleAddToCart(product, e)}
                              className="bg-white hover:bg-gray-800 hover:text-white text-black px-4 py-4 rounded-4xl font-semibold transition-all duration-300 flex items-center gap-3 text-sm w-40 justify-center border-2 border-gray-300 hover:border-gray-800"
                            >
                              <ShoppingCart size={19} />
                              Add To Cart
                            </button>

                            <div className="flex gap-2">
                              {product.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="group/color relative"
                                  title={`Color ${index + 1}`}
                                >
                                  <div
                                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm transition-all duration-300 group-hover/color:scale-125 group-hover/color:shadow-lg cursor-pointer"
                                    style={{ backgroundColor: color }}
                                  />
                                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                    Color {index + 1}
                                  </span>
                                </div>
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

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`
                      w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300
                      ${currentPage === index + 1
                        ? 'bg-gray-800 text-white shadow-md'
                        : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
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
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllChairsPage;