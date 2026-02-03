// src/pages/CartPage/CartPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { CreditCard, Truck, Store, CheckCircle, Sofa } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  removeFromCartSync, 
  updateCartItemQuantity,
  calculateCartTotals 
} from '../../features/cart/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // جلب عناصر السلة من Redux
  const { cartItems } = useSelector((state) => state.cart);
  
  // حساب الإجماليات
  const totals = calculateCartTotals(cartItems);
  
  // بيانات الفورم
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    region: '',
    email: '',
    phone: ''
  });

  // حالة طرق التسليم
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // ألوان الموقع
  const primaryColor = "#8B7355";
  const primaryLight = "#A38B6D";
  const backgroundColor = "#F9F7F4";
  const textColor = "#333333";
  const textLight = "#666666";

  // معالجة تغيير الكمية
  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item.product === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
    }
  };

  // حذف منتج من السلة
  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      dispatch(removeFromCartSync(productId));
    }
  };

  // معالجة تغيير الفورم
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // معالجة تقديم الطلب
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    // التحقق من الشروط
    if (!acceptTerms) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    
    // التحقق من أن السلة ليست فارغة
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // التحقق من تعبئة جميع الحقول
    const requiredFields = ['firstName', 'lastName', 'street', 'city', 'region', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    // هنا سيتم إرسال الطلب إلى الخادم
    console.log('Order submitted:', { 
      items: cartItems, 
      formData, 
      deliveryMethod, 
      paymentMethod,
      totals 
    });
    
    alert('Order submitted successfully!');
    navigate('/');
  };

  // إذا كانت السلة فارغة
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <Sofa size={48} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart and they will appear here.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center px-6 py-3 bg-[#8B7355] text-white rounded-lg font-medium hover:bg-[#A38B6D] transition-colors"
            >
              <Sofa size={20} className="mr-2" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* القسم الأيسر - تفاصيل المنتجات والتكلفة */}
          <div className="space-y-4">
            {/* عنوان القسم */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-bold mb-2" style={{ color: textColor }}>
                Ordering data ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </h2>
              <p className="text-sm" style={{ color: textLight }}>
                Review your items before checkout
              </p>
            </div>

            {/* قائمة المنتجات */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.product} 
                  className="bg-[#F5F4F4] rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start space-x-6">
                    {/* صورة المنتج */}
                    <div className="w-40 h-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={item.image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"} 
                        alt={item.name}
                        className="w-full h-full"
                      />
                    </div>
                    
                    {/* تفاصيل المنتج */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: textColor }}>
                            {item.name || "Product"}
                          </h3>
                          <p className="text-sm mt-2" style={{ color: textLight }}>
                            {item.description || "Furniture Item"}
                          </p>
                        </div>
                        
                        {/* سعر المنتج */}
                        <div className="text-right">
                          <p className="font-bold text-lg mt-2" style={{ color: primaryColor }}>
                            ${((item.price || 0) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm mt-2" style={{ color: textLight }}>
                            ${(item.price || 0).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      
                      {/* عناصر التحكم بالكمية */}
                      <div className="flex items-center justify-between mt-12">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleQuantityChange(item.product, -1)}
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                            style={{ color: textColor, border: '1px solid #E5E7EB' }}
                          >
                            <FaMinus size={16} />
                          </button>
                          
                          <div className="w-10 h-10 rounded-full  flex items-center justify-center font-bold"
                            style={{ backgroundColor: textColor, color: 'white' }}>
                            {item.quantity}
                          </div>
                          
                          <button
                            onClick={() => handleQuantityChange(item.product, 1)}
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                            style={{ color: textColor, border: '1px solid #E5E7EB' }}
                          >
                            <FaPlus size={16} />
                          </button>
                        </div>
                        
                        {/* زر الحذف */}
                        <button
                          onClick={() => handleRemoveItem(item.product)}
                          className="p-4 text-gray-500 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ملخص التكلفة */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4" style={{ color: textColor }}>
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span style={{ color: textLight }}>Items Price</span>
                  <span className="font-medium">${totals.itemsPrice}</span>
                </div>
                
                <div className="flex justify-between py-2 border-t">
                  <span style={{ color: textLight }}>Delivery Cost</span>
                  <span className="font-medium">${totals.shippingPrice}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span style={{ color: textLight }}>Tax (10%)</span>
                  <span className="font-medium">${totals.taxPrice}</span>
                </div>
                
                <div className="flex justify-between py-2 border-t pt-3">
                  <span className="font-bold text-lg" style={{ color: textColor }}>Total</span>
                  <span className="font-bold text-2xl" style={{ color: primaryColor }}>
                    ${totals.totalPrice}
                  </span>
                </div>
              </div>
              
              {/* زر الدفع */}
              <button
                onClick={handleSubmitOrder}
                disabled={!acceptTerms}
                className="w-full mt-6 py-3 px-4 rounded-lg font-bold text-white text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: primaryColor,
                  backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`
                }}
              >
                Pay Now
              </button>
              
              {/* الموافقة على الشروط */}
              <div className="mt-4 flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-5 w-5 mt-0.5 rounded cursor-pointer"
                  style={{ 
                    borderColor: primaryColor,
                    accentColor: primaryColor
                  }}
                />
                <label htmlFor="terms" className="text-sm cursor-pointer" style={{ color: textLight }}>
                  By proceeding I accept the <span className="font-medium hover:underline" style={{ color: primaryColor }}>Terms & Conditions</span>
                </label>
              </div>
            </div>
          </div>

          {/* القسم الأيمن - معلومات الشحن والدفع */}
          <div className="space-y-6">
            {/* خيارات التسليم */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4" style={{ color: textColor }}>
                Delivery Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                    deliveryMethod === 'delivery' 
                      ? 'border-primary shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    deliveryMethod === 'delivery' 
                      ? 'bg-primary/10' 
                      : 'bg-gray-100'
                  }`}>
                    <Truck size={20} style={{ 
                      color: deliveryMethod === 'delivery' ? primaryColor : textLight 
                    }} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold" style={{ color: textColor }}>Delivery</h3>
                    <p className="text-sm" style={{ color: textLight }}>2-3 business days</p>
                  </div>
                  {deliveryMethod === 'delivery' && (
                    <CheckCircle className="ml-auto" size={20} style={{ color: primaryColor }} />
                  )}
                </button>
                
                <button
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                    deliveryMethod === 'pickup' 
                      ? 'border-primary shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    deliveryMethod === 'pickup' 
                      ? 'bg-primary/10' 
                      : 'bg-gray-100'
                  }`}>
                    <Store size={20} style={{ 
                      color: deliveryMethod === 'pickup' ? primaryColor : textLight 
                    }} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold" style={{ color: textColor }}>Pick Up</h3>
                    <p className="text-sm" style={{ color: textLight }}>From our store</p>
                  </div>
                  {deliveryMethod === 'pickup' && (
                    <CheckCircle className="ml-auto" size={20} style={{ color: primaryColor }} />
                  )}
                </button>
              </div>
            </div>

            {/* طرق الدفع */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4" style={{ color: textColor }}>
                Payment Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                    paymentMethod === 'card' 
                      ? 'border-primary shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === 'card' 
                      ? 'bg-primary/10' 
                      : 'bg-gray-100'
                  }`}>
                    <CreditCard size={20} style={{ 
                      color: paymentMethod === 'card' ? primaryColor : textLight 
                    }} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold" style={{ color: textColor }}>Pay Card</h3>
                    <p className="text-sm" style={{ color: textLight }}>Credit/Debit Card</p>
                  </div>
                  {paymentMethod === 'card' && (
                    <CheckCircle className="ml-auto" size={20} style={{ color: primaryColor }} />
                  )}
                </button>
                
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                    paymentMethod === 'cash' 
                      ? 'border-primary shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === 'cash' 
                      ? 'bg-primary/10' 
                      : 'bg-gray-100'
                  }`}>
                    <div className="text-lg font-bold" style={{ 
                      color: paymentMethod === 'cash' ? primaryColor : textLight 
                    }}>$</div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold" style={{ color: textColor }}>Cash Payment</h3>
                    <p className="text-sm" style={{ color: textLight }}>Pay on delivery</p>
                  </div>
                  {paymentMethod === 'cash' && (
                    <CheckCircle className="ml-auto" size={20} style={{ color: primaryColor }} />
                  )}
                </button>
              </div>
            </div>

            {/* نموذج معلومات العميل */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-bold mb-2" style={{ color: textColor }}>
                Fill in the fields
              </h2>
              <p className="text-sm mb-4" style={{ color: textLight }}>
                Please fill in all fields to confirm your order
              </p>
              
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: textColor }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      style={{ 
                        borderColor: '#E5E7EB',
                        color: textColor,
                        backgroundColor: 'white'
                      }}
                      placeholder="John"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: textColor }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      style={{ 
                        borderColor: '#E5E7EB',
                        color: textColor,
                        backgroundColor: 'white'
                      }}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: textColor }}>
                    Street name and house number *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    style={{ 
                      borderColor: '#E5E7EB',
                      color: textColor,
                      backgroundColor: 'white'
                    }}
                    placeholder="123 Main Street"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: textColor }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      style={{ 
                        borderColor: '#E5E7EB',
                        color: textColor,
                        backgroundColor: 'white'
                      }}
                      placeholder="New York"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: textColor }}>
                      Region *
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      style={{ 
                        borderColor: '#E5E7EB',
                        color: textColor,
                        backgroundColor: 'white'
                      }}
                      placeholder="NY"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: textColor }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      style={{ 
                        borderColor: '#E5E7EB',
                        color: textColor,
                        backgroundColor: 'white'
                      }}
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: textColor }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      style={{ 
                        borderColor: '#E5E7EB',
                        color: textColor,
                        backgroundColor: 'white'
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;