import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  activeHref: string;
  onData: (data: any) => void;
}

const BreadcrumbComponent = ({ activeHref, onData }: Props) => {
  let links = [
    { href: "/definition", label: "Atributo lang", active: false },
    { href: "/application", label: "Aplicação", active: false },
    { href: "/code", label: "Exemplo de código", active: false },
    { href: "/questions", label: "Teste seus conhecimentos", active: false },
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
    <>
      <Breadcrumb className="flex items-center">
        <BreadcrumbList>
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem className="text-lg">
                {link.active ? (
                  <BreadcrumbPage className="font-semibold">
                    {link.label}
                  </BreadcrumbPage>
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
    </>
  );
};

export default BreadcrumbComponent;
