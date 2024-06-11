import { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  auth: () => void;
  logout: () => void;
  reloadPage: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const token = Cookies.get("token");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [reload, setReload] = useState<number>(0);

  function reloadPage() {
    setReload((prev) => prev + 1);
  }

  const auth = () => {
    if (token) {
      setIsAuthenticated(true);
      reloadPage();
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("token");
    reloadPage();
  };

  reload;

  return (
    <AuthContext.Provider value={{ isAuthenticated, auth, logout, reloadPage }}>
      {children}
    </AuthContext.Provider>
  );
}
