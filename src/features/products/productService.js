import API from "../../services/axios";

const productService = {
  getProducts: async (params = {}) => {
    const response = await API.get('/products', { params });
    return response.data;
  },

  getProductById: async (productId) => {
    const response = await API.get(`/products/${productId}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await API.post('/products', productData);
    return response.data;
  },

  updateProduct: async (productId, productData) => {
    const response = await API.put(`/products/${productId}`, productData);
    return response.data;
  },

  deleteProduct: async (productId) => {
    const response = await API.delete(`/products/${productId}`);
    return response.data;
  },

  getProductsByCategory: async (category) => {
    const response = await API.get(`/products/category/${category}`);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await API.get(`/products/search?q=${query}`);
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await API.get('/products/featured');
    return response.data;
  },

  getRelatedProducts: async (productId) => {
    const response = await API.get(`/products/${productId}/related`);
    return response.data;
  },
};

export default productService;