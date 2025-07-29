import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState } from '../types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (productId: string, quantity: number, price: number) => {
        set(state => {
          const existingItem = state.items.find(item => item.productId === productId);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          return {
            items: [...state.items, { productId, quantity, price }]
          };
        });
      },
      
      updateItem: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      removeItem: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.productId !== productId)
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);