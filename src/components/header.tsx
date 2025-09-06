import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // Function to derive page title from pathname
  const getPageTitle = (pathname: string) => {
    const path = pathname.split("/").filter(Boolean).pop() || "Dashboard"; // Fallback to "Dashboard" for root
    return path.charAt(0).toUpperCase() + path.slice(1).toLowerCase(); // Capitalize first letter
  };

  return (
    <div className="h-[100px] border w-full bg-white flex items-center justify-between px-20">
      <p className="text-2xl font-bold">{getPageTitle(location.pathname)}</p>
      <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white font-bold">
        SA
      </div>
    </div>
  );
}
