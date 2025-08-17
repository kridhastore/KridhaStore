import ProductCard from "../components/ProductCard";
import { fetchProducts, fetchCollections } from "../store/store";
import { useEffect, useState } from "react";
import type { ProductInterface, CollectionInterface } from "../store/types";
import { useParams } from "react-router-dom";

const AllProduct = () => {
  const { id } = useParams<{ id: string }>();

  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [collection, setCollection] = useState<CollectionInterface | null>(
    null
  );

  useEffect(() => {
    const getCollections = async () => {
      const collectionsData = await fetchCollections();
      if (!collectionsData) return;

      const collectionData =
        collectionsData.find((item) => item._id === id) || null;
      setCollection(collectionData);

      const productsData = await fetchProducts();
      if (!productsData || !collectionData) return;

      const collectionsProducts = productsData.filter(
        (item) => String(item.category_id) === String(collectionData._id)
      );

      setProducts(collectionsProducts);
      console.log("Filtered Products:", collectionsProducts);
    };

    getCollections();
  }, [id]);

  return (
    <section className="px-4 py-10 mx-auto max-w-7xl md:px-12">
      {/* Title and Subtitle */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold font-great-vibes md:text-4xl">
          🛍 {collection?.name}
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Explore our complete range of premium products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProduct;
