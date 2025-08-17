import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartProducts,
    removeFromCart,
    addToCart,
    clearCart,
    startCheckoutFromCart,
  } = useStore();

  const total = cartProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);

  if (cartProducts.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold mb-4">No products available</h2>
        <button
          onClick={() => navigate("/")}
          className="py-2.5 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-full shadow-md hover:opacity-90 transition"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      {/* Products */}
      <div className="flex flex-col gap-6">
        {cartProducts.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-1 sm:grid-cols-3 items-center bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition gap-6"
          >
            {/* Product Info */}
            <div className="flex items-center gap-6">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-28 h-28 object-cover rounded-xl shadow-sm"
              />
              <div>
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-sm text-gray-500 mt-1">₹{product.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-start md:justify-center gap-3">
              <button
                onClick={() => removeFromCart(product._id)}
                className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full text-lg font-bold hover:bg-gray-200 transition"
              >
                –
              </button>
              <span className="min-w-[40px] text-center font-medium text-lg">
                {product.quantity}
              </span>
              <button
                onClick={() => addToCart(product)}
                className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full text-lg font-bold hover:bg-gray-200 transition"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(product._id)}
                className="ml-3 text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Total */}
            <div className="text-right font-semibold text-gray-700 text-lg sm:ml-auto">
              ₹{(product.price * product.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <h2 className="text-xl font-semibold">
          Grand Total: ₹{total.toFixed(2)}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              startCheckoutFromCart();
              navigate("/checkout/123");
            }}
            className="py-3 px-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-md font-medium hover:opacity-90 transition"
          >
            Checkout
          </button>
          <button
            onClick={clearCart}
            className="py-3 px-8 bg-white border border-gray-300 text-gray-700 rounded-full shadow-sm font-medium hover:bg-gray-100 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
