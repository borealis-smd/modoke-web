"use client";

import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Progress } from "@/components/ui/progress";
import { useQuiz } from "../../QuizContext";
import { useBreadcrumb } from "../../BreadcrumbContext";

interface Props {
  children: React.ReactNode;
}

function QuizPage({ children }: Props) {
  const { progress, currentQuestionIndex, numQuestions, attempt } = useQuiz();
  const { isFinished } = useBreadcrumb();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mr-14 w-full flex items-center gap-4 text-lg">
          <Progress
            className="border-2 border-black/50 h-[32px]"
            value={progress}
          />
          {isFinished
            ? `${currentQuestionIndex + 1}/${numQuestions}`
            : `${currentQuestionIndex}/${numQuestions}`}
        </div>
        <div className="inline-flex gap-1 items-center text-lg">
          <PetsIcon sx={{ width: 30, height: 28 }} aria-hidden="true" />
          {attempt}
        </div>
      </div>
      {children}
    </>
  );
}

export default QuizPage;
