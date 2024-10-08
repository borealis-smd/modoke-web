import { Badge } from "@/types/validators";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface QuizContextType {
  numQuestions: number;
  xp: number;
  attempt: number;
  currentQuestionIndex: number;
  isFinished: boolean;
  sequence: number;
  unitId: number;
  badge: Partial<Badge>;
  setNumQuestions: React.Dispatch<React.SetStateAction<number>>;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  setAttempt: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsFinished: (value: boolean) => void;
  setSequence: React.Dispatch<React.SetStateAction<number>>;
  setUnitId: React.Dispatch<React.SetStateAction<number>>;
  setBadge: React.Dispatch<React.SetStateAction<Partial<Badge>>>;
}

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

export const QuizProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [xp, setXp] = useState(0);
  const [attempt, setAttempt] = useState(3); // determina o número de tentativas como 3
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [sequence, setSequence] = React.useState(0);
  const [unitId, setUnitId] = React.useState(0);
  const [badge, setBadge] = React.useState<Partial<Badge>>({});

  return (
    <QuizContext.Provider
      value={{
        numQuestions,
        xp,
        attempt,
        currentQuestionIndex,
        isFinished,
        sequence,
        unitId,
        badge,
        setNumQuestions,
        setXp,
        setAttempt,
        setCurrentQuestionIndex,
        setIsFinished,
        setSequence,
        setUnitId,
        setBadge,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
