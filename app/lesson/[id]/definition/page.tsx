"use client";

import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { parseTags } from "@/lib/parseTags";
import { Explanation } from "@/types/validators";
import Link from "next/link";
import React, { useEffect } from "react";
import { useBreadcrumb } from "../../BreadcrumbContext";
import useAuth from "@/lib/hooks/useAuth";
import Image from "next/image";

interface Props {
  params: { id: string };
}

function DefinitionPage({ params }: Props) {
  const token = useAuth();

  const [definitionInParts, setDefinitionInParts] = React.useState<
    string[] | null
  >(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (!token) return;

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

    fetchDefinition();
  }, [params.id, token]);

  const { setPastHref } = useBreadcrumb();
  const handleNextPage = () => setPastHref("/definition");

  return (
    <>
      {definitionInParts && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-8 justify-center items-center text-2xl">
              <Image
                src={
                  "https://projeto-modoke.s3.us-east-2.amazonaws.com/modoke/Defini%C3%A7%C3%A3o.png"
                }
                width={350}
                height={350}
                alt="Ilustração de um cachorro olhando para você."
              />
              <div className="flex flex-col gap-5">
                {definitionInParts &&
                  definitionInParts.map((part: string, index: number) => (
                    <ChatBubbleComponent key={index} content={part} />
                  ))}
              </div>
            </div>
          </div>
          <div className="text-end absolute bottom-24 right-24">
            <Link href={`/lesson/${params.id}/application`}>
              <Button variant="secondary" onClick={handleNextPage}>
                Continuar
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default DefinitionPage;
