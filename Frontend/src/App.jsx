import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import OrderItem from "./Pages/OrderItem";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import ProductDashboard from "./Pages/ProductDashboard";
import AddItem from "./Pages/AddItem";
import ViewItem from "./Pages/ViewItem";

function App() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 flex flex-col">

        <Navbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <main className="flex-1 p-6 overflow-auto">
          <Routes>

            
            {/* Items */}
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/view-item" element={<ViewItem />} />
            <Route path="/product-dashboard" element={<ProductDashboard />} />
            <Route path="/order-item" element={<OrderItem />} />

          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;