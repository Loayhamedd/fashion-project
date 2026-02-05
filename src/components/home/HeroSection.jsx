import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const localImage = "/src/assets/hero section/hero.png";
  const fallbackImage = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#f3f4f6",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${localImage}'), url('${fallbackImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
        />
      </div>


      <div className="relative z-10 h-full flex items-center justify-center px-4 text-center">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-white font-bold mb-12"
            variants={lineVariants}
          >
            <motion.div 
              className="text-3xl md:text-6xl lg:text-7xl leading-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut"
              }}
            >
              Find The Perfect Furniture
            </motion.div>

          </motion.h1>
          

            <Link
              to="/products"
              className="btn1 font-bold inline-block bg-white text-black hover:bg-[#8b7355] 
                         px-14 py-4 rounded-xl text-xl
                         transition-all duration-300
                         shadow-2xl hover:shadow-3xl
                         border-2 border-transparent hover:border-gray-200"
            >
              Shop Now
            </Link>


          <motion.div 
            className="flex justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>


      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          className="w-8 h-8 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroSection;