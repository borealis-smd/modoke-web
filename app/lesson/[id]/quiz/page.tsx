"use client";

import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertTitle } from "@/components/ui/alert";
import api from "@/lib/axios";
import { Question, User } from "@/types/validators";
import { useRouter, usePathname } from "next/navigation";
import OptionsComponent from "./OptionsComponent";
import QuestionComponent from "./QuestionComponent";
import TerminalIcon from "@mui/icons-material/TerminalOutlined";
import { useBreadcrumb } from "../../BreadcrumbContext";
import StartQuizComponent from "./StartQuizComponent";
import { useQuiz } from "../../QuizContext";

interface Props {
  params: { id: string };
}

function QuizContent({ params }: Props) {
  const router = useRouter();
  const [lessonQuestions, setLessonQuestions] = React.useState<Question>([]);
  const [error, setError] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<
    (typeof options)[0] | null
  >(null);
  const [hasStarted, setHasStarted] = React.useState(false);

  const {
    isAlertOpen,
    setIsAlertOpen,
    breadcrumbChangeTo,
    isFinished,
    setIsFinished,
  } = useBreadcrumb();

  const {
    xp,
    attempt,
    currentQuestionIndex,
    setXp,
    setAttempt,
    setProgress,
    setCurrentQuestionIndex,
    setNumQuestions,
  } = useQuiz();

  useEffect(() => {
    const fetchLessonQuestions = async () => {
      try {
        const { data: lessonQuestions } = await api.get(
          `/question/lesson?lesson_id=${params.id}`
        );
        setLessonQuestions(lessonQuestions);
        setNumQuestions(lessonQuestions.length);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchLessonQuestions();
  }, [params.id]);

  const currentQuestion = lessonQuestions[currentQuestionIndex];

  const options = currentQuestion?.Options;

  const handleNextQuestion = async () => {
    setSelectedOption(null);

    if (attempt === 0) {
      setIsDialogOpen(true);
      return;
    }

    if (currentQuestionIndex === lessonQuestions.length - 1) {
      const { data }: { data: User } = await api.get("/user/");
      await api.put("/user/", { xp: data.xp + xp });

      // await api.put(`/lesson/finish?lesson_id=${params.id}`);
      setIsFinished(true);
      router.push(`/lesson/${params.id}/quiz/feedback`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async (optionId: number) => {
    const selected =
      options.find((option) => option.option_id === optionId) || null;
    setSelectedOption(selected);

    await api.post("/attempt", {
      question_id: currentQuestion.question_id,
      selected_option_id: optionId,
    });

    if (selected?.is_correct) {
      setXp((prev) => prev + currentQuestion.xp);
    } else {
      setAttempt((prev) => prev - 1);
    }

    setProgress((prev) => prev + (1 / lessonQuestions.length) * 100);
  };

  const currentPath = usePathname();
  const handleExit = (path: string = "/learn") => {
    if (path === "/learn") {
      router.push(path);
    } else {
      const basePath = currentPath.substring(0, currentPath.lastIndexOf("/"));
      const newPath = `${basePath}/${path}`;
      router.push(newPath);
    }
  };

  return (
    <>
      {!isFinished ? (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent className="max-w-2xl h-[620px] flex flex-col items-center justify-center">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-black text-center">
                EII, NÃO SAIA!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-lg">
                Você perderá seu progresso. Tem certeza que deseja sair?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full sm:space-x-0 max-w-[480px]">
              <AlertDialogCancel>Continuar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-400"
                onClick={() =>
                  breadcrumbChangeTo
                    ? handleExit(breadcrumbChangeTo)
                    : handleExit()
                }
              >
                Sair
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        (isAlertOpen && handleExit()) || null
      )}

      {error ? (
        <Alert className="bg-red-400 text-black mt-5 flex items-center">
          <AlertTitle className="inline-flex gap-2 items-center">
            <TerminalIcon className="w-8 h-8" />
            Essa não! Ocorreu um erro.
          </AlertTitle>
        </Alert>
      ) : (
        <>
          {hasStarted ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <QuestionComponent currentQuestion={currentQuestion} />
              <OptionsComponent
                options={options}
                selectedOption={selectedOption}
                handleSubmit={handleSubmit}
                handleNextQuestion={handleNextQuestion}
              />
            </div>
          ) : (
            <StartQuizComponent setHasStarted={setHasStarted} />
          )}
        </>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Você perdeu!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Infelizmente, não foi dessa vez. Você não tem mais tentativas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-400"
              onClick={() => handleExit()}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default QuizContent;
