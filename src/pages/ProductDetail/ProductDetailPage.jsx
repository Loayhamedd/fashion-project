// src/pages/ProductDetail/ProductDetailPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCartSync } from '../../features/cart/cartSlice';

const ProductDetailPage = () => {
  const { id } = useParams(); // استقبال الـ ID من الرابط
  const [selectedColor, setSelectedColor] = useState("#8B7355");
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  // بيانات المنتج الرئيسي
  const mainProduct = {
    id: id || 1,
    name: "Orange Chair",
    type: "Drop type",
    description: "Fill out your data and select the required service and we will respond to you as soon as possible.",
    price: 2600, // تغيير من "2600$" إلى 2600
    rating: 4.5,
    colors: ["#8B7355", "#2C3E50", "#BDC3C7", "#E74C3C", "#3498DB"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  };

  // بيانات المنتجات المرتبطة
  const relatedProducts = [
    {
      id: 1,
      name: "Nordic Chair",
      price: "3000$",
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#2C3E50", "#BDC3C7"]
    },
    {
      id: 2,
      name: "Armchair Chair",
      price: "2600$",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#34495E", "#7F8C8D"]
    },
    {
      id: 3,
      name: "Reckline Chair",
      price: "2600$",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#16A085", "#95A5A6"]
    },
  ];

  // بيانات "You May Also Like"
  const alsoLikeProducts = [
    {
      id: 4,
      name: "Modern Sofa",
      price: "3200$",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#7D3C98", "#F39C12"]
    },
    {
      id: 5,
      name: "Lounge Chair",
      price: "2800$",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#E74C3C", "#F1C40F", "#9B59B6"]
    },
    {
      id: 6,
      name: "Office Chair",
      price: "2400$",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#27AE60", "#3498DB"]
    },
  ];

  // معالجة إضافة إلى السلة
  const handleAddToCart = () => {
    const cartItem = {
      product: mainProduct.id,
      name: mainProduct.name,
      price: mainProduct.price,
      image: mainProduct.image,
      quantity: 1,
      description: `${mainProduct.type} - ${mainProduct.name}`
    };
    
    dispatch(addToCartSync(cartItem));
    alert(`${mainProduct.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-12 py-8">
        {/* القسم الأول: تفاصيل المنتج - مقسم إلى قسمين */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
          {/* القسم الأيسر: صورة المنتج */}
          <div className="relative pr-0">
            <div className="h-[620px] w-[460px] overflow-hidden bg-gray-100">
              <img
                src={mainProduct.image}
                alt={mainProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* القسم الأيمن: تفاصيل المنتج */}
          <div className="space-y-4 mt-18 ml-[-250px] max-w-lg">
            {/* النوع واسم المنتج */}
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {mainProduct.type}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
                {mainProduct.name}
              </h1>
            </div>

            {/* الوصف */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {mainProduct.description}
            </p>

            {/* السعر */}
            <div className="mt-26">
              <span className="text-3xl font-bold text-gray-900 ">
                ${mainProduct.price}
              </span>
              <div className="flex items-center mt-2">
                {/* نجوم التقييم */}
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={30}
                    className={`
                      ${index < Math.floor(mainProduct.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : index < mainProduct.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                      }
                    `}
                  />
                ))}
                <span className="ml-2 text-gray-600">({mainProduct.rating})</span>
              </div>
            </div>

            {/* دوائر الألوان */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Select Color</h3>
              <div className="flex gap-3">
                {mainProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-12 h-12 rounded-full border-4 transition-all duration-300
                      ${selectedColor === color 
                        ? 'border-gray-800 scale-110' 
                        : 'border-white hover:border-gray-300'
                      }
                    `}
                    style={{ backgroundColor: color }}
                    title={`Color option ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* زر Add To Chart وزر المفضلة */}
            <div className="flex items-center gap-14 pt-6">
              {/* زر Add To Chart */}
              <button 
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-4 bg-[#FFFFFF] border-2 border-gray-300 hover:bg-gray-200 text-black px-12 py-6 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart size={26} />
                Add To Cart
              </button>

              {/* زر المفضلة */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`
                  p-6 rounded-full border-2 transition-all duration-300
                  ${isFavorite
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <Heart
                  size={34}
                  className={`
                    transition-all duration-300
                    ${isFavorite
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600 hover:text-red-500'
                    }
                  `}
                />
              </button>
            </div>
          </div>
        </div>

        {/* القسم الثاني: Related Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group relative">
                {/* دوائر الألوان في الأعلى على اليسار */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* صورة المنتج */}
                <div className="h-64 overflow-hidden rounded-2xl bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* اسم المنتج والسعر */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="text-lg font-bold text-gray-900">
                    {product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* القسم الثالث: You May Also Like */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alsoLikeProducts.map((product) => (
              <div key={product.id} className="group relative">
                {/* دوائر الألوان في الأعلى على اليسار */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* صورة المنتج */}
                <div className="h-64 overflow-hidden rounded-2xl bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* اسم المنتج والسعر */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="text-lg font-bold text-gray-900">
                    {product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;