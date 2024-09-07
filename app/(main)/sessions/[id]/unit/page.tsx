import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";

import { Progress } from "@/components/ui/progress"


type UnitProps = {
   unit_id: number;
   unit_title: string;
   user_progress: number;
   // imagem do lado
}

const unit: UnitProps[] = [
   { unit_id: 1, unit_title: "Conteúdo", user_progress: 100 },
   { unit_id: 2, unit_title: "Conteúdo Global", user_progress: 50 },
   { unit_id: 3, unit_title: "Teclado", user_progress: 5 },
];

const UnitPage = () => {
   return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
         <FeedWrapper>
            <Link href="/sessions">
               <Button variant={"primary"} className="flex">
                  <ArrowBack className="mr-2" />
                  Voltar
               </Button>
            </Link>

            <div className="mt-8">
               <h1 className="text-3xl font-semibold mb-4">Unidades</h1>
               {unit.map((unit, index) => (
                  <div key={index} className="mb-4">
                     <Link href={`/learn`}> {/* ajeitar o link */}
                        <Button
                           variant="default"
                           className="h-[8.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-gray-100 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                           aria-label={`Acessar a sessão 1`}
                        >
                           <div className="flex flex-col space-y-2 items-start">
                              <h3 className="text-slate-500 font-medium">Unidade:</h3>
                              <span className="text-xl lg:text-2xl font-semibold">{unit.unit_title}</span>

                              <div className="flex flex-col items-end">
                                 <span className="text-slate-500 text-[12px] font-medium">Progresso: {unit.user_progress}% </span>
                                 <Progress value={unit.user_progress} className="w-80 group-hover:bg-white group-hover:border-2" />
                              </div>
                           </div>

                           {/* imagem ou icone aqui */}
                        </Button>
                     </Link>
                  </div>
               ))}
            </div>
         </FeedWrapper>
      </div>
   )
}

export default UnitPage;