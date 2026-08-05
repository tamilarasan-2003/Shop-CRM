import { useEffect, useState } from "react";

function ViewItems() {
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);

useEffect(() => {
  const savedItems =
    JSON.parse(localStorage.getItem("items")) || [];

  setProducts(savedItems);
}, []);

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* Products */}
      <div className="lg:col-span-8">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              No Items Available
            </div>
          ) : (
            products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-3 flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 md:h-40 object-cover rounded-lg"
                />

                <h3 className="mt-2 font-semibold text-sm md:text-base truncate">
                  {item.name}
                </h3>

                <div className="flex justify-between mt-2 text-sm">
                  <span className="font-bold text-green-600">
                    ₹ {item.price}
                  </span>

                  <span className="text-gray-500">
                    Stock: {item.qty}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Add Cart
                </button>
              </div>
            ))
          )}

        </div>
      </div>

      {/* Order */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-xl shadow-lg p-5 sticky top-5">

          <h2 className="text-2xl font-bold mb-4">
            Customer Order
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              No items added
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border-b py-3"
              >
                <div className="flex justify-between">
                  <span>{item.name}</span>

                  <span className="font-bold">
                    ₹ {item.price * item.quantity}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 bg-red-500 text-white rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
              Proceed to Payment
            </button>
          </div>

        </div>
      </div>

    </div>
  </div>
);
}

export default ViewItems;