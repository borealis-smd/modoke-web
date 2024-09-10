import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ElectricBoltSharpIcon from "@mui/icons-material/ElectricBoltSharp";
import { Question } from "@/types/validators";

interface Props {
  lessonQuestions: Question;
  xp: number;
  attempt: number;
}

function LessonFeedbackComponent({ lessonQuestions, xp, attempt }: Props) {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex gap-8 justify-center items-center text-2xl">
          <div>Mascote</div>
          <div className="flex flex-col">
            <div className="mb-3">
              <ChatBubbleComponent content="Parabéns! Lição concluída!" />
            </div>
            <div className="inline-flex gap-6 font-bold">
              <div className="inline-flex gap-1 items-center">
                <TaskAltIcon sx={{ width: 33, height: 33 }} /> {lessonQuestions.length - (5 - attempt)}/
                {lessonQuestions.length}
              </div>
              <div className="inline-flex gap-1 items-center">
                <ElectricBoltSharpIcon sx={{ width: 27, height: 33 }} /> {xp} XP
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-end absolute bottom-24 right-24">
        <Link href="/learn">
          <Button variant="secondary">Continuar</Button>
        </Link>
      </div>
    </>
  );
}

export default LessonFeedbackComponent;
