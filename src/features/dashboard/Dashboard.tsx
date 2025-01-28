import { fetchApi } from "@/api/api";
import { IUserInfo } from "@/api/api.types";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

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
    <div className="p-4">
      <h2>Hello {user?.name}</h2>
    </div>
  );
}
