import React from "react";
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
import classnames from "classnames";
import { Lesson } from "@/types/validators";
import { Button } from "@/components/ui/button";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface Props {
  options: Lesson[0]["Options"];
  selectedOption: Lesson[0]["Options"][0] | null;
  handleSubmit: (option_id: number) => void;
  handleNextQuestion: () => void;
}

const OptionsComponent = ({
  options,
  selectedOption,
  handleSubmit,
  handleNextQuestion,
}: Props) => {
  return (
    <div className="flex justify-center flex-wrap gap-10 mt-10">
      {options &&
        options.map((option, index) => (
          <Sheet key={index}>
            <SheetTrigger tabIndex={-1}>
              <Button
                onClick={() => handleSubmit(option.option_id)}
                tabIndex={0}
                role="button"
                className={(classnames({
                  "bg-red-400":
                    selectedOption &&
                    selectedOption.option_id === option.option_id,
                  "bg-green-400": selectedOption && option.is_correct,
                })) + " w-56"}
              >
                {option.option_text}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className={
                classnames({
                  "bg-green-400": option.is_correct,
                  "bg-red-400": !option.is_correct,
                }) + " flex flex-row items-center justify-between py-12 px-36 rounded-ss-3xl rounded-se-3xl"
              }
            >
              <SheetHeader className="flex flex-row items-center gap-9">
                <div>
                  {option.is_correct ? (
                    <TaskAltIcon className="w-20 h-20" />
                  ) : (
                    <HighlightOffIcon className="w-20 h-20" />
                  )}
                </div>
                <div>
                  <SheetTitle className="text-4xl">
                    {option.is_correct ? "Parabéns!" : "Oops!"}
                  </SheetTitle>
                  <SheetDescription className="text-black text-xl">
                    <p>
                      {option.is_correct
                        ? "Você acertou! Continue aprendendo."
                        : `Você errou! A resposta correta é ${
                            options.find((o) => o.is_correct)?.option_text
                          }.`}
                    </p>
                  </SheetDescription>
                </div>
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
  );
};

export default OptionsComponent;
