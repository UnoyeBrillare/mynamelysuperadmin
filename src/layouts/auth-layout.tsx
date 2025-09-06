import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-neutral-200 w-full h-screen p-6 flex gap-10">
      <div className="bg-neutral-400 h-full w-[50%] rounded-2xl overflow-hidden">
        <img
          src="/pattern-1.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center h-full flex-1 border">
        <div className="bg-white shadow-gray-700 rounded-xl w-[550px] max-w-full border border-neutral-300 p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
