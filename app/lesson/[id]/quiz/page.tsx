"use client";

import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertTitle } from "@/components/ui/alert";
import api from "@/lib/axios";
import { Option, Question, User } from "@/types/validators";
import { useRouter, usePathname } from "next/navigation";
import OptionsComponent from "./OptionsComponent";
import QuestionComponent from "./QuestionComponent";
import TerminalIcon from "@mui/icons-material/TerminalOutlined";
import { useBreadcrumb } from "../../BreadcrumbContext";
import StartQuizComponent from "./StartQuizComponent";
import { useQuiz } from "../../QuizContext";
import CloseAlertComponent from "../../CloseAlertComponent";
import useAuth from "@/lib/hooks/useAuth";

import Image from "next/image";

interface Props {
  params: { id: string };
}

function QuizContent({ params }: Props) {
  const router = useRouter();

  const token = useAuth();

  const { pastHref, setPastHref } = useBreadcrumb();

  const [lessonQuestions, setLessonQuestions] = React.useState<Question[]>([]);
  const [error, setError] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(
    null
  );
  const [hasStarted, setHasStarted] = React.useState(false);

  const { isAlertOpen, setIsAlertOpen, breadcrumbChangeTo } = useBreadcrumb();

  const {
    xp,
    attempt,
    currentQuestionIndex,
    isFinished,
    setXp,
    setAttempt,
    setCurrentQuestionIndex,
    setNumQuestions,
    setIsFinished,
    setBadge,
  } = useQuiz();

  useEffect(() => {
    if (!token) return;

    if (pastHref !== "/code") {
      router.push("/learn");
    }

    const fetchLessonQuestions = async () => {
      try {
        const { data: lessonQuestions } = await api.get(
          `/question/lesson?lesson_id=${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLessonQuestions(lessonQuestions);
        setNumQuestions(lessonQuestions.length);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchLessonQuestions();
  }, [params.id, token]);

  const currentQuestion = lessonQuestions[currentQuestionIndex];

  const options = currentQuestion?.Options;

  const handleNextQuestion = async () => {
    if (!token) return;

    setSelectedOption(null);

    if (attempt === 0) {
      setIsDialogOpen(true);
      return;
    }

    try {
      if (currentQuestionIndex === lessonQuestions.length - 1) {
        await finishLesson();
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } catch (error: any) {
      console.error("Error in handleNextQuestion:", error);
      setError(error);
    }
  };

  const finishLesson = async () => {
    try {
      const userData = await fetchUserData();
      await updateUserXP(userData.xp + xp);
      await markLessonAsFinished();
      setIsFinished(true);
      setPastHref("/quiz");
      router.push(`/lesson/${params.id}/quiz/feedback`);
    } catch (error: any) {
      setError(error);
    }
  };

  const fetchUserData = async () => {
    const { data }: { data: User } = await api.get("/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  const updateUserXP = async (newXP: number) => {
    await api.put(
      "/user/",
      { xp: newXP },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const markLessonAsFinished = async () => {
    try {
      const { data: response } = await api.put(
        `/lesson/finish?lesson_id=${params.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.badge) {
        setBadge(response.badge);
      }
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
  };

  const handleSubmit = async (optionId: number) => {
    if (!token) return;

    const selected =
      options.find((option) => option.option_id === optionId) || null;
    setSelectedOption(selected);

    await api.post(
      "/attempt",
      {
        question_id: currentQuestion.question_id,
        selected_option_id: optionId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (selected?.is_correct) {
      setXp((prev) => prev + currentQuestion.xp);
    } else {
      setAttempt((prev) => prev - 1);
    }
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

  const handleRetakeTest = () => {
    setHasStarted(false);
    setAttempt(3);
    setCurrentQuestionIndex(0);
    setXp(0);
    setIsFinished(false);
    setIsDialogOpen(false);
    return;
  };

  return (
    <>
      {!isFinished ? (
        <CloseAlertComponent
          open={isAlertOpen}
          onOpenChange={setIsAlertOpen}
          onClick={() =>
            breadcrumbChangeTo ? handleExit(breadcrumbChangeTo) : handleExit()
          }
        />
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
            <div className="my-32">
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
        <AlertDialogContent className="max-w-2xl h-[620px] flex flex-col items-center justify-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flex-col items-center justify-center font-black text-2xl text-center">
              <Image
                src={
                  "https://projeto-modoke.s3.us-east-2.amazonaws.com/modoke/Modoke+chorando.png"
                }
                width={350}
                height={350}
                alt="Ilustração de um cachorro chorando."
              />
              Poxa... você perdeu!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-center px-10">
              Infelizmente, não foi dessa vez. Você não tem mais tentativas, mas
              você pode refazer este teste se quiser.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full sm:space-x-0 max-w-[480px]">
            <AlertDialogAction
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => handleRetakeTest()}
            >
              Refazer
            </AlertDialogAction>
            <AlertDialogAction
              className="bg-white text-secondary-foreground hover:bg-secondary/20"
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
