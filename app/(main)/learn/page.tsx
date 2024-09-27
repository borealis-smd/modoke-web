"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  LessonProgress,
  ProgressLesson,
  SectionProgess,
  UnitProgress,
} from "@/types/validators";
import { Units } from "./unit";
import useAuth from "@/lib/hooks/useAuth";
import { useMain } from "../MainContext";

const LearnPage = () => {
  const token = useAuth();

  const [sectionInProgress, setSectionInProgress] =
    useState<SectionProgess | null>(null);
  const [section, setSection] = useState<string>("");
  const [unitInProgress, setUnitInProgress] = useState<UnitProgress | null>(
    null
  );
  const [unit, setUnit] = useState<number>(0);
  const [lessons, setLessons] = useState<LessonProgress[]>([]);
  const [lessonInProgress, setLessonInProgress] =
    useState<ProgressLesson | null>(null);

  const { section: sectionCtx, unit: unitCtx } = useMain();

  useEffect(() => {
    if (!token) return;

    const fetchFromGuide = async () => {
      setSection(sectionCtx);
      setUnit(unitCtx);

      const { data: dbLessons } = await api.get(
        `/lesson/unit?unit_id=${unitCtx}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLessons(dbLessons);
      console.log(dbLessons);
    };

    const fetchLessons = async () => {
      // pegar a seção atual
      const { data: section } = await api.get("/section/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSectionInProgress(section);

      // pegar a unidade atual
      const { data: unit } = await api.get("/unit/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUnitInProgress(unit);

      // pegar as lições de uma unidade
      const { data: dbLessons } = await api.get(
        `/lesson/unit?unit_id=${unit.Unit.unit_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLessons(dbLessons);

      // pegar a lição atual
      const { data: lesson } = await api.get("/lesson/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLessonInProgress(lesson);
    };

    fetchLessons();

    if (sectionCtx && unitCtx) {
      fetchFromGuide();
    }
  }, [token, sectionCtx, unitCtx]);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <FeedWrapper>
        {unitInProgress && sectionInProgress && lessons && (
          <>
            <Header
              section={`Seção ${section ? section : sectionInProgress.Section.section_id}`}
              unit={`Unidade ${unit ? unit : unitInProgress.Unit.unit_sequence}`}
              theme={(unitInProgress as UnitProgress)?.Unit.unit_title}
            />
            <Units lessons={lessons} lessonInProgress={lessonInProgress} />
          </>
        )}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
