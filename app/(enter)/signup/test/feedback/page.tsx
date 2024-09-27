"use client";

import { useTest } from "@/app/(enter)/TestContext";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CloseAlertComponent from "@/app/lesson/CloseAlertComponent";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";
import modokeQuestion from "@/public/assets/modokeDog/Ilustração Pontuação - Teste de Familiaridade - Ajustado.png";

function TestFeedbackPage() {
  const router = useRouter();

  const levels = [
    { level: "A", description: "Iniciante" },
    { level: "AA", description: "Intermediário" },
    { level: "AAA", description: "Avançado" },
  ];

  const { isFinished, level, isAlertOpen, setIsAlertOpen } = useTest();

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

  const handleExit = () => {
    setIsAlertOpen(false);
    router.push("/");
  };

  const [isSheetOpen, setIsSheetOpen] = useState(isFinished);

  return (
    <>
      <CloseAlertComponent
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onClick={() => handleExit()}
      />

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
                alt="Ilustração de um cachorro feliz."
              />
              <div className="flex flex-col">
                <div className="mb-3">
                  <ChatBubbleComponent
                    content="Parabéns! Teste finalizado!"
                    variant="title"
                  />
                </div>
                <div className="mb-3">
                  <ChatBubbleComponent
                    content={`Seu nível é <strong>${level} - ${
                      levels.find((l) => l.level === level)!.description
                    }</strong>.`}
                  />
                </div>
                <ChatBubbleComponent
                  content="Lembre-se que este é apenas um teste de familiaridade. Continue aprendendo!"
                  variant="disclaimer"
                />
              </div>
            </div>
          </div>
          <div className="text-end absolute bottom-24 right-24">
            <Link href="/learn">
              <Button variant="secondary">Continuar</Button>
            </Link>
          </div>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent
              side="bottom"
              showOverlay={false}
              className="bg-primary flex flex-row items-center justify-between py-12 px-36 rounded-ss-3xl rounded-se-3xl"
            >
              <SheetHeader>
                <SheetTitle className="text-primary-foreground text-4xl">
                  Aprenda mais com o Modoke!
                </SheetTitle>
                <SheetDescription className="text-primary-foreground text-xl w-full flex justify-between">
                  Crie sua conta e tenha acesso a todo o conteúdo do Modoke.
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <div className="flex gap-6">
                  <Link href="/signup">
                    <Button variant="secondary">Criar conta</Button>
                  </Link>
                  <Link href="/signin">
                    <Button>Entrar</Button>
                  </Link>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
}

export default TestFeedbackPage;
