import { Star } from "lucide-react";
import rec1 from "../../assets/recommend/rec1.png"
import rec2 from "../../assets/recommend/rec2.png"
import rec3 from "../../assets/recommend/rec3.png"
import rec4 from "../../assets/recommend/rec4.png"
import rec5 from "../../assets/recommend/rec5.png"
import rec6 from "../../assets/recommend/rec6.png"
import rec7 from "../../assets/recommend/rec7.png"
import rec8 from "../../assets/recommend/rec8.png"
const OurRecommendProduct = () => {
  const products = [
    {
      id: 1,
      name: "Arm Chair",
      price: "3000$",
      rating: 5,
      image: rec1
    },
    {
      id: 2,
      name: "Arm Chair",
      price: "240.0$",
      rating: 5,
      image: rec2
    },
    {
      id: 3,
      name: "Arm Chair",
      price: "5200$",
      rating: 5,
      image: rec3
    },
    {
      id: 4,
      name: "Arm Chair",
      price: "3400$",
      rating: 5,
      image: rec4
    },
    {
      id: 5,
      name: "Arm Chair",
      price: "7000$",
      rating: 5,
      image: rec5
    },
    {
      id: 6,
      name: "Arm Chair",
      price: "3200$",
      rating: 5,
      image: rec6
    },
    {
      id: 7,
      name: "Arm Chair",
      price: "6000$",
      rating: 5,
      image: rec7
    },
    {
      id: 8,
      name: "Arm Chair",
      price: "1500.9$",
      rating: 5,
      image: rec8
    }
  ];

  return (
    <section className="pb-[1px] px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        

        {/* Section Header */}
<div className ="recommend">
  <h3 className=" lg:text-4xl font-semibold ">
    Our Recommend Product
  </h3>
</div>
        {/* Products Grid - First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {products.slice(0, 4).map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="h-56 overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="px-1">
                {/* Product Name */}
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="text-lg font-bold text-gray-800 mb-2">
                  {product.price}
                </div>
                
                {/* Rating */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid - Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.slice(4, 8).map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="h-56 overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="px-1">
                {/* Product Name */}
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="text-lg font-bold text-gray-800 mb-2">
                  {product.price}
                </div>
                
                {/* Rating */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default OurRecommendProduct;