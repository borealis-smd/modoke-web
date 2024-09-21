import { Banner } from "@/components/banner";
import { FeedWrapper } from "@/components/feed-wrapper";
import { SelectSession } from "./select";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CodeIcon from "@mui/icons-material/Code";
import Keyboard from "@mui/icons-material/Keyboard";
import React from "react";

type UnitRevision = {
   unit_id: number;
   title: string;
   session: string;
   icon: React.ReactNode;
};

const units: UnitRevision[] = [
   { unit_id: 1, title: "Conteúdo", session: "A", icon: <SearchIcon /> },
   { unit_id: 2, title: "Código Global", session: "AA", icon: <CodeIcon /> },
   { unit_id: 3, title: "Teclado", session: "AAA", icon: <Keyboard /> },
   { unit_id: 4, title: "Conteúdo", session: "A", icon: <SearchIcon /> },
   { unit_id: 5, title: "Código Global", session: "AA", icon: <CodeIcon /> },
   { unit_id: 6, title: "Teclado", session: "AAA", icon: <Keyboard /> },
];

const RevisionUnit = () => {
   return (
      <div className="flex flex-row-reverse gap-12 px-6">
         <FeedWrapper>
            <Banner title="Vamos revisar?" variant="revision" />

            <div className="flex flex-col lg:flex-row justify-between mt-8 space-y-2 lg:space-y-0">
               <div className="w-full mr-5">
                  <Input
                     placeholder="Pesquisar por unidade"
                     icon={<SearchIcon className="h-5 w-full text-slate-500" />}
                     isIconButton={false}
                     className="w-full"
                     aria-label="Pesquisar por unidade"
                  />
               </div>
               <SelectSession />
            </div>

            <div className="mt-4">
               <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {units.map((unit) => (
                     <div key={unit.unit_id} className="mb-4">
                        <Link href={`/revision/unit/${unit.unit_id}`} passHref>
                           <Button
                              variant="default"
                              className="h-[21.25rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                              aria-label={`Acessar a revisão ${unit.title}, do nível ${unit.session}`}
                           >
                              <div className="absolute top-6 flex flex-col items-start justify-start space-y-2">
                                 <span className="text-secondary-foreground text-sm font-medium">Sessão:</span>
                                 <span className="text-secondary-foreground text-2xl font-semibold">{unit.session}</span>
                                 <span className="text-secondary-foreground text-sm font-medium">Unidade:</span>
                                 <span className="text-secondary-foreground text-2xl lg:text-3xl font-semibold">{unit.title}</span>
                              </div>
                              <span className="absolute -bottom-9 lg:-bottom-8 right-0 lg:text-[11rem] font-bold leading-none opacity-20 transition-opacity duration-300 group-hover:opacity-100 tracking-tight">
                                 {React.cloneElement(unit.icon as React.ReactElement, {
                                    className: "text-secondary/45 lg:text-secondary400 transition-opacity duration-300",
                                    style: { fontSize: "12rem" },
                                 })}
                              </span>
                           </Button>
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </FeedWrapper>
      </div>
   );
}

export default RevisionUnit;
