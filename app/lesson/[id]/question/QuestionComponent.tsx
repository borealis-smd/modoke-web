import React from "react";
import CodeBlockComponent from "../../CodeBlockComponent"; // Importe o componente de bloco de código
import { Lesson } from "@/types/validators";

interface Props {
  currentQuestion: Lesson[0];
  code: string;
}

const QuestionComponent = ({ currentQuestion, code }: Props) => {
  return (
    <div className="mt-32 flex gap-8 justify-center items-center">
      <div>Mascote</div>
      <div className="max-w-xl bg-green-200 p-5 rounded-xl rounded-es-none">
        <p className="mb-4">
          {currentQuestion && currentQuestion.question_text}
        </p>
        <CodeBlockComponent code={code} language="html" />
      </div>
    </div>
  );
};

export default QuestionComponent;
