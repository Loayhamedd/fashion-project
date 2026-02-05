import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Package, Heart, MapPin, CreditCard, LogOut, 
  Settings, Shield, Bell, HelpCircle, ChevronRight,
  Star, Edit2, Plus, Trash2, CheckCircle, Clock,
  Truck, Check, X, ExternalLink, Award, Crown
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const loadUserData = () => {
      setLoading(true);
      setTimeout(() => {
        const savedUser = {
          name: localStorage.getItem('userName') || 'Alexander Johnson',
          email: localStorage.getItem('userEmail') || 'alex.johnson@example.com',
          memberSince: localStorage.getItem('memberSince') || '2023',
          userType: localStorage.getItem('userType') || 'premium',
          loyaltyPoints: 1250,
          tier: 'Gold Member',
          avatarColor: '#8B7355'
        };
        
        setUserData(savedUser);
        
        const nameParts = savedUser.name.split(' ');
        setProfileForm({
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: savedUser.email,
          phone: '+1 (555) 123-4567',
          address: '123 Premium Street, New York, NY 10001'
        });
        
        setLoading(false);
      }, 500);
    };
    
    loadUserData();
  }, []);

  const orders = [
    { 
      id: 'ORD-789012', 
      date: '2024-03-15', 
      total: 2999.99, 
      status: 'Delivered', 
      items: 3,
      deliveryDate: '2024-03-20',
      trackingNumber: 'TRK789012345',
      products: [
        { name: 'Nordic Modern Sofa', price: 1899.99, quantity: 1 },
        { name: 'Designer Coffee Table', price: 599.99, quantity: 1 },
        { name: 'Premium Throw Pillows Set', price: 500, quantity: 2 }
      ]
    },
    { 
      id: 'ORD-789011', 
      date: '2024-03-10', 
      total: 1599.50, 
      status: 'Shipped', 
      items: 2,
      deliveryDate: '2024-03-25',
      trackingNumber: 'TRK789011234',
      products: [
        { name: 'Executive Office Chair', price: 999.50, quantity: 1 },
        { name: 'Ergonomic Desk', price: 600, quantity: 1 }
      ]
    },
    { 
      id: 'ORD-789010', 
      date: '2024-03-05', 
      total: 899.99, 
      status: 'Processing', 
      items: 1,
      deliveryDate: '2024-03-30',
      trackingNumber: 'TRK789010123',
      products: [
        { name: 'Bedside Lamp Collection', price: 299.99, quantity: 3 }
      ]
    },
  ];

  const wishlistItems = [
    { 
      id: 101, 
      name: 'Luxury Leather Sofa', 
      price: 4599.99, 
      originalPrice: 5499.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      rating: 4.8,
      reviews: 124,
      tags: ['Bestseller', 'Premium']
    },
    { 
      id: 102, 
      name: 'Minimalist Dining Table', 
      price: 2199.99, 
      originalPrice: 2599.99,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w-300&q=80',
      rating: 4.6,
      reviews: 89,
      tags: ['Modern', 'Oak Wood']
    },
    { 
      id: 103, 
      name: 'Smart Home Office Desk', 
      price: 1299.99, 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      rating: 4.9,
      reviews: 156,
      tags: ['Ergonomic', 'Adjustable']
    },
  ];

  const savedAddresses = [
    { 
      id: 201, 
      type: 'Primary Residence', 
      address: '123 Premium Street, Apt 4B\nNew York, NY 10001\nUnited States',
      phone: '+1 (555) 123-4567',
      isDefault: true,
      instructions: 'Leave at front desk if not home'
    },
    { 
      id: 202, 
      type: 'Office Address', 
      address: '456 Business Avenue, Floor 12\nNew York, NY 10017\nUnited States',
      phone: '+1 (555) 987-6543',
      isDefault: false,
      instructions: 'Deliver between 9AM-5PM'
    },
  ];

  const paymentMethods = [
    { 
      id: 301, 
      type: 'Visa', 
      last4: '4242', 
      expiry: '12/25', 
      cardholder: 'ALEXANDER JOHNSON',
      isDefault: true,
      icon: '💳'
    },
    { 
      id: 302, 
      type: 'PayPal', 
      email: 'alex.johnson@example.com',
      isDefault: false,
      icon: '📱'
    },
    { 
      id: 303, 
      type: 'Apple Pay', 
      device: 'iPhone 14 Pro',
      isDefault: false,
      icon: '🍎'
    },
  ];

  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <p className="font-medium">Are you sure you want to logout?</p>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('userName');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('userType');
              localStorage.removeItem('memberSince');
              
              toast.success('Successfully logged out!', {
                duration: 3000,
                position: 'top-right',
                icon: '👋',
                style: {
                  background: '#10B981',
                  color: 'white',
                  borderRadius: '10px',
                  borderLeft: '4px solid #059669',
                },
              });
              
              navigate('/auth?mode=login');
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 10000,
      position: 'top-center',
    });
  };

  const handleSaveProfile = () => {
    const fullName = `${profileForm.firstName} ${profileForm.lastName}`;
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userEmail', profileForm.email);
    
    setUserData(prev => ({
      ...prev,
      name: fullName,
      email: profileForm.email
    }));
    
    setEditingProfile(false);
    
    toast.success('Profile updated successfully!', {
      duration: 3000,
      position: 'top-right',
      icon: '✅',
      style: {
        background: '#10B981',
        color: 'white',
        borderRadius: '10px',
        borderLeft: '4px solid #059669',
      },
    });
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: User, color: '#8B7355' },
    { id: 'orders', label: 'My Orders', icon: Package, count: orders.length, color: '#3B82F6' },
    { id: 'favourites', label: 'My Wishlist', icon: Heart, count: wishlistItems.length, color: '#EF4444' },
    { id: 'address', label: 'Saved Addresses', icon: MapPin, count: savedAddresses.length, color: '#10B981' },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard, count: paymentMethods.length, color: '#8B5CF6' },
    { id: 'settings', label: 'Account Settings', icon: Settings, color: '#6B7280' },
    { id: 'security', label: 'Security & Privacy', icon: Shield, color: '#F59E0B' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: '#EC4899' },
    { id: 'help', label: 'Help Center', icon: HelpCircle, color: '#6366F1' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">

            <div className="bg-gradient-to-r from-[#8B7355] to-[#A38B6D] rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {userData?.name.split(' ')[0]}! 👋</h1>
                  <p className="text-white/90">Here's what's happening with your account today.</p>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Crown size={18} />
                  <span className="font-semibold">{userData?.tier}</span>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Active Orders</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{orders.length}</h3>
                <p className="text-gray-600 text-sm">2 orders in transit</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <Heart className="text-red-600" size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Wishlist Items</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{wishlistItems.length}</h3>
                <p className="text-gray-600 text-sm">{wishlistItems.length > 3 ? '+3 new items' : 'View all items'}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <Award className="text-amber-600" size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Loyalty Points</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{userData?.loyaltyPoints}</h3>
                <p className="text-gray-600 text-sm">Earn 500 more for next tier</p>
              </div>
            </div>


            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <button className="text-[#8B7355] hover:underline text-sm font-medium flex items-center gap-1">
                  View All <ExternalLink size={14} />
                </button>
              </div>
              
              <div className="space-y-4">
                {orders.slice(0, 2).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        order.status === 'Delivered' ? 'bg-green-100' :
                        order.status === 'Shipped' ? 'bg-blue-100' :
                        'bg-yellow-100'
                      }`}>
                        {order.status === 'Delivered' ? <Check className="text-green-600" size={20} /> :
                         order.status === 'Shipped' ? <Truck className="text-blue-600" size={20} /> :
                         <Clock className="text-yellow-600" size={20} />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                        <p className="text-sm text-gray-500">{order.items} items • {order.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Orders</option>
                  <option>Delivered</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                </select>
                <button className="px-4 py-2 bg-[#8B7355] text-white rounded-lg text-sm hover:bg-[#A38B6D] transition-colors">
                  Track All Orders
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">

                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Placed on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        <p className="text-gray-500 text-sm">{order.items} items</p>
                      </div>
                    </div>
                  </div>


                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Items in this order:</h4>
                    <div className="space-y-3">
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-gray-900">${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>


                  <div className="px-6 py-4 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Estimated delivery:</span> {order.deliveryDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Tracking:</span> {order.trackingNumber}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">
                        View Invoice
                      </button>
                      <button className="px-4 py-2 bg-[#8B7355] text-white rounded-lg text-sm font-medium hover:bg-[#A38B6D] transition-colors">
                        Track Order
                      </button>
                      {order.status === 'Delivered' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'favourites':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
              <div className="text-gray-500 text-sm">
                {wishlistItems.length} items • Total: ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map(item => (
                <div key={item.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">

                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-black/70 text-white text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Heart size={20} className="text-red-500 fill-red-500" />
                    </button>
                  </div>


                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14}
                            className={i < Math.floor(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({item.rating})</span>
                      <span className="text-sm text-gray-500">• {item.reviews} reviews</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-[#8B7355] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#A38B6D] transition-colors">
                        Add to Cart
                      </button>
                      <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Trash2 size={18} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'address':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
              <button className="px-4 py-2 bg-[#8B7355] text-white rounded-lg text-sm font-medium hover:bg-[#A38B6D] transition-colors flex items-center gap-2">
                <Plus size={16} />
                Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedAddresses.map(address => (
                <div key={address.id} className={`relative border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                  address.isDefault ? 'border-[#8B7355] bg-gradient-to-br from-[#8B7355]/5 to-transparent' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  {address.isDefault && (
                    <div className="absolute -top-2 left-6 px-3 py-1 bg-[#8B7355] text-white text-xs font-medium rounded-full">
                      <CheckCircle size={12} className="inline mr-1" />
                      Default Address
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <MapPin size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{address.type}</h3>
                        <p className="text-sm text-gray-500">{address.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-[#8B7355] hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      {!address.isDefault && (
                        <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-700 whitespace-pre-line">{address.address}</p>
                    {address.instructions && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Delivery Instructions:</p>
                        <p className="text-sm text-gray-700">{address.instructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
              <button className="px-4 py-2 bg-[#8B7355] text-white rounded-lg text-sm font-medium hover:bg-[#A38B6D] transition-colors flex items-center gap-2">
                <Plus size={16} />
                Add New Method
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div key={method.id} className={`border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                  method.isDefault ? 'border-[#8B7355] bg-gradient-to-br from-[#8B7355]/5 to-transparent' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{method.type}</h3>
                        <p className="text-sm text-gray-500">
                          {method.last4 ? `•••• ${method.last4}` : method.email || method.device}
                          {method.expiry && ` • Expires ${method.expiry}`}
                          {method.cardholder && ` • ${method.cardholder}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {method.isDefault ? (
                        <span className="px-3 py-1 bg-[#8B7355] text-white text-xs font-medium rounded-full">
                          <CheckCircle size={12} className="inline mr-1" />
                          Default
                        </span>
                      ) : (
                        <button className="text-sm text-gray-500 hover:text-[#8B7355] hover:underline">
                          Set as Default
                        </button>
                      )}
                      
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-[#8B7355] hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        {!method.isDefault && (
                          <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
            

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
                {!editingProfile ? (
                  <button 
                    onClick={() => setEditingProfile(true)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingProfile(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-[#8B7355] text-white rounded-lg text-sm font-medium hover:bg-[#A38B6D] transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                    disabled={!editingProfile}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                    disabled={!editingProfile}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    disabled={!editingProfile}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    disabled={!editingProfile}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                  <textarea
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    disabled={!editingProfile}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{menuItems.find(item => item.id === activeTab)?.label}</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const Icon = menuItems.find(item => item.id === activeTab)?.icon || Settings;
                  return <Icon size={32} className="text-gray-400" />;
                })()}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This section is currently under development. We're working hard to bring you more features to enhance your experience.
              </p>
              <button className="mt-6 px-6 py-2.5 bg-[#8B7355] text-white rounded-lg text-sm font-medium hover:bg-[#A38B6D] transition-colors">
                Notify Me When Ready
              </button>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-2">Welcome back! Manage your profile, orders, and preferences in one place.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-semibold text-[#8B7355]">{userData?.tier}</p>
              </div>
              <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-semibold text-gray-900">{userData?.memberSince}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-1">

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg"
                  style={{ backgroundColor: userData?.avatarColor }}
                >
                  {userData?.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="font-bold text-xl text-gray-900">{userData?.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{userData?.email}</p>
                

                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full text-white text-sm font-medium flex items-center gap-2">
                  <Award size={16} />
                  <span>{userData?.loyaltyPoints} Points</span>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
              <nav className="space-y-1">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-[#8B7355] to-[#A38B6D] text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                          <Icon size={18} style={activeTab !== item.id ? { color: item.color } : {}} />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.count !== undefined && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            activeTab === item.id
                              ? 'bg-white/30'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.count}
                          </span>
                        )}
                        <ChevronRight size={16} className={activeTab === item.id ? 'text-white' : 'text-gray-400'} />
                      </div>
                    </button>
                  );
                })}
              </nav>


              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 mt-6 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100 hover:border-red-200"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 lg:p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;