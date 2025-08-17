import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { ProductInterface } from "../store/types";
import { fetchProducts } from "../store/store";
import ProductDetailSkeleton from "../skeletons/ProductDetailSkeleton";
import ProductCard from "../components/ProductCard";
import { AddToCartButton, BuyNowButton } from "../components/Buttons";

const ProductDetail = () => {
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductInterface[]>(
    []
  );
  const [mainImage, setMainImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();

      if (data) {
        const foundProduct = data.find((item) => item._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setMainImage(foundProduct.images[0]);

          // Related products (just pick 4 random for now)
          const others = data.filter((item) => item._id !== id).slice(0, 4);
          setRelatedProducts(others);
        }
      }

      setLoading(false);
    };

    getProducts();
  }, [id]);

  if (loading || !product) return <ProductDetailSkeleton />;

  return (
    <div className="min-h-screen text-black bg-white">
      <div className="px-4 py-12 mx-auto max-w-7xl md:px-12 lg:px-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* LEFT: Product Images + Buttons */}
          <div className="flex flex-col items-center gap-4">
            {/* Main Image */}
            <div className="relative w-full max-w-lg">
              <img
                src={mainImage}
                alt={product.title}
                className="object-cover w-full aspect-square rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex overflow-x-auto gap-4 w-full max-w-lg scrollbar-hide">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`min-w-[80px] h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 shadow-sm ${
                      mainImage === image
                        ? "border-[#f75c5c] ring-1 ring-[#fee1dd] shadow-md "
                        : "border-transparent hover:border-[#fbb6b6] hover:shadow"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`thumbnail-${index}`}
                      className="object-cover w-full h-full rounded-2xl"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-lg sm:flex-row mt-2">
              <AddToCartButton product={product} />
              <BuyNowButton product={product} />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col gap-3 justify-start">
            <span>
              <p className="tracking-widest uppercase text-sm text-gray-500">
                {product.brand}
              </p>
              <h2 className="text-3xl font-bold">{product.title}</h2>
            </span>

            {/* Price */}
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f75c5c] via-[#fb7185] to-[#fee1dd]">
              ₹{product.price.toLocaleString()}
            </p>

            {/* Description */}
            {product.features && (
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Description
                </h3>
                <ul className="space-y-1 list-disc list-outside pl-4 text-gray-600">
                  {product.features.split(",").map((feature, index) => (
                    <li key={index}>{feature.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shipping Info */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                Shipping
              </h3>
              <ul className="text-gray-600 list-disc list-outside space-y-1 pl-4">
                <li>Estimated Delivery: 7–10 Working Days</li>
                <li>Shipping Partner: BlueDart / Delhivery</li>
                <li>Tracking ID will be shared after dispatch</li>
              </ul>
            </div>

            {/* Return Policy */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                Return & Refund
              </h3>
              <ul className="text-gray-600 list-disc list-outside space-y-1 pl-4">
                <li>No returns or refunds once order is placed</li>
                <li>Product is custom-made & non-refundable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-6 text-2xl font-bold text-center">
              You might also like
            </h3>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
