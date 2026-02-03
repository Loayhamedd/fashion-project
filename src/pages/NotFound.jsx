// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ShoppingBag, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <div className="text-8xl font-bold text-gray-300">404</div>
          </div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#8B7355]/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#A38B6D]/10 rounded-full"></div>
        </div>
        
        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, categories..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#8B7355] text-white px-4 py-1 rounded-md hover:bg-[#A38B6D] transition-colors">
              Search
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
          <Link
            to="/"
            className="bg-white border border-gray-300 rounded-xl p-4 hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#8B7355] transition-colors">
              <Home size={24} className="text-gray-600 group-hover:text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Home Page</h3>
            <p className="text-sm text-gray-500">Back to homepage</p>
          </Link>
          
          <Link
            to="/products"
            className="bg-white border border-gray-300 rounded-xl p-4 hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#8B7355] transition-colors">
              <ShoppingBag size={24} className="text-gray-600 group-hover:text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Browse Products</h3>
            <p className="text-sm text-gray-500">Explore our collection</p>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="bg-white border border-gray-300 rounded-xl p-4 hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#8B7355] transition-colors">
              <ArrowLeft size={24} className="text-gray-600 group-hover:text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Go Back</h3>
            <p className="text-sm text-gray-500">Return to previous page</p>
          </button>
        </div>
        
        {/* Help Section */}
        <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
          <h3 className="font-medium text-gray-900 mb-3">Need help?</h3>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="text-[#8B7355] hover:underline text-sm">
              Contact Support
            </Link>
            <Link to="/faq" className="text-[#8B7355] hover:underline text-sm">
              View FAQ
            </Link>
            <Link to="/sitemap" className="text-[#8B7355] hover:underline text-sm">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;