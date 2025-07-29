import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductState } from '../types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 25,
    status: 'available',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 15,
    status: 'available',
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable, sustainable organic cotton t-shirt in various colors and sizes.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    stock: 50,
    status: 'available',
    createdAt: new Date('2024-01-03'),
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    description: '50mm f/1.8 prime lens for professional photography with excellent bokeh.',
    price: 449.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 8,
    status: 'available',
    createdAt: new Date('2024-01-04'),
  },
  {
    id: '5',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted leather messenger bag perfect for work and travel.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    stock: 0,
    status: 'out_of_stock',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '6',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handmade ceramic coffee mugs with unique glazing patterns.',
    price: 59.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Home & Kitchen',
    stock: 30,
    status: 'available',
    createdAt: new Date('2024-01-06'),
  },
];

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      loading: false,
      
      addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => {
        const newProduct: Product = {
          ...product,
          id: Date.now().toString(),
          createdAt: new Date(),
        };
        set(state => ({ products: [...state.products, newProduct] }));
      },
      
      updateProduct: (id: string, productUpdate: Partial<Product>) => {
        set(state => ({
          products: state.products.map(p => 
            p.id === id ? { ...p, ...productUpdate } : p
          )
        }));
      },
      
      deleteProduct: (id: string) => {
        set(state => ({
          products: state.products.filter(p => p.id !== id)
        }));
      },
      
      getProduct: (id: string) => {
        return get().products.find(p => p.id === id);
      },
    }),
    {
      name: 'product-storage',
    }
  )
);