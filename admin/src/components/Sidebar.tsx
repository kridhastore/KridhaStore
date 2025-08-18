import {
  LayoutDashboard,
  Package,
  CreditCard,
  Users,
  BarChart3,
  Store,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { id: "products", label: "Products", icon: Package, to: "/products" },
  { id: "orders", label: "Orders", icon: CreditCard, to: "orders" },
  { id: "users", label: "Users", icon: Users, to: "users" },
  { id: "analytics", label: "Analytics", icon: BarChart3, to: "analytics" },
];

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <Store className="w-8 h-8 mr-3 text-blue-400" />
        <div>
          <h1 className="text-xl font-bold">Kridha Store</h1>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </div>
      </div>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              to={item.to}
              key={item.id}
              className={({ isActive }) =>
                `w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
