import { create } from 'zustand';

export interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  products: Array<{ name: string; quantity: number; price: number }>;
  createdAt: string;
  completedAt?: string;
}

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
}

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    orderId: 'KS-2025-001',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul@example.com',
    amount: 11998,
    status: 'completed',
    paymentMethod: 'UPI',
    products: [
      { name: 'Wireless Headphones', quantity: 1, price: 2999 },
      { name: 'Smart Watch', quantity: 1, price: 8999 }
    ],
    createdAt: '2025-01-15T10:30:00Z',
    completedAt: '2025-01-15T10:32:00Z',
  },
  {
    id: '2',
    orderId: 'KS-2025-002',
    customerName: 'Priya Singh',
    customerEmail: 'priya@example.com',
    amount: 1599,
    status: 'completed',
    paymentMethod: 'Credit Card',
    products: [
      { name: 'Cotton T-Shirt', quantity: 2, price: 799 }
    ],
    createdAt: '2025-01-15T14:20:00Z',
    completedAt: '2025-01-15T14:21:00Z',
  },
  {
    id: '3',
    orderId: 'KS-2025-003',
    customerName: 'Amit Patel',
    customerEmail: 'amit@example.com',
    amount: 4898,
    status: 'pending',
    paymentMethod: 'Net Banking',
    products: [
      { name: 'Wireless Headphones', quantity: 1, price: 2999 },
      { name: 'Gaming Mouse', quantity: 1, price: 1899 }
    ],
    createdAt: '2025-01-15T16:45:00Z',
  },
  {
    id: '4',
    orderId: 'KS-2025-004',
    customerName: 'Sunita Gupta',
    customerEmail: 'sunita@example.com',
    amount: 8999,
    status: 'failed',
    paymentMethod: 'UPI',
    products: [
      { name: 'Smart Watch', quantity: 1, price: 8999 }
    ],
    createdAt: '2025-01-14T11:15:00Z',
  },
];

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  loading: false,
  
  fetchTransactions: async () => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ transactions: mockTransactions, loading: false });
  },
  
  updateTransactionStatus: (id, status) => {
    set(state => ({
      transactions: state.transactions.map(t => 
        t.id === id ? { 
          ...t, 
          status,
          completedAt: status === 'completed' ? new Date().toISOString() : undefined 
        } : t
      )
    }));
  },
}));