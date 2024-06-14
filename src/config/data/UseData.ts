import { useContext } from "react";
import { DataContext } from "./DataProvider";

interface DataContextType {
  reloadPage: () => void;
}

export function useData(): DataContextType {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("UseData mustbe used with an DataProvider");
  }

  return context;
}
