import { useEffect, useState } from "react";

function ViewItems() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // ================= FETCH PRODUCTS =================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  // ================= ADD TO CART =================

  const addToCart = (product) => {
    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };


  // ================= INCREASE =================

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };


  // ================= DECREASE =================

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


  // ================= TOTAL =================

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );


  return (
    <div className="min-h-screen bg-[#f8f9fa] px-5 py-5">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* =====================================================
            PRODUCTS
        ====================================================== */}

        <div className="lg:col-span-8">

          {/* HEADER */}

          <div className="mb-5">

            <h2 className="text-[20px] font-semibold text-[#172b4d]">
              Shop Items
            </h2>

            <p className="text-[11px] text-gray-500 mt-1">
              Select products to create a customer order
            </p>

          </div>


          {/* NO PRODUCTS */}

          {products.length === 0 ? (

            <div
              className="
                bg-white
                border border-gray-200
                rounded-lg
                p-8
                text-center
                text-[12px]
                text-gray-500
              "
            >
              No Items Available
            </div>

          ) : (

            /* ================= PRODUCT GRID ================= */

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

              {products.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-white
                    border border-gray-200
                    rounded-lg
                    p-3
                    flex flex-col
                    hover:border-gray-300
                    transition
                  "
                >

                  {/* IMAGE */}

                  <div
                    className="
                      w-full
                      h-[125px]
                      bg-gray-50
                      border border-gray-100
                      rounded-md
                      flex
                      items-center
                      justify-center
                      overflow-hidden
                    "
                  >

                    {item.image ? (

                     <img
    src={`http://localhost:5000${item.image}`}
    alt={item.name}
    className="w-full h-full object-cover"
/>

                    ) : (

                      <span className="text-[10px] text-gray-400">
                        No Image
                      </span>

                    )}

                  </div>


                  {/* PRODUCT NAME */}

                  <h3
                    className="
                      mt-3
                      text-[13px]
                      font-semibold
                      text-[#172b4d]
                      truncate
                    "
                  >
                    {item.name}
                  </h3>


                  {/* CATEGORY */}

                  <p className="text-[10px] text-gray-500 mt-1">
                    {item.category}
                  </p>


                  {/* PRICE / STOCK */}

                  <div className="flex justify-between items-center mt-3">

                    <span className="text-[12px] font-semibold text-[#172b4d]">
                      ₹{item.price}
                    </span>

                    <span className="text-[9px] text-gray-500">
                      Stock: {item.stock}
                    </span>

                  </div>


                  {/* AVAILABILITY */}

                  <p className="text-[10px] mt-1">

                    {item.available === 1 ? (

                      <span className="text-gray-600">
                        Available
                      </span>

                    ) : (

                      <span className="text-gray-400">
                        Not Available
                      </span>

                    )}

                  </p>


                  {/* ADD CART */}

                  <button
                    onClick={() => addToCart(item)}
                    disabled={
                      item.available === 0 ||
                      item.stock <= 0
                    }
                    className="
                      mt-3
                      w-full
                      h-[34px]
                      rounded-md
                      bg-[#172b4d]
                      hover:bg-[#0f1f38]
                      disabled:bg-gray-300
                      disabled:cursor-not-allowed
                      text-white
                      text-[11px]
                      font-medium
                      transition
                    "
                  >
                    Add to Cart
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* =====================================================
            CUSTOMER ORDER
        ====================================================== */}

        <div className="lg:col-span-4">

          <div
            className="
              bg-white
              border border-gray-200
              rounded-lg
              p-5
              lg:sticky
              lg:top-5
            "
          >

            {/* ORDER HEADER */}

            <div className="border-b border-gray-200 pb-4">

              <h2 className="text-[17px] font-semibold text-[#172b4d]">
                Customer Order
              </h2>

              <p className="text-[10px] text-gray-500 mt-1">
                Selected items
              </p>

            </div>


            {/* EMPTY CART */}

            {cart.length === 0 ? (

              <div className="py-10 text-center">

                <p className="text-[12px] text-gray-400">
                  No items added
                </p>

                <p className="text-[10px] text-gray-400 mt-1">
                  Select a product to add it to the order
                </p>

              </div>

            ) : (

              /* ================= CART ================= */

              <div className="mt-2">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="py-4 border-b border-gray-100"
                  >

                    {/* NAME + PRICE */}

                    <div className="flex justify-between gap-3">

                      <div className="min-w-0">

                        <p className="text-[12px] font-medium text-[#172b4d] truncate">
                          {item.name}
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                          ₹{item.price} each
                        </p>

                      </div>

                      <span className="text-[12px] font-semibold text-[#172b4d] whitespace-nowrap">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </span>

                    </div>


                    {/* QUANTITY */}

                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        className="
                          w-[27px]
                          h-[27px]
                          border
                          border-gray-300
                          rounded-md
                          text-[14px]
                          text-gray-600
                          hover:bg-gray-100
                        "
                      >
                        −
                      </button>

                      <span className="text-[12px] font-semibold text-[#172b4d] min-w-[15px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item.id)
                        }
                        className="
                          w-[27px]
                          h-[27px]
                          border
                          border-gray-300
                          rounded-md
                          text-[14px]
                          text-gray-600
                          hover:bg-gray-100
                        "
                      >
                        +
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}


            {/* ================= TOTAL ================= */}

            <div className="border-t border-gray-200 mt-4 pt-4">

              <div className="flex justify-between items-center">

                <span className="text-[12px] text-gray-500">
                  Total
                </span>

                <span className="text-[20px] font-semibold text-[#172b4d]">
                  ₹{total.toLocaleString("en-IN")}
                </span>

              </div>


              {/* PAYMENT */}

              <button
                disabled={cart.length === 0}
                className="
                  w-full
                  mt-4
                  h-[40px]
                  rounded-md
                  bg-[#172b4c]
                  hover:bg-[#0f1f38]
                  disabled:bg-green-500
                  disabled:cursor-not-allowed
                  text-white
                  text-[12px]
                  font-medium
                  transition
                "
              >
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