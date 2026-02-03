import API from "../../services/axios";

const productService = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    const response = await API.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  getProductById: async (productId) => {
    const response = await API.get(`/products/${productId}`);
    return response.data;
  },

  // Create new product (admin only)
  createProduct: async (productData) => {
    const response = await API.post('/products', productData);
    return response.data;
  },

  // Update product
  updateProduct: async (productId, productData) => {
    const response = await API.put(`/products/${productId}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (productId) => {
    const response = await API.delete(`/products/${productId}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await API.get(`/products/category/${category}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query) => {
    const response = await API.get(`/products/search?q=${query}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await API.get('/products/featured');
    return response.data;
  },

  // Get related products
  getRelatedProducts: async (productId) => {
    const response = await API.get(`/products/${productId}/related`);
    return response.data;
  },
};

export default productService;