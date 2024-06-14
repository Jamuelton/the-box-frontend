import { useContext } from "react";
import { DataContext } from "./DataProvider";
import { UserInterface } from "../../services/Types/userType";

interface DataContextType {
  reloadPage: () => void;
  userInfo: UserInterface | undefined;
}

export function useData(): DataContextType {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("UseData mustbe used with an DataProvider");
  }

  return context;
}
