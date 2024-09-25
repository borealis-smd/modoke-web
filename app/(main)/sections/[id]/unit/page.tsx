"use client";

import React, { useEffect, useState } from "react";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Unit } from "@/types/validators";
import api from "@/lib/axios";
import * as Icons from "lucide-react";
import useAuth from "@/lib/hooks/useAuth";

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
  const [progresses, setProgresses] = useState<Progress[]>([]);

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

  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[
      iconName as keyof typeof Icons
    ] as React.ElementType;
    if (!IconComponent) return null;
    return (
      <IconComponent
        className="text-secondary/45 hover:text-secondary400 transition-opacity duration-300"
        size={"17rem"}
      />
    );
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
            <Icons.Image />
          </Button>
        </Link>
        <div className="mt-8">
          <h1 className="text-3xl font-semibold mb-4">Unidades</h1>
          {units.length > 0 &&
            progresses?.length > 0 &&
            units.map((unit) => (
              <div key={unit.unit_id} className="mb-4">
                <Link href={`/learn`} passHref>
                  <Button
                    variant="default"
                    className="h-[9.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                    aria-label={`Acessar a seção ${unit.section_id}, unidade ${unit.unit_title}`}
                    title={`Acessar a seção ${unit.section_id}, unidade ${unit.unit_title}`}
                  >
                    <div className="flex flex-col space-y-2 items-start">
                      <h3 className="text-slate-500 font-medium">
                        Seção {unit.section_id}, Unidade {unit.unit_id}
                      </h3>
                      <span className="text-xl lg:text-2xl font-semibold">
                        {unit.unit_title}
                      </span>

                      <div className="flex flex-col items-end">
                        <span className="text-slate-500 text-[12px] font-medium">
                          Progresso:{" "}
                          {
                            progresses?.find((p) => p.unit_id === unit.unit_id)
                              ?.progress
                          }
                          %{" "}
                        </span>
                        <Progress
                          value={
                            progresses?.find((p) => p.unit_id === unit.unit_id)
                              ?.progress
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
              </div>
            ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default UnitPage;
