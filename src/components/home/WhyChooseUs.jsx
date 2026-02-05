import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import WhyChooseUsImage from "../../assets/why section/why.png";

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          

          <div className="order-2 lg:order-1 pl-0 lg:pl-[135px]">
            <div className="whySec mb-[250px]">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
                Why Choose Us
              </h3>
              
              <p className="text-gray-600 mb-12 text-xl leading-relaxed max-w-[500px]">
                Fill out your data and select the required service and we will respond to you as soon as possible.
              </p>
              
              <Link 
                to="/products"  
                className=" btnEx
                  inline-flex items-center gap-3 
                  bg-black hover:bg-gray-800 
                  text-white 
                  px-20 py-4 
                  rounded-3xl
                  font-semibold 
                  transition-all duration-300
                  hover:shadow-xl
                  active:scale-95
                  text-lg
                  group
                "
              >
                Explore
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 pr-0 lg:pr-[264px]">
            <div className="relative">
              <img
                src={WhyChooseUsImage}
                alt="Why Choose Us - Premium Furniture"
                className="
                  w-full 
                  h-auto
                  max-h-[550px]
                  object-cover 
                  rounded-xl 
                  shadow-2xl
                  hover:shadow-3xl
                  transition-shadow duration-300
                  ml-32
                "
                style={{
                  maxWidth: '656px',
                  minHeight: '500px'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=856&q=80";
                }}
              />
              

              <div className="
                absolute -bottom-6 -right-6 
                w-32 h-32 
                bg-[#8B7355] 
                rounded-xl 
                -z-10
                opacity-20
                hidden lg:block
              "></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;