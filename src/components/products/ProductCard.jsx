import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">

      <div className="h-56 overflow-hidden mb-4">
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="px-1">
        <h3 className="text-base font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        
        <div className="text-lg font-bold text-gray-800 mb-3">
          {typeof product.price === 'number' ? `${product.price}$` : product.price}
        </div>

        <button className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm">
          <ShoppingCart size={14} />
          Add To Chart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;