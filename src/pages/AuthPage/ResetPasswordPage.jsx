import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { Lock, ArrowRight } from 'lucide-react';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      console.log('Password reset for token:', token);
      console.log('New password:', form.newPassword);
      
      setTimeout(() => {
        navigate('/auth?mode=login');
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const primaryColor = "#8B7355";
  const primaryLight = "#A38B6D";

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <FaCheckCircle size={40} className="text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Password Reset Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your password has been updated. You can now log in with your new password.
          </p>
          
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              You will be redirected to the login page in a few seconds...
            </p>
          </div>
          
          <Link
            to="/auth?mode=login"
            className="inline-block w-full py-3 bg-[#8B7355] text-white rounded-lg font-medium hover:bg-[#A38B6D] transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">

        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#8B7355] to-[#A38B6D] rounded-full flex items-center justify-center mb-4">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Set New Password
          </h1>
          <p className="text-gray-600">
            Create a new password for your account
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword.new ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.newPassword 
                      ? 'border-red-300 focus:ring-red-300 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#8B7355]/30 focus:border-[#8B7355]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.new ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Must be at least 8 characters with letters and numbers
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword 
                      ? 'border-red-300 focus:ring-red-300 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#8B7355]/30 focus:border-[#8B7355]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.confirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${form.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${/[a-z]/.test(form.newPassword) && /[A-Z]/.test(form.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Uppercase and lowercase letters
                </li>
                <li className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${/\d/.test(form.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  At least one number
                </li>
              </ul>
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
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
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
    </div>
  );
};

export default ResetPasswordPage;