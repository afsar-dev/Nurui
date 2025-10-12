"use client";
import { IChildren } from "@/types/common.type";
import { createContext, useContext, useState } from "react";

interface IAppContextProps {
  sideBar: boolean;
  setSideBar: (sideBar: boolean) => void;
}

const AppContext = createContext<IAppContextProps | null>(null);

export const AppProvider = ({ children }: IChildren) => {
  const [sideBar, setSideBar] = useState(true);

  return (
    <AppContext.Provider value={{ sideBar, setSideBar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
