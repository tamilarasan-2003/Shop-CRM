import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const menus = [
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Dashboard",
      path: "/product-dashboard",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Add Item",
      path: "/add-item",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "View Item",
      path: "/view-item",
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: "Orders",
      path: "/order-item",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customers",
      path: "/customers",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

     <aside
  className={`
    fixed lg:relative
    top-0 left-0
    h-screen
    bg-slate-900 text-white
    transition-all duration-300 ease-in-out
    overflow-hidden
    z-50
    ${
      isOpen
        ? "w-64 translate-x-0"
        : "w-0 lg:w-20 -translate-x-full lg:translate-x-0"
    }
  `}
>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          <div className="flex items-center">
            <span className="text-3xl">☕</span>

            {isOpen && (
              <span className="ml-3 text-lg font-bold">
                Senthur Tea Shop
              </span>
            )}
          </div>

          {/* Close button on mobile */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu */}
        <div className="mt-4 flex-1">
          {menus.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 h-14 transition
                ${
                  isActive
                    ? "bg-slate-700"
                    : "hover:bg-slate-800"
                }`
              }
            >
              {menu.icon}

              {isOpen && (
                <span className="font-medium">
                  {menu.title}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div className="border-t border-slate-700 p-4">
          <button className="w-full h-11 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />

            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;