import ChatBubbleComponent from "@/app/ChatBubbleComponent";
import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  setHasStarted: (value: boolean) => void;
}

function StartTestComponent({ setHasStarted }: Props) {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex gap-8 justify-center items-center text-lg">
          <div>Mascote</div>
          <div className="flex flex-col gap-5">
            <ChatBubbleComponent content="Olá! Seja bem-vindo(a) ao Modoke!" variant="title"/>
            <ChatBubbleComponent content="Estou muito feliz em ter você aqui! Que tal fazer um pequeno teste para avaliarmos o seu nível de familiaridade com as diretrizes da acessibilidade web?" />
            <ChatBubbleComponent content="É bem rápido, prometo!" />
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

export default StartTestComponent;
