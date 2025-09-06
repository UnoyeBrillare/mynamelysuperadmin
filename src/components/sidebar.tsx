import { NavLink } from "react-router-dom";
import MyNamelyLogo from "../../public/mynamely-logo.svg?react";
import { RiDashboardFill, RiShieldUserFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { PiCardsThreeFill } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import useAuthStore from "@/store/auth-store";

const links = [
  { name: "Dashboard", icon: RiDashboardFill, href: "" },
  { name: "Users", icon: FaUser, href: "users" },
  { name: "Admin Settings", icon: RiShieldUserFill, href: "settings" },
  { name: "Payments", icon: PiCardsThreeFill, href: "payments" },
];

export default function Sidebar() {
  const { logout } = useAuthStore();

  return (
    <div className="w-[300px] flex flex-col h-screen bg-white border-r border-gray-200 px-7 py-12 fixed">
      <MyNamelyLogo className="mb-20" />
      <div className="flex flex-1 flex-col">
        <nav className="flex flex-1 flex-col space-y-2">
          {links.map((link, index) => (
            <NavLink
              to={`/${link.href}`}
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 transition-colors duration-200 font-semibold ${
                  isActive ? "bg-primary text-white" : "hover:bg-neutral-200"
                }`
              }
            >
              <link.icon fontSize={20} />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
        <button
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 transition-colors duration-200 font-semibold hover:bg-neutral-200 cursor-pointer`}
          onClick={logout}
        >
          <TbLogout fontSize={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
