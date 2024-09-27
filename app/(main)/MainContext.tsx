import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface MainContextType {
  section: string;
  unit: number;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  setUnit: React.Dispatch<React.SetStateAction<number>>;
}

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

export const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [section, setSection] = useState("");
  const [unit, setUnit] = useState(0);

  return (
    <MainContext.Provider
      value={{
        section,
        unit,
        setSection,
        setUnit,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMain must be used within a MainProvider");
  }
  return context;
};
