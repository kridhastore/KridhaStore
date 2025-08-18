import React, { useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, DollarSign, CreditCard, AlertCircle } from "lucide-react";
import { useAnalyticsStore } from "../store/analyticsStore";
import Spinner from "../components/Spinner";

const Analytics: React.FC = () => {
  const { analytics, fetchAnalytics, loading } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const pieData = analytics
    ? [
        {
          name: "Completed",
          value: analytics.completedTransactions,
          color: "#10B981",
        },
        {
          name: "Pending",
          value: analytics.pendingTransactions,
          color: "#F59E0B",
        },
        {
          name: "Failed",
          value: analytics.failedTransactions,
          color: "#EF4444",
        },
      ]
    : [];

  if (loading) {
    return <Spinner />;
  }

  if (!analytics) {
    return (
      <div className="py-12 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">Unable to load analytics data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatCurrency(analytics.totalRevenue)}
              </p>
              <p className="mt-1 text-sm text-green-600">
                All payments received
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Profit</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatCurrency(analytics.totalProfit)}
              </p>
              <p className="mt-1 text-sm text-blue-600">
                {analytics.profitMargin}% margin
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Transactions
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {analytics.totalTransactions}
              </p>
              <p className="mt-1 text-sm text-purple-600">All time</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Payments
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {analytics.pendingTransactions}
              </p>
              <p className="mt-1 text-sm text-amber-600">
                Awaiting confirmation
              </p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Daily Transactions Chart */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Daily Transactions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.dailyTransactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-IN")
                }
                formatter={(value: number, name: string) => {
                  if (name === "revenue") {
                    return [formatCurrency(value), "Revenue"];
                  }
                  return [value, "Transactions"];
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Transactions"
                dot={{ fill: "#3B82F6", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                name="Revenue (₹)"
                dot={{ fill: "#10B981", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Status Pie Chart */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Transaction Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [value, "Transactions"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 border border-green-200 rounded-lg bg-green-50">
          <h4 className="mb-2 font-semibold text-green-800">
            Completed Transactions
          </h4>
          <p className="text-2xl font-bold text-green-900">
            {analytics.completedTransactions}
          </p>
          <p className="mt-1 text-sm text-green-600">
            {(
              (analytics.completedTransactions / analytics.totalTransactions) *
              100
            ).toFixed(1)}
            % success rate
          </p>
        </div>

        <div className="p-6 border rounded-lg bg-amber-50 border-amber-200">
          <h4 className="mb-2 font-semibold text-amber-800">
            Pending Transactions
          </h4>
          <p className="text-2xl font-bold text-amber-900">
            {analytics.pendingTransactions}
          </p>
          <p className="mt-1 text-sm text-amber-600">Require attention</p>
        </div>

        <div className="p-6 border border-red-200 rounded-lg bg-red-50">
          <h4 className="mb-2 font-semibold text-red-800">
            Failed Transactions
          </h4>
          <p className="text-2xl font-bold text-red-900">
            {analytics.failedTransactions}
          </p>
          <p className="mt-1 text-sm text-red-600">
            {(
              (analytics.failedTransactions / analytics.totalTransactions) *
              100
            ).toFixed(1)}
            % failure rate
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
