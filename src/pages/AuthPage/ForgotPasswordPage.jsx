import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      console.log('Password reset link sent to:', email);
    }, 1500);
  };

  const primaryColor = "#8B7355";
  const primaryLight = "#A38B6D";

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <FaCheckCircle size={40} className="text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h1>
          
          <p className="text-gray-600 mb-2">
            We've sent a password reset link to:
          </p>
          <p className="font-semibold text-gray-900 mb-6">{email}</p>
          
          <p className="text-gray-500 text-sm mb-8">
            Click the link in the email to reset your password. 
            If you don't see it, check your spam folder.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/auth?mode=login')}
              className="w-full py-3 bg-[#8B7355] text-white rounded-lg font-medium hover:bg-[#A38B6D] transition-colors"
            >
              Back to Login
            </button>
            
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Resend Email
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Need help? <Link to="/contact" className="text-[#8B7355] hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <Link
            to="/auth?mode=login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#8B7355] to-[#A38B6D] p-6 text-white">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">
              Forgot Password?
            </h1>
            <p className="text-white/90 text-center">
              Enter your email to reset your password
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  We'll send you a link to reset your password
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: primaryColor,
                  backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`
                }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Make sure to check your spam folder if you don't see the email in your inbox.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-600">
                Remember your password?{' '}
                <Link 
                  to="/auth?mode=login" 
                  className="font-medium text-[#8B7355] hover:underline"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Gallery Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;