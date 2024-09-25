"use client";

import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { parseTags } from "@/lib/parseTags";
import { Explanation } from "@/types/validators";
import Link from "next/link";
import React, { useEffect } from "react";
import { useBreadcrumb } from "../../BreadcrumbContext";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";

interface Props {
  params: { id: string };
}

function ApplicationPage({ params }: Props) {
  const router = useRouter();

  const token = useAuth();

  const [applicationInParts, setApplicationInParts] = React.useState<
    string[] | null
  >(null);
  const [error, setError] = React.useState(null);

  const { pastHref, setPastHref } = useBreadcrumb();

  useEffect(() => {
    if (!token) return;

    if (!["/definition", "/code", "/quiz"].includes(pastHref)) {
      router.push("/learn");
    }

    const fetchApplication = async () => {
      try {
        const { data }: { data: Explanation[] } = await api.get(
          `/explanation?lesson_id=${params.id}&part=PART_2`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const parts = parseTags(data[0].content);
        setApplicationInParts(parts);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchApplication();
  }, [params.id, token]);

  const handleNextPage = () => setPastHref("/application");

  return (
    <>
      {applicationInParts && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-8 justify-center items-center text-2xl">
              <div>Mascote</div>
              <div className="flex flex-col gap-5">
                {applicationInParts &&
                  applicationInParts.map((part: string, index: number) => (
                    <ChatBubbleComponent key={index} content={part} />
                  ))}
              </div>
            </div>
          </div>
          <div className="text-end absolute bottom-24 right-24">
            <Link href={`/lesson/${params.id}/code`} onClick={handleNextPage}>
              <Button variant="secondary">Continuar</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default ApplicationPage;
