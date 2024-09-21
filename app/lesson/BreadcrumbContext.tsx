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
  pastHref: string;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBreadcrumbChangeTo: React.Dispatch<React.SetStateAction<string>>;
  setLessonLabel: React.Dispatch<React.SetStateAction<string>>;
  setPastHref: React.Dispatch<React.SetStateAction<string>>;
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
  const [pastHref, setPastHref] = useState("");

  return (
    <BreadcrumbContext.Provider
      value={{
        isAlertOpen,
        breadcrumbChangeTo,
        lessonLabel,
        pastHref,
        setIsAlertOpen,
        setBreadcrumbChangeTo,
        setLessonLabel,
        setPastHref,
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
