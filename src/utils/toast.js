import { toast } from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
  });
};

export const showInfo = (message) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: 'ℹ️',
  });
};

export const showCartAdded = (productName) => {
  toast.success(`${productName} added to cart!`, {
    duration: 3000,
    position: 'top-right',
    icon: '🛒',
  });
};

export const showCartRemoved = (productName) => {
  toast.error(`${productName} removed from cart!`, {
    duration: 3000,
    position: 'top-right',
    icon: '🗑️',
  });
};

export const showWishlistAdded = (productName) => {
  toast(`${productName} added to wishlist!`, {
    duration: 3000,
    position: 'top-right',
    icon: '❤️',
  });
};

export const showWishlistRemoved = (productName) => {
  toast(`${productName} removed from wishlist!`, {
    duration: 3000,
    position: 'top-right',
    icon: '💔',
  });
};