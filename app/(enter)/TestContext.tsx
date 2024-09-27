import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface TestContextType {
  isFinished: boolean;
  level: string;
  isAlertOpen: boolean;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TestContext = createContext<TestContextType | undefined>(
  undefined
);

export const TestProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [level, setLevel] = useState(""); // por padrão, nível A
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <TestContext.Provider
      value={{
        isFinished,
        level,
        isAlertOpen,
        setIsFinished,
        setLevel,
        setIsAlertOpen,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTest must be used within a BreadcrumbProvider");
  }
  return context;
};
