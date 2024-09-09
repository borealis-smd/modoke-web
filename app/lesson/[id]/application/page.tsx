"use client";

import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { Explanation } from "@/types/validators";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  params: { id: string };
}

function ApplicationPage({ params }: Props) {
  const [applicationInParts, setApplicationInParts] = React.useState<
    string[] | null
  >(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const { data }: { data: Explanation[] } = await api.get(
          `/explanation?lesson_id=${params.id}&part=PART_2`
        );
        const parts = data[0].content
          .split(/(?=<p>)/)
          .filter((part: string) => part.trim() !== "");
        setApplicationInParts(parts);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchDefinition();
  }, [params.id]);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {applicationInParts && (
          <div className="flex gap-8 justify-center items-center text-2xl">
            <div>Mascote</div>
            <div className="flex flex-col gap-5">
              {applicationInParts &&
                applicationInParts.map((part: string, index: number) => (
                  <ChatBubbleComponent key={index} content={part} />
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="text-end absolute bottom-24 right-24">
        <Link href={`/lesson/${params.id}/code`}>
          <Button variant="secondary">Continuar</Button>
        </Link>
      </div>
    </>
  );
}

export default ApplicationPage;
