import React, { useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  Package,
  AlertCircle,
} from "lucide-react";
import { useAnalyticsStore } from "../store/analyticsStore";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
import Spinner from "../components/Spinner";

interface OverviewProps {
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<OverviewProps> = () => {
  const { analytics, fetchAnalytics, loading } = useAnalyticsStore();
  const { products, fetchProducts } = useProductStore();
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchAnalytics();
    fetchProducts();
    fetchUsers();
  }, [fetchAnalytics, fetchProducts, fetchUsers]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const stats = [
    {
      title: "Total Revenue",
      value: analytics ? formatCurrency(analytics.totalRevenue) : "₹0",
      icon: DollarSign,
      color: "bg-green-500",
      change: "+12.5%",
    },
    {
      title: "Total Profit",
      value: analytics ? formatCurrency(analytics.totalProfit) : "₹0",
      icon: TrendingUp,
      color: "bg-blue-500",
      change: `${analytics?.profitMargin || 0}% margin`,
    },
    {
      title: "Transactions",
      value: analytics?.totalTransactions.toString() || "0",
      icon: CreditCard,
      color: "bg-purple-500",
      change: `${analytics?.pendingTransactions || 0} pending`,
    },
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: Users,
      color: "bg-orange-500",
      change: `${users.filter((u) => u.status === "active").length} active`,
    },
    {
      title: "Total Products",
      value: products.length.toString(),
      icon: Package,
      color: "bg-teal-500",
      change: `${products.filter((p) => p.stock === 0).length} out of stock`,
    },
  ];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab("products")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add New Product
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Process Pending Orders
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Generate Sales Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Low Stock Alert
                </p>
                <p className="text-xs text-amber-600">
                  Gaming Mouse is out of stock
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Pending Payments
                </p>
                <p className="text-xs text-blue-600">
                  3 transactions awaiting confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
