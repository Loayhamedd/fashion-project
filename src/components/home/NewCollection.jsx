import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Star, Heart, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { addToCartSync } from "../../features/cart/cartSlice";
import toast from 'react-hot-toast';
import ImgChar from "../../assets/new collection section/char1.png";
import ImgSofa from "../../assets/new collection section/sofa.png";
import ImgChar2 from "../../assets/new collection section/char2.png";

const NewCollection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('newCollectionFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const allProducts = [
    {
      id: 1,
      name: "Nordic Chair",
      price: 2500,
      originalPrice: 3000,
      image: ImgChar,
      rating: 4.5,
      reviews: 24,
      description: "Modern Nordic design with oak wood",
      category: "Chairs",
      discount: 14,
      isNew: true,
      material: "Oak Wood",
      type: "Drop type",
      colors: ["#8B7355", "#2C3E50", "#BDC3C7", "#E74C3C", "#3498DB"]
    },
    {
      id: 2,
      name: "Modern Sofa",
      price: 2600,
      originalPrice: 3000,
      image: ImgSofa,
      rating: 4.8,
      reviews: 31,
      description: "3-seater sofa with velvet fabric",
      category: "Sofas",
      discount: 13,
      isNew: false,
      material: "Velvet",
      type: "Sofa type",
      colors: ["#8B7355", "#34495E", "#7F8C8D", "#E74C3C", "#3498DB"]
    },
    {
      id: 3,
      name: "Nordic Chair Premium",
      price: 3200,
      originalPrice: 3800,
      image: ImgChar2,
      rating: 4.7,
      reviews: 22,
      description: "Premium Nordic design with solid oak wood",
      category: "Chairs",
      discount: 16,
      isNew: true,
      material: "Solid Oak",
      type: "Premium type",
      colors: ["#8B7355", "#16A085", "#95A5A6", "#E74C3C", "#3498DB"]
    },
    {
      id: 4,
      name: "Minimalist Bed",
      price: 5800,
      originalPrice: 6500,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      reviews: 18,
      description: "King size bed with storage",
      category: "Beds",
      discount: 11,
      isNew: false,
      material: "Wood & Fabric",
      type: "Bed type",
      colors: ["#8B7355", "#7D3C98", "#F39C12", "#E74C3C", "#3498DB"]
    },
    {
      id: 5,
      name: "Office Desk",
      price: 2800,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4.4,
      reviews: 27,
      description: "Ergonomic office desk",
      category: "Office",
      discount: 12,
      isNew: true,
      material: "Engineered Wood",
      type: "Desk type",
      colors: ["#8B7355", "#27AE60", "#3498DB", "#E74C3C", "#F39C12"]
    }
  ];

  const getVisibleProducts = () => {
    const leftIndex = (currentIndex - 1 + allProducts.length) % allProducts.length;
    const rightIndex = (currentIndex + 1) % allProducts.length;
    
    return [
      allProducts[leftIndex],
      allProducts[currentIndex],
      allProducts[rightIndex]
    ];
  };

  const visibleProducts = getVisibleProducts();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length);
  };

  const goToProductPage = (product, e) => {
    if (e.target.closest('button')) {
      return;
    }
    
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      description: product.description,
      category: product.category,
      type: product.type
    };
    
    dispatch(addToCartSync(cartItem));
    
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: "top-right",
      style: {
        background: '#10B981',
        color: 'white',
        fontSize: '14px',
        borderRadius: '10px',
        padding: '16px',
      },
      icon: '🛒',
    });
  };

  const handleAddToWishlist = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const productId = product.id;
    let updatedFavorites;
    
    if (favorites.includes(productId)) {
      updatedFavorites = favorites.filter(id => id !== productId);
      setFavorites(updatedFavorites);
      localStorage.setItem('newCollectionFavorites', JSON.stringify(updatedFavorites));
      
      toast(`${product.name} removed from wishlist!`, {
        duration: 3000,
        position: "top-right",
        style: {
          background: '#6B7280',
          color: 'white',
          fontSize: '14px',
          borderRadius: '10px',
          padding: '16px',
        },
        icon: '💔',
      });
    } else {
      updatedFavorites = [...favorites, productId];
      setFavorites(updatedFavorites);
      localStorage.setItem('newCollectionFavorites', JSON.stringify(updatedFavorites));
      
      toast(`${product.name} added to wishlist!`, {
        duration: 3000,
        position: "top-right",
        style: {
          background: '#EC4899',
          color: 'white',
          fontSize: '14px',
          borderRadius: '10px',
          padding: '16px',
        },
        icon: '❤️',
      });
    }
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white" dir="ltr">
      <div className="max-w-6xl mx-auto">
        

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#8B7355]/10 text-[#8B7355] px-4 py-2 rounded-full text-sm font-semibold mb-2">
            <Zap size={16} />
            New Arrivals
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our New Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest furniture designs
          </p>
        </div>


        <div className="relative">

          <button
            onClick={prevSlide}
            className="absolute -left-4 lg:-left-18 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 group"
            aria-label="Previous products"
          >
            <ChevronLeft size={36} className="text-gray-600 group-hover:text-[#8B7355]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute -right-4 lg:-right-18 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 group"
            aria-label="Next products"
          >
            <ChevronRight size={36} className="text-gray-600 group-hover:text-[#8B7355]" />
          </button>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 px-2">
            {visibleProducts.map((product, index) => (
              <div 
                key={product.id}
                onClick={(e) => goToProductPage(product, e)}
                className={`
                  relative bg-white rounded-xl shadow-md overflow-visible 
                  border border-gray-100 transition-all duration-300 cursor-pointer
                  ${index === 1 
                    ? 'md:scale-105 md:-translate-y-2 z-10' 
                    : 'opacity-90 md:opacity-95'
                  }
                  hover:shadow-lg hover:border-gray-200 hover:scale-[1.02] group
                  pb-6  /* مساحة إضافية للزر العائم */
                `}
              >

                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  

                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.discount && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{product.discount}%
                      </div>
                    )}
                    {product.isNew && (
                      <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        NEW
                      </div>
                    )}
                  </div>
                  

                  <button
                    onClick={(e) => handleAddToWishlist(product, e)}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors group/heart z-20"
                    title={isFavorite(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart 
                      size={16} 
                      className={`
                        ${isFavorite(product.id) 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-600 group-hover/heart:text-red-500 group-hover/heart:fill-red-500/50'
                        }
                      `} 
                    />
                  </button>
                  

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-300 flex items-center justify-center 
                               pointer-events-none">
                    <span className="text-white font-semibold text-sm bg-black/70 px-3 py-1.5 rounded-full">
                      Click to view details
                    </span>
                  </div>
                </div>


                <div className="p-4">

                  <div className="mb-2">
                    <span className="text-xs text-gray-500 font-medium">
                      {product.category}
                    </span>
                  </div>
                  

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#8B7355] transition-colors">
                    {product.name}
                  </h3>
                  

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  

                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs">
                      ({product.reviews} reviews)
                    </span>
                  </div>


                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-800">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm ml-2">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    

                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.material}
                    </span>
                  </div>
                </div>


                {index === 1 && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="
                        floating-add-btn
                        w-14 h-14 
                        bg-black 
                        text-white 
                        rounded-full 
                        flex items-center justify-center 
                        shadow-2xl hover:shadow-3xl 
                        hover:scale-110 
                        active:scale-95
                        transition-all duration-300
                        border-4 border-white
                        focus:outline-none focus:ring-4 focus:ring-black/30 focus:ring-offset-2
                        z-30
                        group/cart-btn
                      "
                      title="Add to cart"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Plus size={28} className="font-bold group-hover/cart-btn:scale-110 transition-transform" />
                    </button>
                    

                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 
                                 bg-black text-white text-xs px-2 py-1 rounded 
                                 opacity-0 group-hover/cart-btn:opacity-100 
                                 transition-opacity duration-300 whitespace-nowrap 
                                 pointer-events-none">
                      Add to Cart
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                                   w-2 h-2 bg-black rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>


          <div className="flex justify-center mt-12 gap-1.5">
            {allProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${currentIndex === index 
                    ? 'bg-[#8B7355] w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>


        <div className="text-center mt-6">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors group/link"
          >
            See More 
            <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
          

          <div className="mt-4 text-sm text-gray-500">
            <p>💡 <span className="font-medium">Tip:</span> Click on any product to view details</p>
          </div>
        </div>
      </div>


      <style jsx>{`
        .floating-add-btn {
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 4px 6px -1px rgba(0, 0, 0, 0.2),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .floating-add-btn:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset,
            0 10px 15px -3px rgba(0, 0, 0, 0.3),
            0 4px 6px -2px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px) scale(1.1);
        }
        
        .floating-add-btn:active {
          transform: translateY(0) scale(0.95);
          box-shadow: 
            0 5px 15px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }
      `}</style>
    </section>
  );
};

export default NewCollection;