import Link from "next/link";
import { Check, Lock, Flag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  lesson_id: number;
  lesson_title: string;
  lesson_description: string;
  lesson_principle: number;
  unit_id: number;
  is_completed: boolean;
  locked?: boolean;
  current?: boolean;
  totalCount: number;
  index: number;
};

export const LessonButton = ({
  lesson_id,
  index,
  locked,
  totalCount,
  current,
  is_completed,
  lesson_title,
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  // Calcular o nível de indentação com base no índice
  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  // Definir o deslocamento `right` com base no tamanho da tela
  const rightPositionLg = indentationLevel * 120; // Para telas maiores
  const rightPositionSm = indentationLevel * 40;  // Para telas menores

  // Verificar se é o primeiro ou último botão
  const isFirst = index === 0;
  const isLast = index === totalCount - 1;

  // Verificar se a lição foi completada
  const isCompleted = is_completed && !current && !locked;

  // Escolher o ícone correto para a lição
  const Icon = isFirst
    ? Star
    : isCompleted && !isLast || isCompleted && !isFirst
      ? Check
      : isLast
        ? Flag
        : locked
          ? Lock
          : isCompleted
            ? Check
            : Lock;

  // Definir o href com base se a lição foi completada ou não
  const href = isCompleted ? `/lesson/${lesson_id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          marginTop: index === 0 && !isCompleted ? 60 : 24, // Ajustar o espaçamento superior para o primeiro item
          zIndex: 10,
          right: `clamp(${rightPositionSm}px, 5vw, ${rightPositionLg}px)`, // deslocamento right de acordo com o tamanho da tela
        }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            {!isFirst ? (
              <Button
                size="rounded"
                variant={!isCompleted ? "locked" : "lesson"}
                className={cn(
                  "h-[140px] w-[140px] border-b-8",
                  index === 0 && !isCompleted && "border",
                  !isCompleted && "bg-neutral-200",
                  isCompleted && "bg-green-500"
                )}
              >
                <Icon
                  className={cn(
                    "h-[50px] w-[50px]",
                    locked
                      ? "text-neutral-400 stroke-neutral-400" // Cor cinza escuro para o ícone bloqueado
                      : isCompleted
                        ? "fill-none text-primary-foreground"     // Cor para quando completado
                        : "text-neutral-400 stroke-neutral-400", // Cor padrão cinza escuro
                    isCompleted && "fill-none stroke-[4]" // Ajusta o stroke para lições completadas
                  )}
                />
              </Button>
            ) : (
              <div className="relative h-[102px] w-[102px]">
                <div className="absolute border-neutral-40/25 0 -top-6 left-3.5 px-3 py-2.5 border-2 font-semibold uppercase text-green-800 bg-white rounded-xl animate-bounce tracking-wide z-10">
                  COMEÇAR
                  <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"></div>
                </div>
                <Button
                  size="rounded"
                  variant={"lesson"}
                  className={"h-[140px] w-[140px] border-b-8"}
                >
                  <Icon
                    className={cn(
                      "h-[50px] w-[50px]",
                      locked
                        ? "fill-neutral-600 text-neutral-800 stroke-neutral-600" // Cor cinza mais escura com contraste
                        : "fill-primary-foreground text-primary-foreground",
                      isCompleted && "fill-none stroke-[4]"
                    )}
                  />
                </Button>
              </div>
            )}
          </div>
          <span
            className={cn(
              "text-center font-regular text-lg",
              index === 0 && "ml-10 mt-12",
              index !== 0 && "mt-2"
            )}
          >
            {lesson_title}
          </span>
        </div>
      </div>
    </Link>
  );
};
