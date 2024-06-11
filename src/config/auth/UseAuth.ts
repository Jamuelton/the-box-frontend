import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

interface AuthContextType {
  isAuthenticated: boolean;
  auth: () => void;
  logout: () => void;
  reloadPage: () => void;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UseAuth mustbe used with an AuthProvider");
  }

  return context;
}
