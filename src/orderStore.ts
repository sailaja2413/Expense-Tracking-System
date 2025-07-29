import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderState } from '../types';

const mockOrders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      { productId: '1', quantity: 1, price: 199.99 },
      { productId: '3', quantity: 2, price: 29.99 },
    ],
    total: 259.97,
    status: 'delivered',
    shippingAddress: '456 Customer Ave, City, State 67890',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '2',
    userId: '2',
    items: [
      { productId: '2', quantity: 1, price: 299.99 },
    ],
    total: 299.99,
    status: 'dispatched',
    shippingAddress: '456 Customer Ave, City, State 67890',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-02'),
  },
];

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: mockOrders,
      loading: false,
      
      createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newOrder: Order = {
          ...order,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set(state => ({ orders: [...state.orders, newOrder] }));
      },
      
      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date() }
              : order
          )
        }));
      },
      
      getUserOrders: (userId: string) => {
        return get().orders.filter(order => order.userId === userId);
      },
      
      getAllOrders: () => {
        return get().orders;
      },
    }),
    {
      name: 'order-storage',
    }
  )
);