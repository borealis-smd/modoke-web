"use client";

import React, { useCallback, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import BreadcrumbComponent from "../../BreadcrumbComponent";
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
import { Alert, AlertTitle } from "@/components/ui/alert";
import api from "@/lib/axios";
import { Lesson, User } from "@/types/validators";
import { useRouter, usePathname } from "next/navigation";
import OptionsComponent from "./OptionsComponent";
import QuestionComponent from "./QuestionComponent";
import PetsIcon from "@mui/icons-material/Pets";
import TerminalIcon from "@mui/icons-material/TerminalOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ElectricBoltSharpIcon from "@mui/icons-material/ElectricBoltSharp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface Props {
  params: { id: string };
}

function QuestionsPage({ params }: Props) {
  const router = useRouter();
  const [lessonQuestions, setLessonQuestions] = React.useState<Lesson>([]);
  const [error, setError] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<
    (typeof options)[0] | null
  >(null);
  const [finished, setFinished] = React.useState(false);
  const [xp, setXp] = React.useState(0);

  useEffect(() => {
    const fetchLessonQuestions = async () => {
      try {
        // setFinished(true);
        // setConfetti(true);

        const { data: lessonQuestions } = await api.get(
          `/question/lesson?lesson_id=${params.id}`
        );
        setLessonQuestions(lessonQuestions);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchLessonQuestions();
  }, [params.id]);

  const [attempt, setAttempt] = React.useState(5);

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
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
      setFinished(true);
      setConfetti(true);
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

  const { width, height } = useWindowSize();
  const [confetti, setConfetti] = React.useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (confetti) {
      timer = setTimeout(() => {
        setConfetti(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [confetti]);

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [breadcrumbChangeTo, setBreadcrumbChangeTo] = React.useState("");
  const handleBreadcrumbPageChange = useCallback(
    (data: { activeLinkHref: string; changeTo: string }) => {
      if (data.activeLinkHref === "/test") {
        setIsAlertOpen(true);
        setBreadcrumbChangeTo(data.changeTo);
      } else {
        handleExit(data.changeTo);
      }
    },
    []
  );

  return (
    <div className="mx-24 py-14">
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

      <BreadcrumbComponent
        activeHref="/test"
        onData={handleBreadcrumbPageChange}
      />

      <div className="flex items-center justify-between">
        {!finished ? (
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogTrigger className="flex gap-1">
              <ArrowBackIcon className="w-8 h-8" aria-label="Fechar" />
            </AlertDialogTrigger>
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
          <Link href="/learn">
            <ArrowBackIcon className="w-8 h-8" aria-label="Fechar" />
          </Link>
        )}

        <Progress
          className="border-2 border-black/50 max-w-[1382px] h-[32px] mx-14"
          value={progress}
        />
        <div className="inline-flex gap-1 items-center">
          <PetsIcon className="w-8 h-7" aria-hidden="true" />
          {attempt}
        </div>
      </div>

      {error ? (
        <Alert className="bg-red-400 text-black mt-5 flex items-center">
          <AlertTitle className="inline-flex gap-2 items-center">
            <TerminalIcon className="w-8 h-8" />
            Essa não! Ocorreu um erro.
          </AlertTitle>
        </Alert>
      ) : finished ? (
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
                    <TaskAltIcon /> {lessonQuestions.length - (5 - attempt)}/
                    {lessonQuestions.length}
                  </div>
                  <div className="inline-flex gap-1 items-center">
                    <ElectricBoltSharpIcon /> {xp} XP
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
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <QuestionComponent currentQuestion={currentQuestion} />
          <OptionsComponent
            options={options}
            selectedOption={selectedOption}
            handleSubmit={handleSubmit}
            handleNextQuestion={handleNextQuestion}
          />
        </div>
      )}

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
              onClick={() => handleExit()}
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
