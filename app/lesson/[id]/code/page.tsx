"use client";

import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { parseTags } from "@/lib/parseTags";
import { Explanation } from "@/types/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useBreadcrumb } from "../../BreadcrumbContext";
import useAuth from "@/lib/hooks/useAuth";

import Image from "next/image";

interface Props {
  params: { id: string };
}

function CodePage({ params }: Props) {
  const router = useRouter();

  const token = useAuth();

  const { pastHref, setPastHref } = useBreadcrumb();

  const [codeInParts, setCodeInParts] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (!token) return;

    if (!["/application", "/quiz"].includes(pastHref)) {
      router.push("/learn");
    }

    const fetchCode = async () => {
      try {
        const { data }: { data: Explanation[] } = await api.get(
          `/explanation?lesson_id=${params.id}&part=PART_3`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!data || data.length === 0) {
          handleNextPage();
          router.push(`/lesson/${params.id}/quiz`);
          return;
        }

        const parts = parseTags(data[0].content);
        setCodeInParts(parts);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchCode();
  }, [params.id, token]);

  const handleNextPage = () => setPastHref("/code");

  return (
    <>
      {codeInParts && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-8 justify-center items-center text-2xl">
              <Image
                src={
                  "https://projeto-modoke.s3.us-east-2.amazonaws.com/modoke/Aplica%C3%A7%C3%A3o.png"
                }
                width={300}
                height={300}
                alt="Ilustração de um cachorro olhando para você."
              />
              <div className="flex flex-col gap-5">
                {codeInParts &&
                  codeInParts.map((part: string, index: number) => (
                    <ChatBubbleComponent key={index} content={part} />
                  ))}
              </div>
            </div>
          </div>
          <div className="text-end absolute bottom-24 right-24">
            <Link href={`/lesson/${params.id}/quiz`}>
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

export default CodePage;
