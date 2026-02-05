import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { addToCartSync } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("#8B7355");
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("newCollectionFavorites") || "[]",
    );
    setIsFavorite(favorites.includes(parseInt(id)));

    const savedProduct = localStorage.getItem("selectedProduct");
    if (savedProduct) {
      const parsedProduct = JSON.parse(savedProduct);
      if (parsedProduct.id.toString() === id) {
        setProduct(parsedProduct);
        return;
      }
    }

    const defaultProduct = {
      id: parseInt(id),
      name: "Nordic Chair",
      type: "Drop type",
      description:
        "Fill out your data and select the required service and we will respond to you as soon as possible.",
      price: 2600,
      rating: 4.5,
      colors: ["#8B7355", "#2C3E50", "#BDC3C7", "#E74C3C", "#3498DB"],
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    };

    setProduct(defaultProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      description: `${product.type} - ${product.name}`,
      category: "Chairs",
    };

    dispatch(addToCartSync(cartItem));

    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: "top-right",
      icon: "🛒",
      style: {
        background: "#10B981",
        color: "white",
        borderRadius: "10px",
        borderLeft: "4px solid #059669",
      },
    });
  };

  const handleToggleFavorite = () => {
    if (!product) return;

    const favorites = JSON.parse(
      localStorage.getItem("newCollectionFavorites") || "[]",
    );
    const productId = product.id;

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((id) => id !== productId);

      toast.success(`"${product.name}" removed from wishlist!`, {
        duration: 3000,
        position: "top-right",
        icon: "💔",
        style: {
          background: "#8B7355",
          color: "white",
          borderRadius: "10px",
          borderLeft: "4px solid #6B5A45",
        },
      });
    } else {
      updatedFavorites = [...favorites, productId];

      toast.success(`"${product.name}" added to wishlist!`, {
        duration: 3000,
        position: "top-right",
        icon: "❤️",
        style: {
          background: "#EF4444",
          color: "white",
          borderRadius: "10px",
          borderLeft: "4px solid #DC2626",
        },
      });
    }

    localStorage.setItem(
      "newCollectionFavorites",
      JSON.stringify(updatedFavorites),
    );
    setIsFavorite(!isFavorite);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);

    toast(`Color changed to ${getColorName(color)}`, {
      duration: 2000,
      position: "top-right",
      icon: "🎨",
      style: {
        background: color,
        color: "#FFFFFF",
        borderRadius: "10px",
      },
    });
  };

  const getColorName = (hexColor) => {
    const colorMap = {
      "#8B7355": "Brown",
      "#2C3E50": "Navy Blue",
      "#BDC3C7": "Silver",
      "#E74C3C": "Red",
      "#3498DB": "Blue",
      "#7D3C98": "Purple",
      "#F39C12": "Orange",
      "#27AE60": "Green",
    };
    return colorMap[hexColor] || "Selected Color";
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const alsoLikeProducts = [
    {
      id: 4,
      name: "Modern Sofa",
      price: "3200$",
      image:
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#7D3C98", "#F39C12"],
    },
    {
      id: 5,
      name: "Lounge Chair",
      price: "2800$",
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#E74C3C", "#F1C40F", "#9B59B6"],
    },
    {
      id: 6,
      name: "Office Chair",
      price: "2400$",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#27AE60", "#3498DB"],
    },
  ];

  const relatedProducts = [
    {
      id: 7,
      name: "Wooden Table",
      price: "1800$",
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#8B7355", "#27AE60", "#F39C12"],
    },
    {
      id: 8,
      name: "Accent Chair",
      price: "1500$",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#E74C3C", "#3498DB", "#F39C12"],
    },
    {
      id: 9,
      name: "Bookshelf",
      price: "2200$",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["#2C3E50", "#8B7355", "#BDC3C7"],
    },
  ];

  const handleAlsoLikeAddToCart = (alsoLikeProduct) => {
    const cartItem = {
      id: alsoLikeProduct.id,
      name: alsoLikeProduct.name,
      price: parseInt(alsoLikeProduct.price),
      image: alsoLikeProduct.image,
      quantity: 1,
      description: `Suggested product: ${alsoLikeProduct.name}`,
      category: "Chairs",
    };

    dispatch(addToCartSync(cartItem));

    toast.success(`${alsoLikeProduct.name} added to cart!`, {
      duration: 3000,
      position: "top-right",
      icon: "✨",
      style: {
        background: "#8B7355",
        color: "white",
        borderRadius: "10px",
        borderLeft: "4px solid #6B5A45",
      },
    });
  };

  const handleRelatedAddToCart = (relatedProduct) => {
    const cartItem = {
      id: relatedProduct.id,
      name: relatedProduct.name,
      price: parseInt(relatedProduct.price),
      image: relatedProduct.image,
      quantity: 1,
      description: `Related product: ${relatedProduct.name}`,
      category: "Furniture",
    };

    dispatch(addToCartSync(cartItem));

    toast.success(`${relatedProduct.name} added to cart!`, {
      duration: 3000,
      position: "top-right",
      icon: "📦",
      style: {
        background: "#2C3E50",
        color: "white",
        borderRadius: "10px",
        borderLeft: "4px solid #1a2530",
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-26 mb-10">
          <div className="relative w-[460px]">
            <div className="h-[680px] w-[460px] overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4 mt-18 ml-[-250px] max-w-lg">
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {product.type}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
                {product.name}
              </h1>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="mt-26">
              <span className="text-3xl font-bold text-gray-900 ">
                ${product.price}
              </span>
              <div className="flex items-center mt-2">

                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={30}
                    className={`
                      ${
                        index < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : index < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                      }
                    `}
                  />
                ))}
                <span className="ml-2 text-gray-600">({product.rating})</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Select Color
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(color)}
                    className={`
                      w-12 h-12 rounded-full border-4 transition-all duration-300
                      ${
                        selectedColor === color
                          ? "border-gray-800 scale-110"
                          : "border-white hover:border-gray-300"
                      }
                    `}
                    style={{ backgroundColor: color }}
                    title={`${getColorName(color)} color`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Selected:{" "}
                <span className="font-medium">
                  {getColorName(selectedColor)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-14 pt-6">
              
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-4 bg-[#FFFFFF] border-2 border-gray-300 hover:bg-gray-200 text-black px-12 py-6 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <ShoppingCart size={26} />
                Add To Cart
              </button>

              <button
                onClick={handleToggleFavorite}
                className={`
                  p-6 rounded-full border-2 transition-all duration-300
                  hover:scale-105 active:scale-95
                  ${
                    isFavorite
                      ? "border-red-500 bg-red-50 hover:bg-red-100"
                      : "border-gray-300 hover:border-gray-400"
                  }
                `}
                title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={34}
                  className={`
                    transition-all duration-300
                    ${
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }
                  `}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alsoLikeProducts.map((alsoLikeProduct) => (
              <div key={alsoLikeProduct.id} className="group relative">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {alsoLikeProduct.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                      title={`${getColorName(color)} color`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleAlsoLikeAddToCart(alsoLikeProduct)}
                  className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  title={`Add ${alsoLikeProduct.name} to cart`}
                >
                  <ShoppingCart size={20} className="text-gray-700" />
                </button>

                <Link to={`/product/${alsoLikeProduct.id}`}>
                  <div className="h-64 overflow-hidden rounded-2xl bg-gray-100 mb-4">
                    <img
                      src={alsoLikeProduct.image}
                      alt={alsoLikeProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {alsoLikeProduct.name}
                    </h3>
                    <div className="text-lg font-bold text-gray-900">
                      {alsoLikeProduct.price}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">

                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {relatedProduct.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                      title={`${getColorName(color)} color`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleRelatedAddToCart(relatedProduct)}
                  className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  title={`Add ${relatedProduct.name} to cart`}
                >
                  <ShoppingCart size={20} className="text-gray-700" />
                </button>

                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="h-64 overflow-hidden rounded-2xl bg-gray-100 mb-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="text-lg font-bold text-gray-900">
                      {relatedProduct.price}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
