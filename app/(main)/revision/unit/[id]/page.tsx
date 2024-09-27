"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import api from "@/lib/axios";
import useAuth from "@/lib/hooks/useAuth";
import { LessonExplanation } from "@/types/validators";
import { parseContent } from "@/lib/parseContent";

interface Props {
  params: { id: string };
}

const RevisionUnit = ({ params }: Props) => {
  const token = useAuth();

  const [contents, setContents] = useState<LessonExplanation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchContent = async () => {
      try {
        const { data: lessons } = await api.get(
          `/lesson/unit?unit_id=${params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setContents(lessons);
      } catch (error) {
        setError("Ocorreu um erro ao carregar as unidades.");
      }
    };

    fetchContent();
  }, [token, params.id]);

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <FeedWrapper>
        <Link href="/revision" passHref>
          <Button
            variant="secondary"
            className="flex"
            aria-label="Voltar para a lista de revisões"
          >
            <ArrowBack className="mr-2" />
            Voltar
          </Button>
        </Link>

        {contents.length > 0 &&
          contents.map(
            (content) =>
              content.Explanations.length > 0 && (
                <article
                  key={content.lesson_id}
                  className="mt-8 bg-white p-4 lg:p-8 border-2 border-slate-300/50 rounded-lg"
                >
                  <h1 className="text-xl lg:text-2xl font-semibold mb-4 text-primary">
                    Lição {content.lesson_sequence}: {content.lesson_title}
                  </h1>
                  {content.Explanations.map((explanation) => (
                    <p
                      className="text-sm lg:text-base pb-2"
                      key={explanation.explanation_id}
                    >
                      {parseContent(explanation.content)}
                    </p>
                  ))}
                </article>
              )
          )}
      </FeedWrapper>
    </div>
  );
};

export default RevisionUnit;
