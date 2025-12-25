// src/pages/NotFound.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center px-4">
      <Navbar />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
