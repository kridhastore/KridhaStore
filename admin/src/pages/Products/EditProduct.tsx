import React, { useEffect, useState } from "react";
import { useProductStore } from "../../store/productStore";
import type { ProductInterface as Product } from "../../types/product.types";
import { useParams } from "react-router-dom";

export const EditProduct = () => {
  const { fetchProducts, products, updateProduct } = useProductStore();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    category_id: "",
    brand: "",
    price: "",
    stock: "",
    availabilityStatus: "In Stock" as "In Stock" | "Out of Stock" | "Preorder",
    thumbnail: "",
    images: [] as string[],
    tags: [] as string[],
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // prefill when products are loaded
  useEffect(() => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setFormData({
        title: product.title,
        slug: product.slug,
        description: product.description,
        category: product.category,
        category_id: product.category_id,
        brand: product.brand,
        price: String(product.price),
        stock: String(product.stock),
        availabilityStatus: product.availabilityStatus,
        thumbnail: product.thumbnail,
        images: product.images,
        tags: product.tags,
      });
    }
  }, [products, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Partial<Product> = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      category: formData.category,
      category_id: formData.category_id,
      brand: formData.brand,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      availabilityStatus: formData.availabilityStatus,
      thumbnail:
        formData.thumbnail ||
        "https://via.placeholder.com/200x200.png?text=Product",
      images: formData.images,
      tags: formData.tags,
    };

    if (id) {
      updateProduct(id, updated); // 🔥 update instead of add
    }
  };

  return (
    <div className="flex items-start justify-center">
      {/* Image Upload Section */}
      <div className="w-1/3 bg-white rounded-lg p-4 mr-6 shadow">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Product Image</h3>

        {formData.thumbnail ? (
          <img
            src={formData.thumbnail}
            alt="Thumbnail Preview"
            className="w-full h-48 object-cover rounded-md mb-3 border"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center border rounded-md text-gray-400 mb-3">
            No Image
          </div>
        )}

        <input
          type="url"
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={(e) =>
            setFormData({ ...formData, thumbnail: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Additional image URLs (comma separated)"
          value={formData.images.join(",")}
          onChange={(e) =>
            setFormData({
              ...formData,
              images: e.target.value.split(",").map((i) => i.trim()),
            })
          }
          rows={2}
          className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Form Section */}
      <div className="w-2/3 bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Basic Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Title *"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Slug (auto if empty)"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Description
            </h3>
            <textarea
              placeholder="Product Description *"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pricing & Stock */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Pricing & Stock
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Price *"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Stock *"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category & Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Category & Brand
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category *"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Category ID"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Tags</h3>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  title: "",
                  slug: "",
                  description: "",
                  category: "",
                  category_id: "",
                  brand: "",
                  price: "",
                  stock: "",
                  availabilityStatus: "In Stock",
                  thumbnail: "",
                  images: [],
                  tags: [],
                })
              }
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
