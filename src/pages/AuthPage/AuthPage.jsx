import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "./AuthPage.css";


import frontImg from "../../assets/fashion/login-front.webp";
import backImg from "../../assets/fashion/login-back.webp";

export default function AuthPageComponent() { //   
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const pinkPrimary = "#ec4899";
  const pinkDark = "#be185d";
  const pinkHover = "#d81b60";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      navigate("/dashboard");
    } else {
      setIsLogin(true);
    }
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="container max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg relative overflow-hidden">
        {/* Cover Section */}
        <div className={`cover ${!isLogin ? 'flipped' : ''}`}>
          {/* Front Cover */}
          <div className="face">
            <img src={frontImg} alt="Fashion Front" />
            <div className="text-overlay">
              <span className="text-1">Every new style is a<br />new expression</span>
              <span className="text-2">Let's get fashionable</span>
            </div>
          </div>
          
          {/* Back Cover */}
          <div className="face back">
            <img src={backImg} alt="Fashion Back" />
            <div className="text-overlay">
              <span className="text-1">Complete your look<br />with confidence</span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        
        {/* Forms Section */}
        <div className="forms h-full w-full">
          <div className="form-content flex">
            
            {/* Login Form */}
            <div className={`login-form w-1/2 pr-8 ${isLogin ? '' : 'opacity-30 pointer-events-none'}`}>
              <div className="title relative text-2xl font-medium text-gray-800 mb-6">
                Login
                <div className="absolute left-0 bottom-0 h-1 w-10" style={{ backgroundColor: pinkPrimary }}></div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="input-boxes">
                  <div className="input-box mb-6">
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: pinkPrimary }} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full h-12 pl-10 pr-4 border rounded-lg focus:outline-none"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="input-box mb-6">
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: pinkPrimary }} />
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        className="w-full h-12 pl-10 pr-4 border rounded-lg focus:outline-none"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <a href="#" className="text-sm hover:underline" style={{ color: pinkDark }}>
                      Forgot password?
                    </a>
                  </div>
                  
                  <div className="button mb-6">
                    <button
                      type="submit"
                      className="w-full h-12 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                      style={{ 
                        backgroundColor: pinkPrimary,
                        border: 'none'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = pinkHover}
                      onMouseOut={(e) => e.target.style.backgroundColor = pinkPrimary}
                    >
                      Submit
                    </button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="font-medium hover:underline"
                      style={{ color: pinkDark }}
                    >
                      Signup now
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
\            <div className={`signup-form w-1/2 pl-8 ${!isLogin ? '' : 'opacity-30 pointer-events-none'}`}>
              <div className="title relative text-2xl font-medium text-gray-800 mb-6">
                Signup
                <div className="absolute left-0 bottom-0 h-1 w-10" style={{ backgroundColor: pinkPrimary }}></div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="input-boxes">
                  <div className="input-box mb-6">
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: pinkPrimary }} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        required
                        className="w-full h-12 pl-10 pr-4 border rounded-lg focus:outline-none"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="input-box mb-6">
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: pinkPrimary }} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full h-12 pl-10 pr-4 border rounded-lg focus:outline-none"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="input-box mb-6">
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: pinkPrimary }} />
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        className="w-full h-12 pl-10 pr-4 border rounded-lg focus:outline-none"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="button mb-6">
                    <button
                      type="submit"
                      className="w-full h-12 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                      style={{ 
                        backgroundColor: pinkPrimary,
                        border: 'none'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = pinkHover}
                      onMouseOut={(e) => e.target.style.backgroundColor = pinkPrimary}
                    >
                      Submit
                    </button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="font-medium hover:underline"
                      style={{ color: pinkDark }}
                    >
                      Login now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}