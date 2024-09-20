"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";
import {
  Lesson,
  LessonProgress,
  SectionProgess,
  UnitProgress,
} from "@/types/validators";
import { Units } from "./unit";
import { useRouter } from "next/navigation";

const LearnPage = () => {
  const token = useSession().data?.user.jwt;
  const router = useRouter();
  if (!token) {
    router.push("/signin");
  }

  const [sectionInProgress, setSectionInProgress] =
    useState<SectionProgess | null>(null);
  const [unitInProgress, setUnitInProgress] = useState<UnitProgress | null>(
    null
  );
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonInProgress, setLessonInProgress] =
    useState<LessonProgress | null>(null);

  useEffect(() => {
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
      const { data: lessons } = await api.get(
        `/lesson/unit?unit_id=${unit.Unit.unit_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLessons(lessons);

      // pegar a lição atual
      const { data: lesson } = await api.get("/lesson/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLessonInProgress(lesson);
    };

    if (token) {
      fetchLessons();
    }
  }, [token]);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <FeedWrapper>
        {lessonInProgress && unitInProgress && sectionInProgress && lessons && (
          <>
            <Header
              unit={`Unidade ${unitInProgress?.Unit.unit_id}`}
              section={`Seção ${sectionInProgress?.Section.section_title}`}
              theme="Conteúdo"
            />
            <Units lessons={lessons} lessonInProgress={lessonInProgress} />
          </>
        )}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
