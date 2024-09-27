"use client";

import React, { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ElectricBoltSharpIcon from "@mui/icons-material/ElectricBoltSharp";
import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/app/lesson/QuizContext";

import Image from "next/image";
import modokeQuestion from "@/public/assets/modokeDog/Ilustração Pontuação - Teste de Familiaridade - Ajustado.png";

function QuizFeedBackPage() {
  const { isFinished, numQuestions, xp, attempt } = useQuiz();

  const badge = {
    description: "Badge description",
  };

  const { width, height } = useWindowSize();

  const [confetti, setConfetti] = React.useState(isFinished);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFinished) {
      timer = setTimeout(() => {
        setConfetti(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [confetti]);

  const router = useRouter();
  useEffect(() => {
    if (!isFinished) {
      router.push("/learn");
    }
  }, [isFinished]);

  return (
    <>
      {confetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={400}
          recycle={false}
          initialVelocityX={0.01}
          initialVelocityY={0.01}
        />
      )}

      {isFinished && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-8 justify-center items-center text-2xl">
            <Image
                  src={modokeQuestion}
                  width={350}
                  height={350}
                  alt="Ilustração de um cachorro."
                />
              <div className="flex flex-col">
                <div className="mb-3">
                  <ChatBubbleComponent
                    content="Parabéns! Lição concluída!"
                    variant="title"
                  />
                </div>
                <div className="inline-flex gap-6 font-bold">
                  <div className="inline-flex gap-1 items-center">
                    <TaskAltIcon sx={{ width: 33, height: 33 }} />{" "}
                    {attempt === 3 ? numQuestions : numQuestions - attempt}/
                    {numQuestions}
                  </div>
                  <div className="inline-flex gap-1 items-center">
                    <ElectricBoltSharpIcon sx={{ width: 27, height: 33 }} />{" "}
                    {xp} XP
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
      )}
    </>
  );
}

export default QuizFeedBackPage;
