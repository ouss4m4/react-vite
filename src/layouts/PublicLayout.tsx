import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Outlet />
    </div>
  );
}
