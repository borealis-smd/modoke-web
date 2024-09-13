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
  setNumQuestions: React.Dispatch<React.SetStateAction<number>>;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  setAttempt: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsFinished: (value: boolean) => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

export const QuizProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [xp, setXp] = useState(0);
  const [attempt, setAttempt] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [isFinished, setIsFinished] = useState(false);

  return (
    <QuizContext.Provider
      value={{
        numQuestions,
        xp,
        attempt,
        currentQuestionIndex,
        isFinished,
        setNumQuestions,
        setXp,
        setAttempt,
        setCurrentQuestionIndex,
        setIsFinished,
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
