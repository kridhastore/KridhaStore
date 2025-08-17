import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../store/store";
import { useEffect, useState } from "react";
import type { ProductInterface } from "../store/types";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

const AllProduct = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <section className="px-4 py-10 mx-auto max-w-7xl md:px-12">
      {/* Title and Subtitle */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold font-great-vibes md:text-4xl">
          🛍 All Products
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Explore our complete range of premium products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => <ProductCardSkeleton key={i} />)
          : products
              .slice(14, 30)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
      </div>
    </section>
  );
};

export default AllProduct;
