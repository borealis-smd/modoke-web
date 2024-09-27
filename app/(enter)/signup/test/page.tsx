"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Option, Question } from "@/types/validators";
import StartTestComponent from "./StartTestComponent";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { TerminalIcon } from "lucide-react";
import OptionsComponent from "@/app/lesson/[id]/quiz/OptionsComponent";
import QuestionComponent from "@/app/lesson/[id]/quiz/QuestionComponent";
import { useTest } from "../../TestContext";
import { useRouter } from "next/navigation";
import CloseAlertComponent from "@/app/lesson/CloseAlertComponent";

function EntranceTestPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setLevel, setIsFinished, isAlertOpen, setIsAlertOpen } = useTest();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data: questions } = await api.get(`/question/entranceTest`);
        setQuestions(questions);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const options = currentQuestion?.Options;

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleRegisterAnswer = (optionId: number) => {
    if (options) {
      const selected = options.find((option) => option.option_id === optionId);
      if (selected) {
        setSelectedOption(selected);
        setSelectedOptions([...selectedOptions, selected]);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 === questions.length) {
      setIsFinished(true);
      defineUserLevel(selectedOptions);
      router.push("/signup/test/feedback");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const defineUserLevel = (answers: Option[]) => {
    const levelA = answers.slice(0, 4);
    const levelAA = answers.slice(4, 7);
    const levelAAA = answers.slice(7, 9);

    const correctA = levelA.filter((answer) => answer.is_correct).length;
    const correctAA = levelAA.filter((answer) => answer.is_correct).length;
    const correctAAA = levelAAA.filter((answer) => answer.is_correct).length;

    const percentageA = (correctA / levelA.length) * 100;
    const percentageAA = (correctAA / levelAA.length) * 100;
    const percentageAAA = (correctAAA / levelAAA.length) * 100;

    if (percentageA === 1 && percentageAA === 1 && percentageAAA === 1) {
      setLevel("AAA");
    } else if (percentageA === 1 && percentageAA >= 0.75) {
      setLevel("AA");
    } else {
      setLevel("A");
    }
  };

  const handleExit = () => {
    setIsAlertOpen(false);
    router.push("/");
  };

  return (
    <>
      <CloseAlertComponent
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onClick={() => handleExit()}
      />

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
                handleSubmit={handleRegisterAnswer}
                handleNextQuestion={handleNextQuestion}
              />
            </div>
          ) : (
            <StartTestComponent setHasStarted={setHasStarted} />
          )}
        </>
      )}
    </>
  );
}

export default EntranceTestPage;
