import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { ShoppingCart, User, Menu, X, Sofa, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { cartItems } = useSelector((state) => state.cart);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);


  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const name = localStorage.getItem("userName") || "";
    
    setIsLoggedIn(loggedIn);
    setUserName(name);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setUserName("");
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Cart ", path: "/cart", badge: cartItemsCount },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3 backdrop-blur-sm' 
          : 'bg-white py-4'
      }`}
      dir="ltr"
      style={{ textAlign: 'left' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-[#8B7355] rounded-lg">
              <Sofa size={26} className="text-white" />
            </div>
            <Link 
              to="/" 
              className="text-2xl font-bold text-[#A0522D] hover:text-[#8B7355] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Gallery
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                <Link
                  to={link.path}
                  className={`font-medium transition-colors relative px-1 ${
                    location.pathname === link.path
                      ? 'text-[#8B7355] font-semibold'
                      : 'text-gray-700 hover:text-[#8B7355]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.name}
                  {link.badge && link.badge > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                  {location.pathname === link.path && (
                    <div className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#8B7355] rounded-full"></div>
                  )}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-1">
            {isLoggedIn ? (
              <div className="hidden lg:flex items-center space-x-3">
                <div className="relative group">
                  <button 
                    className="w-10 h-10 rounded-full bg-gray-100 border-2 border-[#D4B996] flex items-center justify-center hover:border-[#8B7355] transition-colors"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <User size={20} className="text-[#8B7355]" />
                  </button>
                  

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-3 border-b border-gray-100">
                        <p className="font-medium text-gray-800">{userName || "User"}</p>
                        <p className="text-sm text-gray-500">
                          {localStorage.getItem("userType") === "guest" ? "Guest User" : "Registered User"}
                        </p>
                      </div>
                      <div className="p-1">
                        <Link
                          to="/profile"
                          className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <div className="border-t border-gray-100 mt-1">
                          <button 
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded flex items-center gap-2"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (

              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  to="/auth?mode=register"
                  className="px-6 py-1 border border-[#8B7355] text-[#8B7355] rounded-lg hover:bg-[#8B7355] hover:text-white transition-colors font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=login"
                  className="px-6 py-1 bg-[#8B7355] text-white rounded-lg hover:bg-[#A0522D] transition-colors font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Log In
                </Link>
              </div>
            )}


            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>


        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="py-3">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 ${
                    location.pathname === link.path
                      ? 'bg-[#8B7355]/10 text-[#8B7355]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">{link.name}</span>
                  {link.badge && link.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}


              <div className="px-4 py-3 border-t border-gray-200">
                {isLoggedIn ? (

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-[#D4B996] flex items-center justify-center">
                        <User size={20} className="text-[#8B7355]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{userName || "User"}</p>
                        <p className="text-sm text-gray-500">
                          {localStorage.getItem("userType") === "guest" ? "Guest User" : "Registered User"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (

                  <>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <Link
                        to="/auth?mode=login"
                        className="px-4 py-2 border border-[#8B7355] text-[#8B7355] rounded-lg text-center font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/auth?mode=register"
                        className="px-4 py-2 bg-[#8B7355] text-white rounded-lg text-center font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log In
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-[#D4B996] flex items-center justify-center">
                        <User size={20} className="text-[#8B7355]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Guest User</p>
                        <p className="text-sm text-gray-500">Sign in to access account</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;