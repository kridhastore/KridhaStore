import { create } from 'zustand';

export interface Analytics {
  totalRevenue: number;
  totalProfit: number;
  profitMargin: number;
  totalTransactions: number;
  pendingTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
  dailyTransactions: Array<{ date: string; count: number; revenue: number }>;
  weeklyTransactions: Array<{ week: string; count: number; revenue: number }>;
}

interface AnalyticsStore {
  analytics: Analytics | null;
  loading: boolean;
  fetchAnalytics: () => Promise<void>;
}

// Mock analytics data
const mockAnalytics: Analytics = {
  totalRevenue: 47486,
  totalProfit: 9497, // 20% profit margin
  profitMargin: 20,
  totalTransactions: 15,
  pendingTransactions: 3,
  completedTransactions: 10,
  failedTransactions: 2,
  dailyTransactions: [
    { date: '2025-01-10', count: 2, revenue: 8500 },
    { date: '2025-01-11', count: 1, revenue: 2999 },
    { date: '2025-01-12', count: 3, revenue: 12500 },
    { date: '2025-01-13', count: 2, revenue: 6800 },
    { date: '2025-01-14', count: 4, revenue: 9200 },
    { date: '2025-01-15', count: 3, revenue: 7487 },
  ],
  weeklyTransactions: [
    { week: 'Week 1', count: 5, revenue: 15000 },
    { week: 'Week 2', count: 8, revenue: 22500 },
    { week: 'Week 3', count: 2, revenue: 9986 },
  ],
};

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  analytics: null,
  loading: false,
  
  fetchAnalytics: async () => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 1200));
    set({ analytics: mockAnalytics, loading: false });
  },
}));