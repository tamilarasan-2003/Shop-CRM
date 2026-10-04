import { useState } from "react";
import {
  Eye,
  FileText,
  Printer,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

const sampleOrders = [
  {
    id: "ORD-1001",
    invoiceNo: "INV-2026-001",
    customer: "Arun Kumar",
    mobile: "9876543210",
    date: "02 Oct 2026",
    payment: "Paid",
    items: [
      {
        name: "Black Forest Cake",
        category: "Cake",
        price: 500,
        quantity: 2,
      },
      {
        name: "Chocolate Brownie",
        category: "Bakery",
        price: 120,
        quantity: 2,
      },
    ],
    discount: 50,
  },
  {
    id: "ORD-1002",
    invoiceNo: "INV-2026-002",
    customer: "Priya",
    mobile: "9876543211",
    date: "02 Oct 2026",
    payment: "Paid",
    items: [
      {
        name: "Chocolate Cake",
        category: "Cake",
        price: 450,
        quantity: 1,
      },
      {
        name: "Donut",
        category: "Snacks",
        price: 60,
        quantity: 4,
      },
    ],
    discount: 0,
  },
];

function OrderItem() {
  const [orders, setOrders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showInvoice, setShowInvoice] = useState(false);

  // ================= TOTAL =================

  const getSubtotal = (order) => {
    return order.items.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
          Number(item.quantity),
      0
    );
  };

  const getTotal = (order) => {
    return Math.max(
      getSubtotal(order) -
        Number(order.discount || 0),
      0
    );
  };

  // ================= GENERATE INVOICE =================

  const generateInvoice = (order) => {
    setSelectedOrder(order);
    setShowInvoice(true);
  };

  // ================= PRINT =================

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-5">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">

        <div>

          <h1 className="text-[20px] font-semibold text-[#172b4d]">
            Orders
          </h1>

          <p className="text-[11px] text-gray-500 mt-1">
            View customer orders and generate invoices
          </p>

        </div>

        <div className="mt-3 md:mt-0">

          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">

            <span className="text-[10px] text-gray-500">
              Total Orders
            </span>

            <p className="text-[16px] font-semibold text-[#172b4d]">
              {orders.length}
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          ORDER TABLE
      ====================================================== */}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        {/* TABLE HEADER */}

        <div className="px-5 py-4 border-b border-gray-200">

          <h2 className="text-[14px] font-semibold text-[#172b4d]">
            Order List
          </h2>

          <p className="text-[10px] text-gray-500 mt-1">
            Recent bakery customer orders
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-[#f8f9fc] border-b border-gray-200">

              <tr>

                <th className="text-left px-5 py-3 text-[10px] font-semibold text-gray-500">
                  ORDER
                </th>

                <th className="text-left px-5 py-3 text-[10px] font-semibold text-gray-500">
                  CUSTOMER
                </th>

                <th className="text-left px-5 py-3 text-[10px] font-semibold text-gray-500">
                  DATE
                </th>

                <th className="text-center px-5 py-3 text-[10px] font-semibold text-gray-500">
                  ITEMS
                </th>

                <th className="text-right px-5 py-3 text-[10px] font-semibold text-gray-500">
                  TOTAL
                </th>

                <th className="text-center px-5 py-3 text-[10px] font-semibold text-gray-500">
                  PAYMENT
                </th>

                <th className="text-center px-5 py-3 text-[10px] font-semibold text-gray-500">
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.id}
                  className="
                    border-b
                    border-gray-100
                    hover:bg-[#fafbff]
                    transition
                  "
                >

                  {/* ORDER */}

                  <td className="px-5 py-4">

                    <p className="text-[11px] font-semibold text-[#172b4d]">
                      {order.id}
                    </p>

                    <p className="text-[9px] text-gray-400 mt-1">
                      {order.invoiceNo}
                    </p>

                  </td>


                  {/* CUSTOMER */}

                  <td className="px-5 py-4">

                    <p className="text-[11px] font-medium text-gray-700">
                      {order.customer}
                    </p>

                    <p className="text-[9px] text-gray-400 mt-1">
                      {order.mobile}
                    </p>

                  </td>


                  {/* DATE */}

                  <td className="px-5 py-4 text-[10px] text-gray-600">
                    {order.date}
                  </td>


                  {/* ITEMS */}

                  <td className="px-5 py-4 text-center">

                    <span className="inline-flex items-center justify-center min-w-[28px] h-[24px] px-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium">
                      {order.items.length}
                    </span>

                  </td>


                  {/* TOTAL */}

                  <td className="px-5 py-4 text-right">

                    <span className="text-[12px] font-semibold text-[#172b4d]">
                      ₹{getTotal(order).toLocaleString("en-IN")}
                    </span>

                  </td>


                  {/* PAYMENT */}

                  <td className="px-5 py-4 text-center">

                    <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[9px] font-medium">
                      {order.payment}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td className="px-5 py-4">

                    <div className="flex items-center justify-center gap-2">

                      <button
                        onClick={() =>
                          generateInvoice(order)
                        }
                        className="
                          flex
                          items-center
                          gap-1.5
                          px-3
                          py-2
                          rounded-md
                          bg-[#172b4d]
                          text-white
                          text-[10px]
                          font-medium
                          hover:bg-[#0f1f38]
                          transition
                        "
                      >
                        <FileText size={12} />
                        Invoice
                      </button>

                      <button
                        onClick={() =>
                          generateInvoice(order)
                        }
                        className="
                          w-8
                          h-8
                          rounded-md
                          border
                          border-gray-200
                          flex
                          items-center
                          justify-center
                          text-gray-500
                          hover:bg-gray-50
                        "
                      >
                        <Eye size={14} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          INVOICE MODAL
      ====================================================== */}

      {showInvoice && selectedOrder && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            p-4
          "
        >

          <div
            className="
              bg-white
              rounded-xl
              shadow-2xl
              w-full
              max-w-[850px]
              max-h-[95vh]
              overflow-y-auto
            "
          >

            {/* MODAL HEADER */}

            <div className="print:hidden flex items-center justify-between px-5 py-4 border-b">

              <div>

                <h2 className="text-[15px] font-semibold text-[#172b4d]">
                  Invoice Preview
                </h2>

                <p className="text-[10px] text-gray-500 mt-1">
                  {selectedOrder.invoiceNo}
                </p>

              </div>

              <button
                onClick={() =>
                  setShowInvoice(false)
                }
                className="
                  w-8
                  h-8
                  rounded-md
                  hover:bg-gray-100
                  flex
                  items-center
                  justify-center
                "
              >
                <X size={17} />
              </button>

            </div>


            {/* =================================================
                INVOICE
            ================================================== */}

            <div
              id="invoice"
              className="invoice-area p-8"
            >

              {/* SHOP HEADER */}

              <div className="flex justify-between items-start border-b-2 border-[#3157d5] pb-5">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-lg bg-[#3157d5] flex items-center justify-center">

                      <span className="text-white text-[18px] font-bold">
                        B
                      </span>

                    </div>

                    <div>

                      <h1 className="text-[21px] font-bold text-[#172b4d]">
                        SWEET BAKE
                      </h1>

                      <p className="text-[10px] text-gray-500">
                        Bakery & Cake Shop
                      </p>

                    </div>

                  </div>

                  <p className="text-[10px] text-gray-500 mt-3">
                    123 Main Street, Coimbatore
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Tamil Nadu - 641001
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Phone: +91 98765 43210
                  </p>

                </div>


                {/* INVOICE INFO */}

                <div className="text-right">

                  <h2 className="text-[20px] font-bold text-[#3157d5]">
                    INVOICE
                  </h2>

                  <p className="text-[11px] font-semibold text-gray-700 mt-2">
                    {selectedOrder.invoiceNo}
                  </p>

                  <p className="text-[10px] text-gray-500 mt-1">
                    {selectedOrder.date}
                  </p>

                </div>

              </div>


              {/* CUSTOMER */}

              <div className="grid grid-cols-2 gap-5 mt-6">

                <div className="bg-[#f5f7ff] rounded-lg p-4">

                  <p className="text-[9px] uppercase font-semibold text-[#3157d5]">
                    Bill To
                  </p>

                  <p className="text-[12px] font-semibold text-[#172b4d] mt-2">
                    {selectedOrder.customer}
                  </p>

                  <p className="text-[10px] text-gray-500 mt-1">
                    {selectedOrder.mobile}
                  </p>

                </div>


                <div className="bg-[#f5faf8] rounded-lg p-4">

                  <p className="text-[9px] uppercase font-semibold text-green-600">
                    Payment Status
                  </p>

                  <p className="text-[12px] font-semibold text-green-600 mt-2">
                    {selectedOrder.payment}
                  </p>

                  <p className="text-[10px] text-gray-500 mt-1">
                    Order: {selectedOrder.id}
                  </p>

                </div>

              </div>


              {/* ITEMS */}

              <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">

                <table className="w-full">

                  <thead className="bg-[#3157d5] text-white">

                    <tr>

                      <th className="text-left px-4 py-3 text-[10px]">
                        #
                      </th>

                      <th className="text-left px-4 py-3 text-[10px]">
                        Item
                      </th>

                      <th className="text-left px-4 py-3 text-[10px]">
                        Category
                      </th>

                      <th className="text-right px-4 py-3 text-[10px]">
                        Price
                      </th>

                      <th className="text-center px-4 py-3 text-[10px]">
                        Qty
                      </th>

                      <th className="text-right px-4 py-3 text-[10px]">
                        Amount
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {selectedOrder.items.map(
                      (item, index) => {

                        const amount =
                          Number(item.price) *
                          Number(item.quantity);

                        return (
                          <tr
                            key={index}
                            className="border-b border-gray-100"
                          >

                            <td className="px-4 py-3 text-[10px] text-gray-500">
                              {index + 1}
                            </td>

                            <td className="px-4 py-3 text-[11px] font-medium text-[#172b4d]">
                              {item.name}
                            </td>

                            <td className="px-4 py-3 text-[10px] text-gray-500">
                              {item.category}
                            </td>

                            <td className="px-4 py-3 text-right text-[10px]">
                              ₹{item.price.toLocaleString("en-IN")}
                            </td>

                            <td className="px-4 py-3 text-center text-[10px]">
                              {item.quantity}
                            </td>

                            <td className="px-4 py-3 text-right text-[11px] font-semibold">
                              ₹{amount.toLocaleString("en-IN")}
                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>


              {/* TOTAL */}

              <div className="flex justify-end mt-5">

                <div className="w-[270px]">

                  <div className="flex justify-between py-2 text-[11px]">

                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span>
                      ₹
                      {getSubtotal(
                        selectedOrder
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>


                  <div className="flex justify-between py-2 text-[11px]">

                    <span className="text-gray-500">
                      Discount
                    </span>

                    <span className="text-red-500">
                      - ₹
                      {Number(
                        selectedOrder.discount
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>


                  <div className="flex justify-between items-center border-t-2 border-[#3157d5] pt-3 mt-2">

                    <span className="text-[13px] font-bold text-[#172b4d]">
                      Grand Total
                    </span>

                    <span className="text-[20px] font-bold text-[#3157d5]">
                      ₹
                      {getTotal(
                        selectedOrder
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </div>


              {/* FOOTER */}

              <div className="border-t border-gray-200 mt-8 pt-5 text-center">

                <p className="text-[12px] font-semibold text-[#172b4d]">
                  Thank you for choosing Sweet Bake!
                </p>

                <p className="text-[9px] text-gray-400 mt-1">
                  Freshly baked with care.
                </p>

              </div>

            </div>


            {/* MODAL BUTTONS */}

            <div className="print:hidden px-5 py-4 border-t bg-gray-50 flex justify-end gap-2">

              <button
                onClick={() =>
                  setShowInvoice(false)
                }
                className="
                  px-4
                  py-2
                  border
                  border-gray-300
                  rounded-md
                  text-[11px]
                  text-gray-600
                  hover:bg-white
                "
              >
                Close
              </button>

              <button
                onClick={printInvoice}
                className="
                  px-5
                  py-2
                  bg-[#3157d5]
                  text-white
                  rounded-md
                  text-[11px]
                  font-medium
                  flex
                  items-center
                  gap-2
                  hover:bg-[#2647b5]
                "
              >
                <Printer size={13} />
                Print / Save PDF
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default OrderItem;