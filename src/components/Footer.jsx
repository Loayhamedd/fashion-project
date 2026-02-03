import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#8b7355] py-6 rounded-t-4xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Gallery & Email */}
          <div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              Gallery
            </h2>
            <p className="text-white">
              galleryFournates1999@gmail.com
            </p>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-white hover:text-gray-800">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/category" className="text-white hover:text-gray-800">
                  Category
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white hover:text-gray-800">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-gray-800">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-white hover:text-gray-800">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white hover:text-gray-800">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-gray-800">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-gray-800">
                  About
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-white text-sm">
              © {new Date().getFullYear()} Gallery. All rights reserved.
            </p>
            
            {/* Payment Methods */}
            <div className="mt-4 md:mt-0">
              <p className="text-white text-sm mb-2">
                We accept:
              </p>
              <div className="flex gap-3">
                <span className="text-white text-xs">Visa</span>
                <span className="text-white text-xs">MasterCard</span>
                <span className="text-white text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;