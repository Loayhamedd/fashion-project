import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  CreditCard, Lock, Shield, CheckCircle, 
  Truck, Package, ArrowLeft, AlertCircle 
} from 'lucide-react';
import { calculateCartTotals } from '../../features/cart/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { cartItems } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
    termsAccepted: false
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  const totals = calculateCartTotals(cartItems);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.substring(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormData(prev => ({ ...prev, cardNumber: value }));
  };
  
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substring(0, 4);
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
  };
  
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.substring(0, 3);
    setFormData(prev => ({ ...prev, cvv: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      navigate('/products');
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStep(3);
      
      const orderData = {
        orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        items: cartItems,
        total: totals.totalPrice,
        paymentMethod: 'Credit Card',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
      };
      
      setTimeout(() => {
        navigate('/order-confirmation', { state: { orderData } });
      }, 2000);
    }, 2000);
  };
  
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package size={32} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart before checkout.</p>
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 bg-[#8B7355] text-white rounded-lg font-medium hover:bg-[#A38B6D] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (activeStep === 3) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">Your order is being processed. Redirecting to order confirmation...</p>
            <div className="w-12 h-12 mx-auto border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin mb-6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-8">
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>


        <div className="flex items-center justify-between mb-8">
          {[
            { number: 1, label: 'Payment', icon: CreditCard },
            { number: 2, label: 'Review', icon: Shield },
            { number: 3, label: 'Complete', icon: CheckCircle }
          ].map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-2
                ${activeStep >= step.number 
                  ? 'bg-[#8B7355] text-white' 
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                <step.icon size={24} />
              </div>
              <span className={`
                text-sm font-medium
                ${activeStep >= step.number ? 'text-[#8B7355]' : 'text-gray-400'}
              `}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard size={24} className="text-[#8B7355]" />
                <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleCvvChange}
                        placeholder="123"
                        maxLength="3"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveCard"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={handleInputChange}
                    className="h-5 w-5 rounded border-gray-300 text-[#8B7355] focus:ring-[#8B7355]/30"
                  />
                  <label htmlFor="saveCard" className="ml-3 text-sm text-gray-700">
                    Save card details for future purchases
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required
                    className="h-5 w-5 mt-0.5 rounded border-gray-300 text-[#8B7355] focus:ring-[#8B7355]/30"
                  />
                  <label htmlFor="termsAccepted" className="ml-3 text-sm text-gray-700">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#8B7355] hover:underline">Terms and Conditions</Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-[#8B7355] hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">Secure Payment</p>
                      <p className="text-xs text-blue-700">
                        Your payment information is encrypted and secure. We never store your CVV code.
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#8B7355] text-white rounded-lg font-bold text-lg hover:bg-[#A38B6D] disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={20} />
                      <span>Pay ${formatPrice(totals.totalPrice)}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-600 text-sm">Qty: {item.quantity}</span>
                        <span className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${formatPrice(totals.itemsPrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${formatPrice(totals.shippingPrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${formatPrice(totals.taxPrice)}</span>
                </div>
                
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[#8B7355]">
                    ${formatPrice(totals.totalPrice)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <Truck size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-900">Delivery Estimate</span>
                </div>
                <p className="text-sm text-gray-600">
                  Standard delivery: 3-5 business days
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-900">Return Policy</span>
                </div>
                <p className="text-xs text-gray-600">
                  30-day return policy. Items must be in original condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;