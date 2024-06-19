import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { GetUser } from "../../services/UserServices";
import { UserInterface } from "../../services/Types/userType";

interface DataContextType {
  reloadPage: () => void;
  userInfo: UserInterface | undefined;
  userId: string | undefined;
  token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export function DataProvider({ children }: AuthProviderProps) {
  const token = Cookies.get("token") || "";

  const [reload, setReload] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInterface | undefined>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.sub || "";
      const getUser = async () => {
        const response = await GetUser(parseInt(userId), token);
        if (response?.status == 200) {
          setUserInfo(response.data);
          setUserId(userId);
        }
      };

      getUser();
    }
  }, [reload, token]);

  function reloadPage() {
    setReload((prev) => prev + 1);
  }

  reload;

  return (
    <DataContext.Provider value={{ reloadPage, userInfo, userId, token }}>
      {children}
    </DataContext.Provider>
  );
}
