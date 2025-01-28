import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import Dashboard from "@/features/dashboard/Dashboard";
import RequireAuth from "@/hooks/RequireAuth";
import PrivateLayout from "@/layouts/PrivateLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { Route, Routes } from "react-router";
import Home from "./Home";

export default function App() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route index element={<Home />} />
    </Routes>
  );
}
