"use client";

import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import api from "@/lib/axios";
import { Definition } from "@/types/validators";
import React, { useEffect } from "react";

interface Props {
  params: { id: string };
}

function DefinitionPage({ params }: Props) {
  const [definitionInParts, setDefinitionInParts] = React.useState<
    string[] | null
  >(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const { data }: { data: Definition[] } = await api.get(
          `/explanation?lesson_id=${params.id}&part=PART_1`
        );
        const parts = data[0].content
          .split(/(?=<p>|<CodeBlockComponent>)/)
          .filter((part: string) => part.trim() !== "");
        setDefinitionInParts(parts);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchDefinition();
  }, [params.id]);

  return (
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
  );
}

export default DefinitionPage;
