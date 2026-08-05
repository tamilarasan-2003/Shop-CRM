import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

import AddItem from "./Pages/AddItem";
import ViewItem from "./Pages/ViewItem";

function Dashboard() {
  return <h1 className="text-3xl font-bold">Dashboard</h1>;
}

function App() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/view-item" element={<ViewItem />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;