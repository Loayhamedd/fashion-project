// src/pages/Home.jsx
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <div className="pt-24 flex flex-col lg:flex-row items-center justify-between px-8 max-w-6xl mx-auto">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to FashionStore
          </h1>
          <p className="text-gray-600 mb-6">
            Discover the latest trends and elegant styles. Upgrade your wardrobe with our exclusive collections.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;
