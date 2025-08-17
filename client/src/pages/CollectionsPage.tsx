import { fetchCollections } from "../store/store";
import { useEffect, useState } from "react";
import CollectionCard from "../components/CollectionCard";
import type { CollectionInterface } from "../store/types";
import CollectionCardSkeleton from "../skeletons/CollectionCardSkeleton";

const Collections = () => {
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

  // if (collectionData.length === 0) return <Spinner />;

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-semibold text-center font-great-vibes">
        Our Collections
      </h1>

      <div className="grid grid-cols-3 gap-3 md:gap-6 md:grid-cols-4 lg:grid-cols-5">
        {loading
          ? Array(10)
              .fill(0)
              .map((_, i) => <CollectionCardSkeleton key={i} />)
          : collectionData.map((collection) => (
              <CollectionCard
                key={collection._id}
                _id={collection._id}
                name={collection.name}
                slug={collection.slug}
                image={collection.image}
              />
            ))}
      </div>
    </div>
  );
};

export default Collections;
