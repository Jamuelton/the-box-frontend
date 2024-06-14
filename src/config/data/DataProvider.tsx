import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { GetUser } from "../../services/UserServices";

interface DataContextType {
  reloadPage: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export function DataProvider({ children }: AuthProviderProps) {
  const token = Cookies.get("token") || "";
  const decoded = jwtDecode(token);
  const userId = decoded.sub || "";

  const [reload, setReload] = useState<number>(0);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const getUser = async () => {
      const response = await GetUser(parseInt(userId), token);
      if (response?.status == 200) {
        console.log(response.data);
      }
    };

    getUser();
  }, [userId, reload, token]);

  function reloadPage() {
    setReload((prev) => prev + 1);
  }

  reload;

  return (
    <DataContext.Provider value={{ reloadPage }}>
      {children}
    </DataContext.Provider>
  );
}
