// src/pages/Profile/ProfilePage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Package, Heart, MapPin, CreditCard, LogOut, 
  Settings, Shield, Bell, HelpCircle, ChevronRight 
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  
  // بيانات المستخدم (ستأتي من localStorage أو API)
  const userData = {
    name: localStorage.getItem('userName') || 'John Doe',
    email: localStorage.getItem('userEmail') || 'john@example.com',
    memberSince: '2024',
    userType: localStorage.getItem('userType') || 'registered'
  };

  // بيانات الطلبات (مثال)
  const orders = [
    { id: 'ORD-123456', date: '2024-02-15', total: 320.96, status: 'Delivered', items: 3 },
    { id: 'ORD-123455', date: '2024-02-10', total: 150.50, status: 'Processing', items: 1 },
    { id: 'ORD-123454', date: '2024-02-05', total: 429.99, status: 'Shipped', items: 2 },
  ];

  // بيانات المفضلة (مثال)
  const wishlistItems = [
    { id: 1, name: 'Nordic Chair', price: 3000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Modern Sofa', price: 3200, image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Armchair', price: 2600, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ];

  // العناوين المحفوظة (مثال)
  const savedAddresses = [
    { id: 1, type: 'Home', address: '123 Main St, New York, NY 10001', isDefault: true },
    { id: 2, type: 'Work', address: '456 Business Ave, Brooklyn, NY 11201', isDefault: false },
  ];

  // طرق الدفع المحفوظة (مثال)
  const paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'PayPal', email: 'john@example.com', isDefault: false },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    navigate('/auth?mode=login');
  };

  const menuItems = [
    { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
    { id: 'favourites', label: 'My Favourites', icon: Heart, count: wishlistItems.length },
    { id: 'address', label: 'Address Book', icon: MapPin, count: savedAddresses.length },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard, count: paymentMethods.length },
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">
                    {order.items} item{order.items > 1 ? 's' : ''} • Total: <span className="font-semibold">${order.total}</span>
                  </div>
                  <button className="text-[#8B7355] hover:underline text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
            <Link to="/orders" className="block text-center text-[#8B7355] hover:underline font-medium py-3">
              View All Orders
            </Link>
          </div>
        );

      case 'favourites':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">My Favourites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlistItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-lg font-bold text-gray-900 mt-1">${item.price}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 bg-[#8B7355] text-white py-2 rounded-lg text-sm hover:bg-[#A38B6D]">
                          Add to Cart
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Heart size={18} className="text-red-500 fill-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'address':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAddresses.map(address => (
                <div key={address.id} className={`border rounded-lg p-4 ${
                  address.isDefault ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="font-semibold text-gray-900">{address.type}</span>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-[#8B7355] text-white text-xs rounded">Default</span>
                      )}
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm">{address.address}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400">
              + Add New Address
            </button>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
            {paymentMethods.map(method => (
              <div key={method.id} className={`border rounded-lg p-4 ${
                method.isDefault ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-200'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <CreditCard size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{method.type}</p>
                      <p className="text-sm text-gray-500">
                        {method.last4 ? `•••• ${method.last4}` : method.email}
                        {method.expiry && ` • Expires ${method.expiry}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-[#8B7355] text-white text-xs rounded">Default</span>
                    )}
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400">
              + Add New Payment Method
            </button>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{menuItems.find(item => item.id === activeTab)?.label}</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B7355] to-[#A38B6D] rounded-full flex items-center justify-center">
                  <User size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-900">{userData.name}</h2>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                  <p className="text-xs text-gray-400">Member since {userData.memberSince}</p>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-1">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#8B7355] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count !== undefined && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          activeTab === item.id
                            ? 'bg-white/20'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {item.count}
                        </span>
                      )}
                      <ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 mt-6 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>

            {/* Account Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-semibold">{orders.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Favourites</span>
                  <span className="font-semibold">{wishlistItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">{userData.memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;