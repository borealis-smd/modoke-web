import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuiz } from "./QuizContext";
import { useBreadcrumb } from "./BreadcrumbContext";

interface Props {
  activeHref: string;
  onData: (data: any) => void;
}

const BreadcrumbComponent = ({ activeHref, onData }: Props) => {
  const { currentQuestionIndex, numQuestions } = useQuiz();
  const { isFinished } = useBreadcrumb();

  let links = [
    { href: "/definition", label: "Definição", active: false },
    { href: "/application", label: "Aplicação", active: false },
    { href: "/code", label: "Exemplo de código", active: false },
    { href: "/quiz", label: "Teste seus conhecimentos", active: false },
  ];

  links = links.map((link) => ({
    ...link,
    active: link.href === activeHref,
  }));

  const activeIndex = links.findIndex((link) => link.active);

  const sendDataToParent = (changeTo: string) => {
    const activeLinkHref = links.find((link) => link.active)?.href;
    onData({ activeLinkHref, changeTo });
  };

  return (
    <Breadcrumb className="flex items-center">
      <BreadcrumbList>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="text-lg">
              {link.active ? (
                <>
                  <BreadcrumbPage className="underline">
                    {link.label}
                  </BreadcrumbPage>
                  {link.href === "/quiz" && (
                    <span className="text-black ml-2">
                      {isFinished
                        ? `${currentQuestionIndex + 1}/${numQuestions}`
                        : `${currentQuestionIndex}/${numQuestions}`}
                    </span>
                  )}
                </>
              ) : index < activeIndex ? (
                <BreadcrumbLink
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    sendDataToParent(link.href);
                  }}
                >
                  {link.label}
                </BreadcrumbLink>
              ) : (
                <span>{link.label}</span>
              )}
            </BreadcrumbItem>
            {index < links.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
