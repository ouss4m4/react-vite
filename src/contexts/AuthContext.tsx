import { fetchApi } from "@/api/api";
import { ILoginResponse } from "@/api/api.types";

import { createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router";

// Define the AuthContext type
interface loginDto {
  email: string;
  password: string;
}

interface ICreateUserDTO {
  email: string;
  name: string;
  password: string;
  password2: string;
}
interface AuthContextType {
  login: (
    userData: loginDto
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getToken: () => string;
  register: (
    userData: ICreateUserDTO
  ) => Promise<{ success: boolean; message?: string }>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const register = async (
    values: ICreateUserDTO
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const result = await fetchApi<ILoginResponse>("users", {
        body: JSON.stringify(values),
        method: "POST",
      });
      console.log(result);
      if (result.error) {
        return { success: false, message: result.message };
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "An unexpected error happened" };
    }
  };

  const login = async (userData: loginDto) => {
    try {
      const result = await fetchApi<ILoginResponse>("auth/login", {
        body: JSON.stringify(userData),
        method: "POST",
      });
      if (result.error) {
        return { success: false, message: result.message };
      }

      localStorage.setItem("jwt", result.jwt ?? ""); // Store the token
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "An unexpected error happened" };
    }
  };

  const getToken = (): string => {
    return localStorage.getItem("jwt") ?? ""; // Store the token
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/login"); // Redirect to login
  };

  const isAuthenticated = (): boolean => !!localStorage.getItem("jwt");

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, getToken, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
