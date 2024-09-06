"use client";

import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";
import OptionsComponent from "./OptionsComponent";
import QuestionComponent from "./QuestionComponent";
import PetsIcon from "@mui/icons-material/Pets";
import TerminalIcon from "@mui/icons-material/TerminalOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ElectricBoltSharpIcon from "@mui/icons-material/ElectricBoltSharp";

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
  const code = `<html _____ = “pt-br”>
  ...
</html>`;

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
      setFinished(true);

      const { data }: { data: User } = await api.get("/user/");
      await api.put("/user/", { xp: data.xp + xp });

      // await api.put(`/lesson/finish?lesson_id=${params.id}`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async (optionId: number) => {
    await api.post("/attempt", {
      question_id: currentQuestion.question_id,
      selected_option_id: optionId,
    });

    const selected =
      options.find((option) => option.option_id === optionId) || null;
    setSelectedOption(selected);

    if (selected?.is_correct) {
      setXp((prev) => prev + currentQuestion.xp);
    } else {
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
            <ArrowBackIcon aria-label="Fechar" />
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
          <Progress className="border-2 border-black/50" value={progress} />
          <div className="inline-flex gap-1 items-center">
            <PetsIcon aria-hidden="true" />
            {attempt}
          </div>
        </div>
      </div>

      {error && (
        <Alert className="bg-red-400 text-black mt-5 flex items-center">
          <AlertTitle className="inline-flex gap-2 items-center">
            <TerminalIcon className="h-6 w-6" />
            Essa não! Ocorreu um erro.
          </AlertTitle>
        </Alert>
      )}

      {finished ? (
        <div className="mt-32 flex gap-8 justify-center items-center text-2xl">
          <div>Mascote</div>
          <div className="flex flex-col">
            <div className="max-w-xl bg-green-200 p-5 rounded-xl rounded-es-none mb-3">
              Parabéns! Lição concluída!
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
      ) : (
        <>
          <QuestionComponent currentQuestion={currentQuestion} code={code} />

          <OptionsComponent
            options={options}
            selectedOption={selectedOption}
            handleSubmit={handleSubmit}
            handleNextQuestion={handleNextQuestion}
          />
        </>
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
