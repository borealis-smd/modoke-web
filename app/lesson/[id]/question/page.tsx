"use client";

import React, { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { PawPrint, X } from "lucide-react";
import Link from "next/link";
import BreadcrumbComponent from "../../BreadcrumbComponent";
import { Button } from "@/components/ui/button";
import CodeBlockComponent from "../../CodeBlockComponent";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import api from "@/lib/axios";
import { Lesson } from "@/types/validators";
import classnames from "classnames";

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

function QuestionsPage({ params, children }: Props) {
  const [lessonQuestions, setLessonQuestions] = React.useState<Lesson>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchLessonQuestions = async () => {
      try {
        const { data: lessonQuestions } = await api.get(
          `/question/lesson?lesson_id=${params.id}`
        );
        setLessonQuestions(lessonQuestions);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonQuestions();
  }, [params.id]);

  const [attempt, setAttempt] = React.useState(5);
  const code = `<html _____ = “pt-br”>
  ...
</html>`;

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };
  const currentQuestion = lessonQuestions[currentQuestionIndex];

  const options = currentQuestion?.Options;

  const handleSubmit = async (optionId: number) => {
    await api.post("/attempt", {
      question_id: currentQuestion.question_id,
      selected_option_id: optionId,
    });
    if (!options[optionId].is_correct) {
      if (attempt === 1) {
        // se não tiver mais tentativas, abrir sheet dizendo que perdeu e redirecionar para a página de lições

        return;
      }
      setAttempt((prev) => prev - 1);
    }
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
            {currentQuestion && currentQuestion.question_text}
          </div>
          <CodeBlockComponent code={code} language="html" />
        </div>
      </div>
      {/* Options */}
      <div className="flex justify-center gap-10 mt-10">
        {options &&
          options.map((option, index) => (
            <Sheet key={index}>
              <SheetTrigger>
                <Button onClick={() => handleSubmit(index)}>
                  {option.option_text}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className={classnames({
                  "bg-green-400": option.is_correct,
                  "bg-red-400": !option.is_correct,
                })}
              >
                <SheetHeader>
                  <SheetTitle className="text-3xl">
                    {option.is_correct ? "Parabéns!" : "Oops!"}
                  </SheetTitle>
                  <SheetDescription className="text-black text-md">
                    <p>
                      {option.is_correct
                        ? "Você acertou! Continue aprendendo."
                        : `Você errou! A resposta correta é ${
                            options.find((o) => o.option_text)?.option_text
                          }.`}
                    </p>
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <Button>Continuar</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
      </div>
    </div>
  );
}

export default QuestionsPage;
