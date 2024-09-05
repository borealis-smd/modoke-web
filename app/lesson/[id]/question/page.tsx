"use client";

import React, { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { PawPrint, X } from "lucide-react";
import BreadcrumbComponent from "../../BreadcrumbComponent";
import { Button } from "@/components/ui/button";
import CodeBlockComponent from "../../CodeBlockComponent";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import api from "@/lib/axios";
import { Lesson } from "@/types/validators";
import classnames from "classnames";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
}

function QuestionsPage({ params }: Props) {
  const router = useRouter();
  const [lessonQuestions, setLessonQuestions] = React.useState<Lesson>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

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
  const currentQuestion = lessonQuestions[currentQuestionIndex];

  const options = currentQuestion?.Options;

  const handleNextQuestion = () => {
    if (attempt === 0) {
      setIsDialogOpen(true);
      return;
    }

    if (currentQuestionIndex === lessonQuestions.length - 1) {
      router.push(`/lesson/${params.id}/result`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async (optionId: number) => {
    await api.post("/attempt", {
      question_id: currentQuestion.question_id,
      selected_option_id: optionId,
    });

    const selectedOption = options.find((option) => option.option_id === optionId);
    if (!selectedOption?.is_correct) {
      setAttempt((prev) => prev - 1);
    }

    setProgress((prev) => prev + (1 / lessonQuestions.length) * 100);
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <div className="mx-24 py-14">
      {/* Breadcrumb */}
      <BreadcrumbComponent activeHref="/test" />
      {/* Header elements */}
      <div className="flex items-center">
        <AlertDialog>
          <AlertDialogTrigger className="flex gap-1">
            <X aria-label="Fechar" />
            <span>Fechar</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-400"
                onClick={handleExit}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="ml-40 flex grow gap-4 items-center">
          <Progress value={progress} />
          <div className="inline-flex gap-2">
            <PawPrint aria-hidden="true" />
            {attempt}
          </div>
        </div>
      </div>
      {/* Question */}
      <div className="mt-32 flex gap-8 justify-center items-center">
        <div>Mascote</div>
        <div className="max-w-xl bg-green-200 p-5 rounded-xl rounded-es-none">
          <p className="mb-4">
            {currentQuestion && currentQuestion.question_text}
          </p>
          <CodeBlockComponent code={code} language="html" />
        </div>
      </div>
      {/* Options */}
      <div className="flex justify-center gap-10 mt-10">
        {options &&
          options.map((option, index) => (
            <Sheet key={index}>
              <SheetTrigger>
                <Button onClick={() => handleSubmit(option.option_id)}>
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
                            options.find((o) => o.is_correct)?.option_text
                          }.`}
                    </p>
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button onClick={handleNextQuestion}>Continuar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você perdeu!</AlertDialogTitle>
            <AlertDialogDescription>
              Infelizmente, não foi dessa vez. Você não tem mais tentativas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-400"
              onClick={handleExit}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default QuestionsPage;
