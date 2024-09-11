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
  progress: number;
  currentQuestionIndex: number;
  setNumQuestions: React.Dispatch<React.SetStateAction<number>>;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  setAttempt: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

export const QuizProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [xp, setXp] = useState(0);
  const [attempt, setAttempt] = useState(5);
  const [progress, setProgress] = React.useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  return (
    <QuizContext.Provider
      value={{
        numQuestions,
        xp,
        attempt,
        progress,
        currentQuestionIndex,
        setNumQuestions,
        setXp,
        setAttempt,
        setProgress,
        setCurrentQuestionIndex,
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
