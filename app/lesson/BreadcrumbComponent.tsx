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
}

const BreadcrumbComponent = ({ activeHref }: Props) => {
  let links = [
    { href: "/definition", label: "Atributo lang", active: false },
    { href: "/application", label: "Aplicação", active: false },
    { href: "/code", label: "Exemplo de código", active: false },
    { href: "/test", label: "Teste seus conhecimentos", active: false },
  ];

  links = links.map((link) => {
    if (link.href === activeHref) {
      link.active = true;
    }
    return link;
  });

  return (
    <Breadcrumb className="mb-3">
      <BreadcrumbList>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {link.active ? (
                <BreadcrumbPage className="font-semibold">{link.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
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
