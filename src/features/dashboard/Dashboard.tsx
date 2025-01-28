import { fetchApi } from "@/api/api";
import { IUserInfo } from "@/api/api.types";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import MonthlySales from "./MonthlySales.chart";
import { Label } from "@/components/ui/label";
import BrowserVisitor from "./BrowserVisitor.chart";
import { DynamicChart } from "./Dynamic.chart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const { getToken } = useAuth();
  const [user, setUser] = useState<IUserInfo>();
  const token = getToken();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await fetchApi<IUserInfo>("auth/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(userInfo);
    };

    fetchUserInfo();
  }, [token]);

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2>Hello {user?.name}</h2>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </div>

      <div className="grid grid-cols-2 mt-8 gap-y-6">
        <div>
          <Label className="pl-2">Monthly Sales</Label>
          <MonthlySales />
        </div>
        <div>
          <Label className="pl-2">Visitors</Label>
          <BrowserVisitor />
        </div>
        <div className="col-span-2">
          <DynamicChart />
        </div>
      </div>
    </div>
  );
}
