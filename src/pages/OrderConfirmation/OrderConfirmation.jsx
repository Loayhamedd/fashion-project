import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home, Clock, Truck } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderData = location.state?.orderData || {
    orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    total: 320.96,
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Credit Card ending in 4242"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your order will be delivered soon!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for choosing our app.
          </p>
          <p className="text-gray-500">
            Order ID: <span className="font-semibold">{orderData.orderId}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-semibold text-gray-900">{orderData.orderId}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-semibold text-gray-900">{orderData.orderDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">{orderData.estimatedDelivery}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <div className="text-xl font-bold text-orange-600">$</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-gray-900">${orderData.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Status</h3>
            <div className="relative">

              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              

              <div className="space-y-8 relative">
                {[
                  { status: 'Order Placed', time: 'Today', completed: true },
                  { status: 'Order Confirmed', time: 'Within 24 hours', completed: true },
                  { status: 'Processing', time: '1-2 business days', completed: false },
                  { status: 'Shipped', time: orderData.estimatedDelivery, completed: false },
                  { status: 'Delivered', time: 'Estimated ' + orderData.estimatedDelivery, completed: false }
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {step.completed ? (
                        <CheckCircle size={16} className="text-white" />
                      ) : (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{step.status}</p>
                      <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 bg-[#8B7355] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#A38B6D] transition-colors"
          >
            <Package size={20} />
            Track Your Orders
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            <Home size={20} />
            Continue Shopping
          </Link>
        </div>


        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">Need help with your order?</p>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="text-[#8B7355] hover:underline">
              Contact Support
            </Link>
            <Link to="/faq" className="text-[#8B7355] hover:underline">
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;