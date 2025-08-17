import { useNavigate } from "react-router-dom";
import type { ProductInterface } from "../store/types";
import { useStore } from "../store/store"; // your zustand store

interface BuyNowButtonProps {
  product: ProductInterface;
}

const BuyNowButton = ({ product }: BuyNowButtonProps) => {
  const navigate = useNavigate();
  const { startCheckoutBuyNow } = useStore();

  return (
    <button
      onClick={() => {
        startCheckoutBuyNow(product); // put product into checkout
        navigate("/checkout/123"); // go to checkout page
      }}
      className="flex-1 cursor-pointer py-3.5 px-6 rounded-md font-semibold bg-gray-900 text-white hover:bg-black hover:shadow-md transition-all duration-300"
    >
      Buy Now
    </button>
  );
};

interface AddToCartButtonProps {
  product: ProductInterface;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart } = useStore();

  return (
    <button
      onClick={() => addToCart(product)}
      className="flex-1 cursor-pointer py-3.5 px-6 rounded-md font-semibold border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 hover:shadow transition-all duration-300"
    >
      Add to Cart
    </button>
  );
};

export { AddToCartButton, BuyNowButton };
