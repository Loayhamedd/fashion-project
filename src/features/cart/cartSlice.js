import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const cartItemsFromStorage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) 
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {},
  paymentMethod: localStorage.getItem('paymentMethod') || '',
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async thunks
export const addToCart = createAsyncThunk(
  'cart/add',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await cartService.addToCart(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId, thunkAPI) => {
    try {
      return await cartService.removeFromCart(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = {};
      state.paymentMethod = '';
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', action.payload);
    },
    // Sync actions for local cart management
    addToCartSync: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);
      
      if (existItem) {
        state.cartItems = state.cartItems.map(x => 
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCartSync: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x.product !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // أضف هذا الـ action المفقود
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find(x => x.product === productId);
      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = action.payload;
        localStorage.setItem('cartItems', JSON.stringify(action.payload));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = action.payload;
        localStorage.setItem('cartItems', JSON.stringify(action.payload));
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { 
  resetCart, 
  saveShippingAddress, 
  savePaymentMethod,
  addToCartSync,
  removeFromCartSync,
  updateCartItemQuantity  // تأكد من export هذا
} = cartSlice.actions;

export default cartSlice.reducer;

// أضف هذه الدالة المساعدة في نفس الملف (في الأسفل)
export const calculateCartTotals = (cartItems) => {
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 20;
  const taxPrice = Number((0.1 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};