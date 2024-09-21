"use client";

import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { parseTags } from "@/lib/parseTags";
import { Explanation } from "@/types/validators";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useBreadcrumb } from "../../BreadcrumbContext";

interface Props {
  params: { id: string };
}

function DefinitionPage({ params }: Props) {
  const token = useSession().data?.user.jwt;

  const [definitionInParts, setDefinitionInParts] = React.useState<
    string[] | null
  >(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const { data }: { data: Explanation[] } = await api.get(
          `/explanation?lesson_id=${params.id}&part=PART_1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const parts = parseTags(data[0].content);
        setDefinitionInParts(parts);
      } catch (err: any) {
        console.error(err);
        setError(err);
      }
    };

    if (token) {
      fetchDefinition();
    }
  }, [params.id, token]);

  const { setPastHref } = useBreadcrumb();
  const handleNextPage = () => setPastHref("/definition");

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {definitionInParts && (
          <div className="flex gap-8 justify-center items-center text-2xl">
            <div>Mascote</div>
            <div className="flex flex-col gap-5">
              {definitionInParts &&
                definitionInParts.map((part: string, index: number) => (
                  <ChatBubbleComponent key={index} content={part} />
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="text-end absolute bottom-24 right-24">
        <Link href={`/lesson/${params.id}/application`}>
          <Button variant="secondary" onClick={handleNextPage}>
            Continuar
          </Button>
        </Link>
      </div>
    </>
  );
}

export default DefinitionPage;
