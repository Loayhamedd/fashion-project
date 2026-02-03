// src/pages/AuthPage/AuthPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShoppingBag, Home, Sofa, ArrowRight, Shield, Truck, Headphones } from "lucide-react";

export default function AuthPage() {  
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // التحقق من وضع الصفحة (login أو register) من query parameters
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  
  // تعيين isLogin بناءً على mode
  useEffect(() => {
    if (mode === "register") {
      setIsLogin(false);
    } else if (mode === "login") {
      setIsLogin(true);
    }
  }, [mode]);

  // ألوان الموقع الحالية
  const primaryColor = "#8B7355";
  const primaryLight = "#A38B6D";
  const backgroundColor = "#F9F7F4";
  const textColor = "#333333";
  const textLight = "#666666";

  // صور الخلفية
  const loginImage = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  const registerImage = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (isLogin) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", form.email);
        localStorage.setItem("userType", "registered");
        navigate("/");
      } else {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", form.name);
        localStorage.setItem("userEmail", form.email);
        localStorage.setItem("userType", "registered");
        setIsLogin(true);
        alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGuestLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", "guest");
    localStorage.setItem("userName", "Guest User");
    localStorage.setItem("userEmail", "guest@example.com");
    navigate("/");
  };

  const handleToggleForm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* زر العودة للرئيسية */}
      <div className="absolute top-4 left-4 z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group hover:bg-white/80 backdrop-blur-sm hover:scale-105"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: textColor,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Home size={16} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* القسم الأيسر - ديناميكي حسب نوع النموذج */}
      <div className={`lg:w-1/2 h-[40vh] lg:h-screen relative overflow-hidden transition-all duration-700 ease-in-out transform ${
        isLogin 
          ? 'order-2 lg:order-1 translate-x-0 lg:translate-x-0' 
          : 'order-2 lg:order-2 translate-x-0 lg:translate-x-0'
      }`}>
        {/* صورة الخلفية */}
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
          isAnimating ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100 blur-0'
        }`}>
          <img 
            src={isLogin ? loginImage : registerImage} 
            alt={isLogin ? "Login Background" : "Register Background"}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>

        {/* محتوى الصورة */}
        <div className="relative z-10 h-full flex flex-col justify-end p-4 lg:p-8">
          <div className={`transition-all duration-500 ease-out transform ${
            isAnimating ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100 delay-100'
          }`}>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 mb-4 transition-all duration-300 hover:bg-white/20">
                <Sofa size={20} className="text-white" />
                <span className="text-white text-sm font-medium">Gallery Furniture</span>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                {isLogin ? "Welcome Back!" : "Join Our Community"}
              </h1>
              
              <p className="text-white/90 text-base lg:text-lg mb-6 max-w-md">
                {isLogin 
                  ? "Sign in to access your personalized furniture collection and exclusive offers."
                  : "Create an account to save your favorite items, track orders, and get recommendations."
                }
              </p>
            </div>

            {/* ميزات */}
            <div className="space-y-3 max-w-sm">
              <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20">
                  {isLogin ? (
                    <Shield size={20} className="text-white" />
                  ) : (
                    <Truck size={20} className="text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {isLogin ? "Secure Account" : "Fast Delivery"}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {isLogin 
                      ? "Your information is protected with bank-level security"
                      : "Free delivery on all orders over $500"
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1 delay-75">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20">
                  {isLogin ? (
                    <ShoppingBag size={20} className="text-white" />
                  ) : (
                    <Headphones size={20} className="text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {isLogin ? "Saved Items" : "24/7 Support"}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {isLogin 
                      ? "Access your wishlist and saved furniture items"
                      : "Our team is always here to help you"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* القسم الأيمن - النموذج */}
      <div className={`lg:w-1/2 h-[60vh] lg:h-screen flex items-center justify-center p-4 lg:p-8 transition-all duration-700 ease-in-out transform ${
        isLogin 
          ? 'order-1 lg:order-2 translate-x-0 lg:translate-x-0' 
          : 'order-1 lg:order-1 translate-x-0 lg:translate-x-0'
      }`} style={{ backgroundColor: backgroundColor }}>
        <div className={`w-full max-w-sm transition-all duration-500 ease-out transform ${
          isAnimating ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0 delay-100'
        }`}>
          {/* الهيدر */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 transition-all duration-300" style={{ color: textColor }}>
              {isLogin ? "Sign In to Account" : "Create New Account"}
            </h2>
            <p className="text-sm transition-all duration-300" style={{ color: textLight }}>
              {isLogin 
                ? "Enter your credentials to continue" 
                : "Fill in your details to get started"
              }
            </p>
          </div>

          {/* أزرار التبديل */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1 transition-all duration-300">
            <button
              onClick={handleToggleForm}
              className={`flex-1 py-3 px-3 rounded-lg text-center font-medium text-sm transition-all duration-300 transform ${
                isLogin 
                  ? 'shadow-lg text-white scale-105' 
                  : 'text-gray-700 hover:text-gray-900 hover:scale-100'
              }`}
              style={isLogin ? { 
                backgroundColor: primaryColor,
                transform: 'scale(1.02)'
              } : {}}
            >
              Sign In
            </button>
            <button
              onClick={handleToggleForm}
              className={`flex-1 py-3 px-3 rounded-lg text-center font-medium text-sm transition-all duration-300 transform ${
                !isLogin 
                  ? 'shadow-lg text-white scale-105' 
                  : 'text-gray-700 hover:text-gray-900 hover:scale-100'
              }`}
              style={!isLogin ? { 
                backgroundColor: primaryColor,
                transform: 'scale(1.02)'
              } : {}}
            >
              Sign Up
            </button>
          </div>

          {/* النموذج */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1 animate-slideDown">
                <label className="block text-xs font-medium mb-1" style={{ color: textColor }}>
                  Full Name
                </label>
                <div className="relative transition-all duration-300 hover:scale-[1.02]">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300" style={{ color: textLight }} size={14} />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full pl-9 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-all duration-300 hover:border-gray-400"
                    style={{ 
                      borderColor: '#E5E7EB',
                      color: textColor,
                      backgroundColor: 'white'
                    }}
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1 transition-all duration-300">
              <label className="block text-xs font-medium mb-1" style={{ color: textColor }}>
                Email Address
              </label>
              <div className="relative transition-all duration-300 hover:scale-[1.02]">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300" style={{ color: textLight }} size={14} />
                <input
                  type="email"
                  name="email"
                  placeholder="hello@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-all duration-300 hover:border-gray-400 focus:border-blue-500"
                  style={{ 
                    borderColor: '#E5E7EB',
                    color: textColor,
                    backgroundColor: 'white'
                  }}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium" style={{ color: textColor }}>
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    className="text-xs hover:underline transition-all duration-300 hover:text-blue-600"
                    style={{ color: primaryColor }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative transition-all duration-300 hover:scale-[1.02]">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300" style={{ color: textLight }} size={14} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-all duration-300 hover:border-gray-400"
                  style={{ 
                    borderColor: '#E5E7EB',
                    color: textColor,
                    backgroundColor: 'white'
                  }}
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 p-1 rounded transition-all duration-300 hover:scale-110"
                  style={{ color: textLight }}
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs mt-1 transition-all duration-300" style={{ color: textLight }}>
                  At least 8 characters with letters and numbers
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="flex items-start space-x-2 animate-slideDown">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="h-4 w-4 mt-0.5 rounded transition-all duration-300 hover:scale-110"
                  style={{ 
                    borderColor: primaryColor,
                    accentColor: primaryColor
                  }}
                />
                <label htmlFor="terms" className="text-xs" style={{ color: textLight }}>
                  I agree to the{" "}
                  <button type="button" className="font-medium hover:underline transition-all duration-300" style={{ color: primaryColor }}>
                    Terms
                  </button>{" "}
                  and{" "}
                  <button type="button" className="font-medium hover:underline transition-all duration-300" style={{ color: primaryColor }}>
                    Privacy Policy
                  </button>
                </label>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded transition-all duration-300 hover:scale-110"
                    style={{ 
                      borderColor: primaryColor,
                      accentColor: primaryColor
                    }}
                  />
                  <label htmlFor="remember" className="text-xs" style={{ color: textLight }}>
                    Remember me
                  </label>
                </div>
              </div>
            )}

            {/* زر الإرسال الرئيسي */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg font-medium text-white text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                backgroundColor: primaryColor,
                backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* دخول كضيف */}
            <div className="relative my-4 transition-all duration-300">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t transition-all duration-300" style={{ borderColor: '#E5E7EB' }}></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-xs transition-all duration-300" style={{ backgroundColor: backgroundColor, color: textLight }}>
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-md border flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] group"
              style={{ 
                borderColor: '#E5E7EB',
                color: textColor,
                backgroundColor: 'white'
              }}
            >
              <ShoppingBag size={16} className="transition-transform duration-300 group-hover:scale-110" style={{ color: primaryColor }} />
              <span>Continue as Guest</span>
            </button>

            {/* رابط التبديل */}
            <div className="text-center pt-3 transition-all duration-300">
              <p className="text-xs" style={{ color: textLight }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={handleToggleForm}
                  className="font-medium hover:underline transition-all duration-300 hover:text-blue-600"
                  style={{ color: primaryColor }}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </form>

          {/* فوتر الصفحة */}
          <div className="text-center mt-8 pt-4 border-t transition-all duration-300" style={{ borderColor: '#E5E7EB' }}>
            <p className="text-xs" style={{ color: textLight }}>
              © 2024 Gallery Furniture.{" "}
              <button type="button" className="hover:underline transition-all duration-300" style={{ color: primaryColor }}>
                Privacy
              </button>{" "}
              •{" "}
              <button type="button" className="hover:underline transition-all duration-300" style={{ color: primaryColor }}>
                Terms
              </button>
            </p>
          </div>
        </div>
      </div>
      
      {/* إضافة أنماط CSS للحركات */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        /* تحسين الانتقالات العامة */
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}