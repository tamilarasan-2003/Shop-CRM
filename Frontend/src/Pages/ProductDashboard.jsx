import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* ================= DAILY SALES ================= */

const dailySales = [
  { day: "01", sales: 8500 },
  { day: "05", sales: 12400 },
  { day: "10", sales: 9800 },
  { day: "15", sales: 15600 },
  { day: "20", sales: 13200 },
  { day: "25", sales: 18500 },
  { day: "30", sales: 22100 },
];

/* ================= PRODUCT SALES ================= */

const productSales = [
  {
    product: "Black Forest",
    sales: 42000,
  },
  {
    product: "Chocolate Cake",
    sales: 36000,
  },
  {
    product: "Red Velvet",
    sales: 28000,
  },
  {
    product: "Brownie",
    sales: 22000,
  },
  {
    product: "Donut",
    sales: 18000,
  },
  {
    product: "Puffs",
    sales: 15000,
  },
  {
    product: "Cookies",
    sales: 12000,
  },
];

function BakerySalesDashboard() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] text-[#172b4d]">
     {/* <div className="mb-[20px]">

          <h1 className="text-[20px] font-semibold text-[#172b4d]">
            Sales Overview
          </h1>

          <p className="text-[12px] text-[#6b778c] mt-[5px]">
            Bakery sales performance and product-wise sales analysis
          </p>

        </div> */}
      {/* =====================================================
          FILTER SECTION
      ====================================================== */}

      <div className="bg-white border-b border-[#d9dee7] px-[46px] py-[18px]">

        <div className="flex flex-wrap items-end gap-[16px]">

          {/* FROM DATE */}

          <div className="w-[150px]">

            <label className="block text-[13px] mb-[7px]">
              From Date
            </label>

            <input
              type="date"
              defaultValue="2026-10-01"
              className="
                w-full
                h-[43px]
                border
                border-[#cfd6df]
                rounded-[7px]
                px-[13px]
                text-[13px]
                text-[#172b4d]
                bg-white
                outline-none
                focus:border-[#8b95a5]
              "
            />

          </div>


          {/* TO DATE */}

          <div className="w-[150px]">

            <label className="block text-[13px] mb-[7px]">
              To Date
            </label>

            <input
              type="date"
              defaultValue="2026-10-31"
              className="
                w-full
                h-[43px]
                border
                border-[#cfd6df]
                rounded-[7px]
                px-[13px]
                text-[13px]
                text-[#172b4d]
                bg-white
                outline-none
                focus:border-[#8b95a5]
              "
            />

          </div>


          {/* PRODUCT */}

          <div className="w-[190px]">

            <label className="block text-[13px] mb-[7px]">
              Product
            </label>

            <select
              className="
                w-full
                h-[43px]
                border
                border-[#cfd6df]
                rounded-[7px]
                px-[13px]
                text-[13px]
                text-[#172b4d]
                bg-white
                outline-none
                focus:border-[#8b95a5]
              "
            >
              <option>All Products</option>
              <option>Black Forest</option>
              <option>Chocolate Cake</option>
              <option>Red Velvet</option>
              <option>Brownie</option>
              <option>Donut</option>
              <option>Puffs</option>
              <option>Cookies</option>
            </select>

          </div>


          {/* SEARCH */}

          <button
            className="
              h-[43px]
              px-[25px]
              rounded-[7px]
              bg-[#172b4d]
              text-white
              text-[13px]
              font-medium
              hover:bg-[#0f1f38]
              transition
            "
          >
            Search
          </button>

        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="px-[46px] py-[25px]">

        {/* PAGE TITLE */}

       


        {/* =====================================================
            SALES CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">

          {/* TODAY */}

          <div
            className="
              bg-white
              border
              border-[#d9dee7]
              rounded-[8px]
              px-[20px]
              py-[17px]
            "
          >

            <p className="text-[13px] text-[#6b778c]">
              Today's Sales
            </p>

            <h2 className="text-[26px] font-semibold text-[#172b4d] mt-[7px]">
              ₹24,850
            </h2>

            <p className="text-[11px] text-[#8a94a6] mt-[5px]">
              Sales generated today
            </p>

          </div>


          {/* OVERALL */}

          <div
            className="
              bg-white
              border
              border-[#d9dee7]
              rounded-[8px]
              px-[20px]
              py-[17px]
            "
          >

            <p className="text-[13px] text-[#6b778c]">
              Overall Sales
            </p>

            <h2 className="text-[26px] font-semibold text-[#172b4d] mt-[7px]">
              ₹8,42,500
            </h2>

            <p className="text-[11px] text-[#8a94a6] mt-[5px]">
              Total sales for selected period
            </p>

          </div>

        </div>


        {/* =====================================================
            TWO GRAPHS
        ====================================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[16px] mt-[20px]">


          {/* =================================================
              GRAPH 1 - DAILY SALES
          ================================================== */}

          <div
            className="
              bg-white
              border
              border-[#d9dee7]
              rounded-[8px]
              overflow-hidden
            "
          >

            {/* HEADER */}

            <div className="px-[20px] py-[15px] border-b border-[#e5e7eb]">

              <h2 className="text-[14px] font-semibold text-[#172b4d]">
                Daily Sales
              </h2>

              <p className="text-[11px] text-[#6b778c] mt-[4px]">
                Sales performance by date
              </p>

            </div>


            {/* CHART */}

            <div className="px-[15px] pt-[15px] pb-[10px]">

              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={dailySales}
                    margin={{
                      top: 15,
                      right: 20,
                      left: 10,
                      bottom: 15,
                    }}
                  >

                    <CartesianGrid
                      stroke="#e5e7eb"
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      tick={{
                        fontSize: 10,
                        fill: "#6b778c",
                      }}
                      axisLine={{
                        stroke: "#d9dee7",
                      }}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fontSize: 10,
                        fill: "#6b778c",
                      }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) =>
                        `₹${value / 1000}K`
                      }
                    />

                    <Tooltip
                      formatter={(value) => [
                        `₹${value.toLocaleString("en-IN")}`,
                        "Sales",
                      ]}
                      contentStyle={{
                        border: "1px solid #d9dee7",
                        borderRadius: "6px",
                        fontSize: "11px",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#172b4d"
                      strokeWidth={2}
                      dot={{
                        r: 3,
                        fill: "#172b4d",
                      }}
                      activeDot={{
                        r: 5,
                      }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>


          {/* =================================================
              GRAPH 2 - PRODUCT SALES
          ================================================== */}

          <div
            className="
              bg-white
              border
              border-[#d9dee7]
              rounded-[8px]
              overflow-hidden
            "
          >

            {/* HEADER */}

            <div className="px-[20px] py-[15px] border-b border-[#e5e7eb]">

              <h2 className="text-[14px] font-semibold text-[#172b4d]">
                Product-wise Sales
              </h2>

              <p className="text-[11px] text-[#6b778c] mt-[4px]">
                Sales amount by individual product
              </p>

            </div>


            {/* CHART */}

            <div className="px-[15px] pt-[15px] pb-[10px]">

              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={productSales}
                    margin={{
                      top: 15,
                      right: 15,
                      left: 10,
                      bottom: 65,
                    }}
                  >

                    <CartesianGrid
                      stroke="#e5e7eb"
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="product"
                      angle={-30}
                      textAnchor="end"
                      interval={0}
                      tick={{
                        fontSize: 9,
                        fill: "#6b778c",
                      }}
                      axisLine={{
                        stroke: "#d9dee7",
                      }}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fontSize: 10,
                        fill: "#6b778c",
                      }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) =>
                        `₹${value / 1000}K`
                      }
                    />

                    <Tooltip
                      formatter={(value) => [
                        `₹${value.toLocaleString("en-IN")}`,
                        "Sales",
                      ]}
                      contentStyle={{
                        border: "1px solid #d9dee7",
                        borderRadius: "6px",
                        fontSize: "11px",
                      }}
                    />

                    <Bar
                      dataKey="sales"
                      fill="#172b4d"
                      radius={[3, 3, 0, 0]}
                      barSize={28}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BakerySalesDashboard;