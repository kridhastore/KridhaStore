import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Eye, AlertTriangle } from "lucide-react";
import { useProductStore } from "../../store/productStore";
import type { ProductInterface as Product } from "../../types/product.types";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, removeProduct, loading } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`Delete "${product.title}"?`)) {
      removeProduct(product._id);
    }
  };

  const handleEditProduct = (product: Product) => {
    navigate(`/products/edit/${product._id}`, { state: product });
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => navigate("/products/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              {product.stock === 0 && (
                <div className="absolute top-2 left-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Out of Stock
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                <span
                  className={`text-sm font-medium ${
                    product.stock > 10
                      ? "text-green-600"
                      : product.stock > 0
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  Stock: {product.stock}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    className="p-1 text-gray-500 hover:text-blue-600"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 text-gray-500 hover:text-amber-600"
                    title="Edit product"
                  >
                    <Edit
                      className="w-4 h-4"
                      onClick={() => handleEditProduct(product)}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product)}
                    className="p-1 text-gray-500 hover:text-red-600"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  Added {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ProductList;
