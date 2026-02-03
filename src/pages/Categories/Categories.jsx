// src/pages/AllChairs/AllChairsPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCartSync } from '../../features/cart/cartSlice';

const AllChairsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("Type");
  const dispatch = useDispatch();

  // بيانات المنتجات - جميعها كراسي كما في الصورة
  const products = [
    // الصف الأول
    {
      id: 1,
      name: "Nordic Chair",
      price: "3000$",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#2C3E50", "#BDC3C7"],
      material: "Wood"
    },
    {
      id: 2,
      name: "Armchair Chair",
      price: "2600$",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#34495E", "#7F8C8D"],
      material: "Leather"
    },
    {
      id: 3,
      name: "Reckline Chair",
      price: "2600$",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#16A085", "#95A5A6"],
      material: "Fabric"
    },
    // الصف الثاني
    {
      id: 4,
      name: "Nordic Chair",
      price: "3000$",
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#E74C3C", "#F1C40F", "#9B59B6"],
      material: "Wood"
    },
    {
      id: 5,
      name: "Nordic Chair",
      price: "2600$",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#27AE60", "#3498DB"],
      material: "Metal"
    },
    {
      id: 6,
      name: "Nordic Chair",
      price: "2600$",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#E67E22", "#1ABC9C"],
      material: "Wood"
    },
    // الصف الثالث
    {
      id: 7,
      name: "Nordic Chain",
      price: "2600$",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#C0392B", "#2980B9"],
      material: "Fabric"
    },
    {
      id: 8,
      name: "Armchair Chair",
      price: "3000$",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#7D3C98", "#F39C12"],
      material: "Leather"
    },
    {
      id: 9,
      name: "Reckline Chair",
      price: "2600$",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#D35400", "#2ECC71"],
      material: "Fabric"
    },
  ];

  const filters = ["Type", "Color", "Price", "Material"];
  
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
      description: `${product.material} ${product.name}`
    };
    
    dispatch(addToCartSync(cartItem));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="px-30 py-8">
        {/* القسم الأول: العنوان والخصم */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Chair</h1>
          <p className="text-lg text-red-600">Discount 50% for the first buy</p>
        </div>

        {/* القسم الثاني: شريط الفلترة الأفقي - نفس التصميم ولكن أفقي */}
        <div className="flex mb-6">
          <div className="flex gap-4 bg-white p-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  flex items-center justify-between gap-4 px-17 py-4 rounded-full
                  transition-all duration-300 min-w-[120px]
                  ${activeFilter === filter 
                    ? 'bg-[#FBF8EF] border-2 border-gray-300' 
                    : 'bg-[#FBF8EF] hover:bg-[#F5F2E9]'
                  }
                `}
              >
                <span className={`
                  text-lg font-semibold whitespace-nowrap
                  ${activeFilter === filter 
                    ? 'text-gray-900' 
                    : 'text-[#6D6C6C]'
                  }
                `}>
                  {filter}
                </span>
                
                {/* سهم يشير للأسفل */}
                <ChevronDown 
                  size={24} 
                  className={`
                    flex-shrink-0 transition-transform duration-300
                    ${activeFilter === filter 
                      ? 'text-gray-900 rotate-180' 
                      : 'text-gray-600'
                    }
                  `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* القسم الثالث: 3 صفوف من الكروت (كل صف 3 كروت) */}
        <div className="space-y-12 mb-12">
          {[0, 3, 6].map((startIndex) => (
            <div key={startIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentProducts.slice(startIndex, startIndex + 3).map((product) => (
                <Link 
                  to={`/product/${product.id}`} 
                  key={product.id}
                  className="block"
                >
                  <div className="bg-gray-100 rounded-4xl overflow-hidden p-8 hover:shadow-xl transition-all duration-300">
                    {/* Product Image with Heart */}
                    <div className="relative mb-2">
                      {/* حاوية الصورة فقط */}
                      <div className="h-58 overflow-hidden rounded-3xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Heart Icon - خارج حاوية الصورة */}
                      <button 
                        className="
                          absolute 
                          top-[-12px]
                          right-[-12px]
                          z-10
                          bg-white 
                          p-3 
                          rounded-full 
                          shadow-xl 
                          hover:bg-gray-50 
                          transition-all
                          border-2 border-gray-300
                          hover:shadow-2xl
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
                          size={24} 
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
                      <h3 className="text-2xl font-semibold text-gray-800 text-center">
                        {product.name}
                      </h3>
                      
                      <div className="text-xl font-bold text-gray-900 text-center">
                        {product.price}
                      </div>

                      {/* Add to Cart Button and Color Options */}
                      <div className="flex items-center justify-between">
                        {/* Add to Cart Button - على اليسار */}
                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="bg-white hover:bg-gray-300 text-black px-4 py-4 rounded-4xl font-semibold transition-colors flex items-center gap-3 text-sm w-40 justify-center"
                        >
                          <ShoppingCart size={19} />
                          Add To Cart
                        </button>

                        {/* Color Dots - على اليمين */}
                        <div className="flex gap-2">
                          {product.colors.map((color, index) => (
                            <button
                              key={index}
                              className="w-7 h-7 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
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
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllChairsPage;