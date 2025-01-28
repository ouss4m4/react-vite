import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, MenuSquare } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";

export default function PrivateLayout() {
  // save sidebar state in localstorage
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();
  return (
    <div className="flex">
      <div
        className={`transition-width duration-300 ${
          isCollapsed ? "w-20" : "w-52"
        }  h-screen bg-gray-100 flex flex-col  p-2`}
      >
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="p-4 "
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <MenuSquare className="text-black " />
          </Button>
        </div>

        <Button onClick={logout} className="mt-auto self-center ">
          {isCollapsed ? (
            <LogOut width="12px" height="12px" />
          ) : (
            <>
              <LogOut width="12px" height="12px" />
              Logout
            </>
          )}
        </Button>
      </div>
      <div className="flex-grow ">
        <Outlet />
      </div>
    </div>
  );
}
