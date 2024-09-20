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
import { Question } from "@/types/validators";
import { Button } from "@/components/ui/button";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface Props {
  options: Question["Options"];
  selectedOption: Question["Options"][0] | null;
  handleSubmit: (option_id: number) => void;
  handleNextQuestion: () => void;
}

const OptionsComponent = ({
  options,
  selectedOption,
  handleSubmit,
  handleNextQuestion,
}: Props) => {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleSheetClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSheetOpen(false);
      setIsClosing(false);
      handleNextQuestion();
    }, 300);
  };

  React.useEffect(() => {
    if (selectedOption) {
      setIsSheetOpen(true);
    }
  }, [selectedOption]);

  return (
    <div className="flex justify-center gap-10 mt-10 mx-8 flex-wrap">
      {options &&
        options.map((option) => (
          <Sheet key={option.option_id} open={isSheetOpen}>
            <SheetTrigger tabIndex={-1}>
              <Button
                onClick={() => handleSubmit(option.option_id)}
                tabIndex={0}
                role="button"
                className={classnames(
                  {
                    "bg-red-400":
                      selectedOption &&
                      selectedOption.option_id === option.option_id,
                    "bg-green-400": selectedOption && option.is_correct,
                  },
                  "max-w-80 w-max p-4 h-max max-h-36 text-lg text-wrap"
                )}
              >
                {option.option_text}
              </Button>
            </SheetTrigger>
            {selectedOption &&
              selectedOption.option_id === option.option_id && (
                <SheetContent
                  side="bottom"
                  className={classnames(
                    {
                      "bg-green-400": option.is_correct,
                      "bg-red-400": !option.is_correct,
                      "ease-in-out animate-out duration-300 slide-out-to-bottom transition-opacity opacity-0":
                        isClosing,
                    },
                    "flex flex-row items-center justify-between py-12 px-36 rounded-ss-3xl rounded-se-3xl"
                  )}
                >
                  <SheetHeader className="flex flex-row items-center gap-9">
                    <div>
                      {option.is_correct ? (
                        <TaskAltIcon sx={{ width: 80, height: 80 }} />
                      ) : (
                        <HighlightOffIcon sx={{ width: 80, height: 80 }} />
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
                      <Button onClick={handleSheetClose}>Continuar</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              )}
          </Sheet>
        ))}
    </div>
  );
};

export default OptionsComponent;
