import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { Button } from "@/components/ui/button";
import React from "react";
import { useBreadcrumb } from "../../BreadcrumbContext";

interface Props {
  setHasStarted: (value: boolean) => void;
}

function StartQuizComponent({ setHasStarted }: Props) {
  const { lessonLabel } = useBreadcrumb();
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex gap-8 justify-center items-center text-lg">
          <div>Mascote</div>
          <div className="flex flex-col gap-5">
            <ChatBubbleComponent content="Vamos praticar?" variant="title" />
            <ChatBubbleComponent
              content={`<p>Agora que você viu sobre <strong>${lessonLabel}</strong>, que tal testar seus conhecimentos com algumas questões?</p>`}
            />
            <ChatBubbleComponent content="Clique em 'Iniciar' para responder as perguntas." />
          </div>
        </div>
      </div>
      <div className="text-end absolute bottom-24 right-24">
        <Button variant="secondary" onClick={() => setHasStarted(true)}>
          Iniciar
        </Button>
      </div>
    </>
  );
}

export default StartQuizComponent;
