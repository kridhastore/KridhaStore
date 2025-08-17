import { useNavigate } from "react-router-dom";
import type { ProductInterface } from "../store/types";
import { AddToCartButton } from "./Buttons";

interface ProductCardProps {
  product: ProductInterface;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.slug}/${product._id}`)}
      className="flex-shrink-0 min-w-[10rem] max-w-[12rem] md:min-w-[15rem] rounded-xl md:max-w-[17rem] p-2 transition-shadow duration-300 cursor-pointer hover:shadow-xl flex flex-col"
    >
      {/* Image */}
      <div className="w-full h-[12rem] md:h-[20rem] overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-full h-full rounded-xl transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Details */}
      <div className="p-1">
        <h2 className="overflow-hidden font-semibold text-nowrap text-md md:text-lg">
          {product.title}
        </h2>
        <p className="tracking-widest">Rs. {product.price}.00</p>
      </div>

      <AddToCartButton product={product} />
    </div>
  );
};

export default ProductCard;
