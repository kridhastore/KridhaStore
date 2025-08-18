import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinedAt: string;
  lastOrderAt?: string;
}

interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 9876543210',
    totalOrders: 5,
    totalSpent: 25990,
    status: 'active',
    joinedAt: '2024-12-01',
    lastOrderAt: '2025-01-15',
  },
  {
    id: '2',
    name: 'Priya Singh',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    totalOrders: 3,
    totalSpent: 4797,
    status: 'active',
    joinedAt: '2024-11-15',
    lastOrderAt: '2025-01-15',
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit@example.com',
    phone: '+91 9876543212',
    totalOrders: 1,
    totalSpent: 4898,
    status: 'active',
    joinedAt: '2025-01-10',
    lastOrderAt: '2025-01-15',
  },
  {
    id: '4',
    name: 'Sunita Gupta',
    email: 'sunita@example.com',
    phone: '+91 9876543213',
    totalOrders: 2,
    totalSpent: 1798,
    status: 'inactive',
    joinedAt: '2024-10-20',
    lastOrderAt: '2024-12-25',
  },
];

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  
  fetchUsers: async () => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 600));
    set({ users: mockUsers, loading: false });
  },
}));