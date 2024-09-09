import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface BreadcrumbContextType {
  isAlertOpen: boolean;
  breadcrumbChangeTo: string;
  lessonLabel: string;
  setIsAlertOpen: (value: boolean) => void;
  setBreadcrumbChangeTo: (path: string) => void;
  setLessonLabel: (label: string) => void;
}

export const BreadcrumbContext = createContext<
  BreadcrumbContextType | undefined
>(undefined);

export const BreadcrumbProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [breadcrumbChangeTo, setBreadcrumbChangeTo] = useState("");
  const [lessonLabel, setLessonLabel] = useState("");

  return (
    <BreadcrumbContext.Provider
      value={{
        isAlertOpen,
        breadcrumbChangeTo,
        lessonLabel,
        setIsAlertOpen,
        setBreadcrumbChangeTo,
        setLessonLabel,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};
