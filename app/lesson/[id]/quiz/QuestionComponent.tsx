import React from "react";
import CodeBlockComponent from "../../CodeBlockComponent"; // Deve permanecer
import { Question } from "@/types/validators";
import ChatBubbleComponent from "@/app/ChatBubbleComponent";

interface Props {
  currentQuestion: Question;
}

const QuestionComponent = ({ currentQuestion }: Props) => {
  return (
    <>
      {currentQuestion && (
        <div className="flex gap-8 justify-center items-center text-lg">
          <div>Mascote</div>
          {currentQuestion && (
            <ChatBubbleComponent content={currentQuestion.question_text} />
          )}
        </div>
      )}
    </>
  );
};

export default QuestionComponent;
