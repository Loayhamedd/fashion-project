import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem('cart') 
  ? JSON.parse(localStorage.getItem('cart')) 
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = {};
      state.paymentMethod = '';
      localStorage.removeItem('cart');
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

    addToCartSync: (state, action) => {
      const item = action.payload;
      

      const existItem = state.cartItems.find(x => 
        x.id === item.id || x.productId === item.id || x.product === item.id
      );
      
      if (existItem) {
        state.cartItems = state.cartItems.map(x => 
          (x.id === item.id || x.productId === item.id || x.product === item.id) 
            ? { ...x, quantity: x.quantity + (item.quantity || 1) }
            : x
        );
      } else {
        const cartItem = {
          product: item.id,  
          id: item.id,        
          productId: item.id, 
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity || 1,
          description: item.description || `${item.name} - ${item.type || ''}`,
          category: item.category || 'General'
        };
        state.cartItems.push(cartItem);
      }
      

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeFromCartSync: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(x => 
        x.id !== productId && x.product !== productId && x.productId !== productId
      );
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find(x => 
        x.id === productId || x.product === productId || x.productId === productId
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },

    loadCartFromStorage: (state) => {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        try {
          state.cartItems = JSON.parse(cartData);
        } catch (error) {
          console.error('Error parsing cart data:', error);
          state.cartItems = [];
        }
      }
    },
  },
});

export const { 
  resetCart, 
  saveShippingAddress, 
  savePaymentMethod,
  addToCartSync,
  removeFromCartSync,
  updateCartItemQuantity,
  loadCartFromStorage
} = cartSlice.actions;

export default cartSlice.reducer;

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