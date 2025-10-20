import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([]);
  const loading = ref(false);

  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + (item.quantity || 1), 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  });

  const isEmpty = computed(() => items.value.length === 0);

  // Actions
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        ...product,
        quantity
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(items.value));
  };

  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId);
    if (index > -1) {
      items.value.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(items.value));
    }
  };

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(items.value));
      }
    }
  };

  const clearCart = () => {
    items.value = [];
    localStorage.removeItem('cart');
  };

  const loadFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart);
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        items.value = [];
      }
    }
  };

  const getItemQuantity = (productId) => {
    const item = items.value.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return items.value.some(item => item.id === productId);
  };

  // Initialize from localStorage
  loadFromStorage();

  return {
    // State
    items,
    loading,
    
    // Getters
    totalItems,
    totalPrice,
    isEmpty,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadFromStorage,
    getItemQuantity,
    isInCart
  };
});
