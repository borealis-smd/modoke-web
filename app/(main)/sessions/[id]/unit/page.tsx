import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import SearchIcon from "@mui/icons-material/Search";
import CodeIcon from "@mui/icons-material/Code";
import Keyboard from "@mui/icons-material/Keyboard";
import React from "react";

type UnitProps = {
   unit_id: number;
   session: string;
   unit_title: string;
   user_progress: number;
   icon: React.ReactNode; // Adiciona o ícone ao tipo
}

const units: UnitProps[] = [
   { unit_id: 1, session: "A", unit_title: "Conteúdo", user_progress: 100, icon: <SearchIcon /> },
   { unit_id: 2, session: "A", unit_title: "Conteúdo Global", user_progress: 50, icon: <CodeIcon /> },
   { unit_id: 3, session: "A", unit_title: "Teclado", user_progress: 5, icon: <Keyboard /> },
];

const UnitPage = () => {
   return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
         <FeedWrapper>
            <Link href="/sessions" passHref>
               <Button variant="secondary" className="flex" aria-label="Voltar para a página de sessões">
                  <ArrowBack className="mr-2" />
                  Voltar
               </Button>
            </Link>

            <div className="mt-8">
               <h1 className="text-3xl font-semibold mb-4">Unidades</h1>
               {units.map((unit) => (
                  <div key={unit.unit_id} className="mb-4">
                     <Link href={`/learn`} passHref>
                        <Button
                           variant="default"
                           className="h-[9.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                           aria-label={`Acessar a seção ${unit.session}, unidade ${unit.unit_title}`}
                           title={`Acessar a seção ${unit.session}, unidade ${unit.unit_title}`}
                        >
                           <div className="flex flex-col space-y-2 items-start">
                              <h3 className="text-slate-500 font-medium">Seção {unit.session}, Unidade {unit.unit_id}</h3>
                              <span className="text-xl lg:text-2xl font-semibold">{unit.unit_title}</span>

                              <div className="flex flex-col items-end">
                                 <span className="text-slate-500 text-[12px] font-medium">Progresso: {unit.user_progress}% </span>
                                 <Progress value={unit.user_progress} className="w-80 bg-white border-2" />
                              </div>
                           </div>

                           <span className="absolute -bottom-9 lg:-bottom-24 right-0 hidden lg:block lg:text-[11rem] font-bold leading-none opacity-20 transition-opacity duration-300 group-hover:opacity-100 tracking-tight">
                              {React.cloneElement(unit.icon as React.ReactElement, {
                                 className: "text-secondary/45 lg:text-secondary400 transition-opacity duration-300",
                                 style: { fontSize: "17rem" },
                              })}
                           </span>

                        </Button>
                     </Link>
                  </div>
               ))}
            </div>
         </FeedWrapper>
      </div>
   );
}

export default UnitPage;
