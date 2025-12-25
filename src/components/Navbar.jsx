// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 z-50">

      <div className="text-2xl font-bold text-pink-500">FashionStore</div>

      <div className="flex space-x-8 mx-auto">
        <Link to="/" className="text-gray-700 hover:text-pink-500 transition duration-300">
          Home
        </Link>
        <Link to="/auth" className="text-gray-700 hover:text-pink-500 transition duration-300">
          Login / Register
        </Link>
        <Link to="/profile" className="text-gray-700 hover:text-pink-500 transition duration-300">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
