import { Link } from "react-router-dom";

const HeroSection = () => {
  // استخدم المسار المباشر لصورتك
  const localImage = "/src/assets/img1.png";
  const fallbackImage = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* الخلفية */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${localImage}'), url('${fallbackImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* المحتوى */}
      <div className="relative z-10 h-full flex items-center justify-center px-2 text-center">
        <div className="max-w-3xl">
          <h1 className="text-white font-bold ">
            <div className="text-2xl md:text-5xl lg:text-5xl leading-tight">
              Find The Perfect Furniture
            </div>
            <div className="text-2xl md:text-5xl lg:text-5xl mt-4 leading-tight">
              To Complete Your Home
            </div>
          </h1>
          
          <Link
            to="/products"
            className="btn1 mt-10 font-bold inline-block bg-white text-[#000000] 
                       px-10 py-3 rounded-lg text-lg
                       hover:bg-gray-100 transition-colors
                       shadow-lg hover:shadow-xl "
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;