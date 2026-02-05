import API from "../../services/axios";

const cartService = {
  addToCart: async (productId, quantity) => {
    const response = await API.post('/cart', { productId, quantity });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await API.delete(`/cart/${productId}`);
    return response.data;
  },

  getCart: async () => {
    const response = await API.get('/cart');
    return response.data;
  },

  updateCartItem: async (productId, quantity) => {
    const response = await API.put(`/cart/${productId}`, { quantity });
    return response.data;
  },

  clearCart: async () => {
    const response = await API.delete('/cart/clear');
    return response.data;
  },
};

export default cartService;