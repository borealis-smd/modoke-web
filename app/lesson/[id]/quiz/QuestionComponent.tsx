import React from "react";
import { Question } from "@/types/validators";
import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { parseTags } from "@/lib/parseTags";

interface Props {
  currentQuestion: Question;
}

const QuestionComponent = ({ currentQuestion }: Props) => {
  const parsedContent = parseTags(currentQuestion?.question_text);
  return (
    <>
      {currentQuestion && (
        <div className="flex gap-8 justify-center items-center text-lg">
          <div>Mascote</div>
          <div className="flex flex-col gap-5">
            {currentQuestion &&
              parsedContent.map((part: string, index: number) => (
                <ChatBubbleComponent key={index} content={part} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionComponent;
