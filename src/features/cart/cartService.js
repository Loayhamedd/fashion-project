import API from "../../services/axios";

const cartService = {
  // Add item to cart (backend API)
  addToCart: async (productId, quantity) => {
    const response = await API.post('/cart', { productId, quantity });
    return response.data;
  },

  // Remove item from cart (backend API)
  removeFromCart: async (productId) => {
    const response = await API.delete(`/cart/${productId}`);
    return response.data;
  },

  // Get cart items
  getCart: async () => {
    const response = await API.get('/cart');
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (productId, quantity) => {
    const response = await API.put(`/cart/${productId}`, { quantity });
    return response.data;
  },

  // Clear cart
  clearCart: async () => {
    const response = await API.delete('/cart/clear');
    return response.data;
  },
};

export default cartService;