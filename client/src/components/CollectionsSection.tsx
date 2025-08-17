import { Link } from "react-router-dom";
import { fetchCollections } from "../store/store";
import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import type { CollectionInterface } from "../store/types";
import CollectionCardSkeleton from "../skeletons/CollectionCardSkeleton";

const Collection = () => {
  const [collectionData, setCollectionData] = useState<CollectionInterface[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCollections = async () => {
      setLoading(true);
      const data = await fetchCollections();
      if (data) {
        setCollectionData(data);
        setLoading(false);
      }
    };
    getCollections();
  }, []);

  return (
    <section className=" mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">🎨 Collections</h2>
        <Link
          to="/collections"
          className="text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          View All
        </Link>
      </div>

      {/* collectionsGrid */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 md:grid-cols-4 lg:grid-cols-5">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, i) => <CollectionCardSkeleton key={i} />)
          : collectionData
              .slice(0, 6)
              .map((collection, index) => (
                <CollectionCard
                  key={collection._id}
                  _id={collection._id}
                  name={collection.name}
                  slug={collection.slug}
                  image={collection.image}
                  className={`${index === 5 ? "md:hidden" : ""}`}
                />
              ))}
      </div>
    </section>
  );
};

export default Collection;
