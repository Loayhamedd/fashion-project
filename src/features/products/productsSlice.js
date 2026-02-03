import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  filteredProducts: [],
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'latest',
  currentPage: 1,
  totalPages: 1,
  productsPerPage: 12,
};

// Async thunks
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (params, thunkAPI) => {
    try {
      return await productService.getProducts(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getById',
  async (productId, thunkAPI) => {
    try {
      return await productService.getProductById(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    filterProducts: (state) => {
      let filtered = [...state.products];
      
      // Filter by category
      if (state.selectedCategory) {
        filtered = filtered.filter(
          product => product.category === state.selectedCategory
        );
      }
      
      // Filter by search query
      if (state.searchQuery) {
        filtered = filtered.filter(
          product => 
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      
      // Sort products
      switch (state.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'latest':
        default:
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      // Pagination
      const startIndex = (state.currentPage - 1) * state.productsPerPage;
      const endIndex = startIndex + state.productsPerPage;
      state.filteredProducts = filtered.slice(startIndex, endIndex);
      state.totalPages = Math.ceil(filtered.length / state.productsPerPage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.filteredProducts = action.payload.slice(0, state.productsPerPage);
        state.totalPages = Math.ceil(action.payload.length / state.productsPerPage);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { 
  resetProducts, 
  setSearchQuery, 
  setSelectedCategory, 
  setSortBy,
  setCurrentPage,
  filterProducts 
} = productsSlice.actions;

export default productsSlice.reducer;