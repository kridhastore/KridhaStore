import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../store/store";
import type { ProductInterface } from "../store/types";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

const NewArrivals = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      setloading(true);
      const data = await fetchProducts();
      if (data) {
        setProducts(data);
        setloading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <section className="my-8">
        {/* Header with Subtitle and View All */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">🆕 New Arrivals</h2>

          <button
            onClick={() => navigate("/all-products")}
            className="text-sm font-semibold text-gray-600 transition hover:text-black"
          >
            View All
          </button>
        </div>

        {/* Product List */}
        <div className="overflow-x-auto md:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2 justify-start items-stretch md:justify-center">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <ProductCardSkeleton key={i} />)
              : products
                  .slice(11, 15)
                  .map((prod) => <ProductCard key={prod._id} product={prod} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewArrivals;
