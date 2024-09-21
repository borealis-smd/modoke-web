"use client";

import { useTest } from "@/app/(enter)/TestContext";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function TestFeedbackPage() {
  const { isFinished, level } = useTest();

  const { width, height } = useWindowSize();

  const [confetti, setConfetti] = useState(isFinished);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFinished) {
      timer = setTimeout(() => {
        setConfetti(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [confetti]);

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
              <div>Mascote</div>
              <div className="flex flex-col">
                <div className="mb-3">
                  <ChatBubbleComponent
                    content="Parabéns! Teste finalizado!"
                    variant="title"
                  />
                </div>
                <div>
                  <ChatBubbleComponent content={`Seu nível é <strong>${level}</strong>.`}/>
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

export default TestFeedbackPage;
