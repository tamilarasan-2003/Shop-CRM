import { useState } from "react";
import {
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

function Navbar({ isOpen, setIsOpen }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-3 md:px-6">

      {/* Left */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile */}
        <h2 className="block md:hidden text-xl font-bold text-slate-700 leading-6">
          Tea Shop
        </h2>

        {/* Desktop */}
        <h2 className="hidden md:block text-2xl font-bold text-slate-700">
          Senthur Tea Shop Admin
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-5">

        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />

            <div className="hidden lg:block text-left">
              <h4 className="font-semibold text-gray-800">
                Admin
              </h4>
              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <ChevronDown className="hidden md:block w-4 h-4 text-gray-600" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                <User className="w-5 h-5" />
                View Profile
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                <Settings className="w-5 h-5" />
                Settings
              </button>

              <hr />

              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default Navbar;