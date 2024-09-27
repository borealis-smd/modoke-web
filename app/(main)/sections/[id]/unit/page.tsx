"use client";

import React, { useEffect, useState } from "react";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Unit, UnitProgress } from "@/types/validators";
import api from "@/lib/axios";
import useAuth from "@/lib/hooks/useAuth";
import { renderIcon } from "@/app/(main)/revision/RenderIcon";
import { useMain } from "@/app/(main)/MainContext";

interface Props {
  params: {
    id: string;
  };
}

interface Progress {
  unit_id: number;
  progress: number;
}

const UnitPage = ({ params }: Props) => {
  const token = useAuth();

  const [units, setUnits] = useState<Unit[]>([]);
  const [userUnit, setUserUnit] = useState<UnitProgress>();
  const [progresses, setProgresses] = useState<Progress[]>([]);

  const levels = [
    { level: "A", description: "Iniciante" },
    { level: "AA", description: "Intermediário" },
    { level: "AAA", description: "Avançado" },
  ];

  useEffect(() => {
    if (!token) return;

    const fetchUnits = async () => {
      const { data: units } = await api.get(
        `/unit/section?section_id=${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUnits(units);
      calculateProgress(units);

      const { data: userUnit } = await api.get("/unit/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserUnit(userUnit);
      console.log(userUnit);
    };

    fetchUnits();
  }, [token]);

  const calculateProgress = (units: Unit[]) => {
    const progress = units.map((unit) => {
      const totalLessons = unit.Lessons.length;
      const completedLessons = unit.Lessons.filter((lesson) =>
        lesson.LessonProgresses.some((progress) => progress.completed_at)
      ).length;
      const percentage = (completedLessons / totalLessons) * 100;

      return {
        unit_id: unit.unit_id,
        progress: percentage,
      };
    });

    setProgresses(progress);
  };

  const { setSection, setUnit } = useMain();
  const handleGuideChange = (section_id: number, unit_sequence: number) => {
    setSection(levels[section_id - 1].level);
    setUnit(unit_sequence);
  };

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <FeedWrapper>
        <Link href="/sections" passHref>
          <Button
            variant="secondary"
            className="flex"
            aria-label="Voltar para a página de sessões"
          >
            <ArrowBack className="mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="mt-8">
          <h1 className="text-3xl font-semibold mb-4">Unidades</h1>
          {units.length > 0 &&
            progresses?.length > 0 &&
            units.map((unit) => (
              <div key={unit.unit_id} className="mb-4">
                {unit.unit_sequence > userUnit?.Unit.unit_sequence! ? (
                  <div>
                    <Button
                      variant="default"
                      className="h-[9.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                      aria-label={`Acessar a seção ${unit.section_id}, unidade ${unit.unit_title}`}
                      title={`Acessar a seção ${unit.section_id}, unidade ${unit.unit_title}`}
                      disabled
                      onClick={() =>
                        handleGuideChange(unit.section_id, unit.unit_sequence)
                      }
                    >
                      <div className="flex flex-col space-y-2 items-start">
                        <h3 className="text-slate-500 font-medium">
                          Seção {levels[unit.section_id - 1].level}, Unidade{" "}
                          {unit.unit_sequence}
                        </h3>
                        <span className="text-xl lg:text-2xl font-semibold">
                          {unit.unit_title}
                        </span>

                        <div className="flex flex-col items-end">
                          <span className="text-slate-500 text-[12px] font-medium">
                            Progresso:{" "}
                            {
                              progresses?.find(
                                (p) => p.unit_id === unit.unit_id
                              )?.progress
                            }
                            %{" "}
                          </span>
                          <Progress
                            value={
                              progresses?.find(
                                (p) => p.unit_id === unit.unit_id
                              )?.progress
                            }
                            className="w-80 bg-white border-2"
                          />
                        </div>
                      </div>
                      <span className="absolute -bottom-9 lg:-bottom-24 right-0 hidden lg:block lg:text-[11rem] font-bold leading-none opacity-20 transition-opacity duration-300 group-hover:opacity-100 tracking-tight">
                        {unit.unit_icon && renderIcon(unit.unit_icon)}
                      </span>
                    </Button>
                  </div>
                ) : (
                  <Link href={`/learn`} passHref>
                    <Button
                      variant="default"
                      className="h-[9.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                      aria-label={`Acessar a seção ${unit.section_id}, unidade ${unit.unit_title}`}
                      title={`Acessar a seção ${unit.section_id}, unidade ${unit.unit_title}`}
                      onClick={() =>
                        handleGuideChange(unit.section_id, unit.unit_sequence)
                      }
                    >
                      <div className="flex flex-col space-y-2 items-start">
                        <h3 className="text-slate-500 font-medium">
                          Seção {levels[unit.section_id - 1].level}, Unidade{" "}
                          {unit.unit_sequence}
                        </h3>
                        <span className="text-xl lg:text-2xl font-semibold">
                          {unit.unit_title}
                        </span>

                        <div className="flex flex-col items-end">
                          <span className="text-slate-500 text-[12px] font-medium">
                            Progresso:{" "}
                            {
                              progresses?.find(
                                (p) => p.unit_id === unit.unit_id
                              )?.progress
                            }
                            %{" "}
                          </span>
                          <Progress
                            value={
                              progresses?.find(
                                (p) => p.unit_id === unit.unit_id
                              )?.progress
                            }
                            className="w-80 bg-white border-2"
                          />
                        </div>
                      </div>
                      <span className="absolute -bottom-9 lg:-bottom-24 right-0 hidden lg:block lg:text-[11rem] font-bold leading-none opacity-20 transition-opacity duration-300 group-hover:opacity-100 tracking-tight">
                        {unit.unit_icon && renderIcon(unit.unit_icon)}
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default UnitPage;
