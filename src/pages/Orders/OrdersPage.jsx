// src/pages/Orders/OrdersPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle, Clock, XCircle, 
  Eye, Download, RefreshCw, Filter 
} from 'lucide-react';

const OrdersPage = () => {
  const [filter, setFilter] = useState('all');
  
  // بيانات الطلبات (مثال)
  const orders = [
    {
      id: 'ORD-789456',
      date: '2024-02-15',
      status: 'delivered',
      items: [
        { name: 'Nordic Chair', quantity: 1, price: 3000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
        { name: 'Modern Sofa', quantity: 1, price: 3200, image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }
      ],
      total: 6200,
      shippingAddress: '123 Main St, New York, NY 10001',
      estimatedDelivery: '2024-02-18',
      deliveredDate: '2024-02-17'
    },
    {
      id: 'ORD-789455',
      date: '2024-02-10',
      status: 'shipped',
      items: [
        { name: 'Armchair', quantity: 2, price: 2600, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }
      ],
      total: 5200,
      shippingAddress: '456 Park Ave, Brooklyn, NY 11201',
      estimatedDelivery: '2024-02-13',
      trackingNumber: 'TRK-789456123'
    },
    {
      id: 'ORD-789454',
      date: '2024-02-05',
      status: 'processing',
      items: [
        { name: 'Office Chair', quantity: 1, price: 2400, image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
        { name: 'Side Table', quantity: 1, price: 800, image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }
      ],
      total: 3200,
      shippingAddress: '789 Broadway, Manhattan, NY 10003',
      estimatedDelivery: '2024-02-09'
    },
    {
      id: 'ORD-789453',
      date: '2024-01-28',
      status: 'cancelled',
      items: [
        { name: 'Dining Table', quantity: 1, price: 4500, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }
      ],
      total: 4500,
      shippingAddress: '321 Oak St, Queens, NY 11355',
      cancelledDate: '2024-01-29'
    }
  ];
  
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={20} className="text-green-600" />;
      case 'shipped': return <Truck size={20} className="text-blue-600" />;
      case 'processing': return <Clock size={20} className="text-yellow-600" />;
      case 'cancelled': return <XCircle size={20} className="text-red-600" />;
      default: return <Package size={20} className="text-gray-600" />;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };
  
  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    pending: orders.filter(o => o.status === 'processing' || o.status === 'shipped').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View and manage all your orders</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orderStats.total, color: 'bg-blue-500' },
            { label: 'Delivered', value: orderStats.delivered, color: 'bg-green-500' },
            { label: 'Pending', value: orderStats.pending, color: 'bg-yellow-500' },
            { label: 'Cancelled', value: orderStats.cancelled, color: 'bg-red-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                  <Package size={24} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === status
                        ? 'bg-[#8B7355] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all' ? 'All Orders' : getStatusText(status)}
                  </button>
                ))}
              </div>
            </div>
            
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw size={16} />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>
        
        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Package size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">You don't have any orders matching this filter.</p>
              <Link
                to="/products"
                className="inline-block px-6 py-3 bg-[#8B7355] text-white rounded-lg font-medium hover:bg-[#A38B6D] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Placed on {order.date}</span>
                        {order.estimatedDelivery && (
                          <span>• Estimated delivery: {order.estimatedDelivery}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</span>
                      {getStatusIcon(order.status)}
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Items in this order</h4>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-600">Qty: {item.quantity}</span>
                            <span className="font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Footer */}
                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">Shipping to: </span>
                        <span className="font-medium text-gray-900">{order.shippingAddress}</span>
                      </div>
                      {order.trackingNumber && (
                        <div className="text-sm">
                          <span className="text-gray-600">Tracking: </span>
                          <span className="font-medium text-blue-600">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        <Eye size={16} />
                        <span className="text-sm">View Details</span>
                      </button>
                      
                      {order.status === 'delivered' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#A38B6D] transition-colors">
                          <Download size={16} />
                          <span className="text-sm">Invoice</span>
                        </button>
                      )}
                      
                      {order.status === 'processing' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          <span className="text-sm">Cancel Order</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Help Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Need help with your orders?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Track Your Order</h4>
              <p className="text-sm text-gray-600">Check the status of your shipped orders</p>
              <Link to="/track-order" className="text-sm text-[#8B7355] hover:underline mt-2 inline-block">
                Track now →
              </Link>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Return Items</h4>
              <p className="text-sm text-gray-600">Start a return for eligible items</p>
              <Link to="/returns" className="text-sm text-[#8B7355] hover:underline mt-2 inline-block">
                Start return →
              </Link>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Contact Support</h4>
              <p className="text-sm text-gray-600">Need help? Our team is here for you</p>
              <Link to="/contact" className="text-sm text-[#8B7355] hover:underline mt-2 inline-block">
                Contact us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;