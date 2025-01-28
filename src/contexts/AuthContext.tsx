import { createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router";

// Define the AuthContext type
interface loginDto {
  email: string;
  password: string;
}
interface AuthContextType {
  login: (userData: loginDto) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const login = (userData: loginDto) => {
    // post to login. and save jwt
    console.log(userData);
    localStorage.setItem("jwt", "userData"); // Store the token
    navigate("/dashboard"); // Redirect to login
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/login"); // Redirect to login
  };

  const isAuthenticated = (): boolean => !!localStorage.getItem("jwt");
  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
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
