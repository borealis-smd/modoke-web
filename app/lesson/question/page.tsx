"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { PawPrint, X } from "lucide-react";
import Link from "next/link";
import BreadcrumbComponent from "../BreadcrumbComponent";
import { Button } from "@/components/ui/button";
import CodeBlockComponent from "../CodeBlockComponent";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Option {
  text: string;
  correct: boolean;
}

function QuestionPage() {
  const [attempt, setAttempt] = React.useState(5);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const code = `<html _____ = “pt-br”>
  ...
</html>`;

  const options: Option[] = [
    { text: "'lang'", correct: false },
    { text: "'alt'", correct: false },
    { text: "'title'", correct: true },
    { text: "'src'", correct: false },
  ];

  const handleOptionClick = (option: Option) => {
    if (option.correct) {
      setIsSheetOpen(true);
    }
    setAttempt((prev) => prev - 1);
  };

  return (
    <div className="mx-24 py-14">
      {/* Breadcrumb */}
      <BreadcrumbComponent activeHref="/test" />
      {/* Header elements */}
      <div className="flex items-center">
        <Link href="#" className="flex gap-1">
          <X aria-label="Fechar" />
          <span>Fechar</span>
        </Link>
        <div className="ml-40 flex grow gap-4 items-center">
          <Progress value={50} />
          <div className="inline-flex gap-2">
            <PawPrint aria-hidden="true" />
            {attempt}
          </div>
        </div>
      </div>
      {/* Question */}
      <div className="mt-32 flex gap-8 justify-center items-center">
        <div>Mascote</div>
        <div className="max-w-xl">
          <div className="bg-green-200 p-5 rounded-xl rounded-es-none mb-4">
            Qual atributo é essencial para garantir que o idioma de uma página
            seja identificado?
          </div>
          <CodeBlockComponent code={code} language="html" />
        </div>
      </div>
      {/* Options */}
      <div className="flex justify-center gap-16 mt-10">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="option"
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
          </Button>
        ))}
      </div>
      <Sheet open={isSheetOpen}>
        <SheetContent side="bottom" className="bg-green-400">
          <SheetHeader>
            <SheetTitle className="text-3xl">Parabéns!</SheetTitle>
            <SheetDescription className="text-black text-md">
              <p>Você acertou a questão! Continue assim.</p>
              <div className="text-end">
                <Button onClick={() => setIsSheetOpen(false)}>Continuar</Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default QuestionPage;
