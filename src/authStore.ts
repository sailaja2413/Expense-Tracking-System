import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@ecommerce.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    phone: '(555) 123-4567',
    address: '123 Admin Street, City, State 12345',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'customer@example.com',
    password: 'customer123',
    name: 'John Doe',
    role: 'customer',
    phone: '(555) 987-6543',
    address: '456 Customer Ave, City, State 67890',
    createdAt: new Date('2024-01-15'),
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      register: async (userData: Partial<User> & { password: string }) => {
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
          return false;
        }
        
        const newUser: User & { password: string } = {
          id: Date.now().toString(),
          email: userData.email!,
          name: userData.name!,
          role: 'customer',
          phone: userData.phone,
          address: userData.address,
          password: userData.password,
          createdAt: new Date(),
        };
        
        mockUsers.push(newUser);
        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword, isAuthenticated: true });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateProfile: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          
          // Update in mock users array
          const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
          if (userIndex !== -1) {
            mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
          }
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Export mock users for admin access
export const getMockUsers = () => mockUsers.map(({ password, ...user }) => user);