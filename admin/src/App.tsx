import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";

import ProductList from "./pages/Products/ProductList";
import { AddProduct } from "./pages/Products/AddProduct";
import { EditProduct } from "./pages/Products/EditProduct";
import ViewProduct from "./pages/Products/ViewProducts";

const App = () => {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* Sidebar fixed on the left */}
      <div className="w-64 bg-gray-900 text-white fixed h-screen">
        <Sidebar />
      </div>

      {/* Main content shifted right */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/analytics" element={<Analytics />} />

          {/* Product Routes */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/view/:id" element={<ViewProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
