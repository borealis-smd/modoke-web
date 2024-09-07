import { Banner } from "@/components/banner";
import { FeedWrapper } from "@/components/feed-wrapper";
import { SelectSession } from "./select";
import { Input } from "@/components/ui/input";
import Search from "@mui/icons-material/Search";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type UnitRevision = {
   unit_id: number;
   title: string;
   session: string;
   //icon: React.ReactNode;
};

const unit: UnitRevision[] = [
   { unit_id: 1, title: "Conteúdo", session: "A" },
   { unit_id: 2, title: "Código Global", session: "AA" },
   { unit_id: 3, title: "Teclado", session: "AAA" },
   { unit_id: 4, title: "Conteúdo", session: "A" },
   { unit_id: 5, title: "Código Global", session: "AA" },
   { unit_id: 6, title: "Teclado", session: "AAA" },
];


const RevisionUnit = () => {
   return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
         <FeedWrapper>
            <Banner title="Vamos revisar?" variant="revision" />

            <div className="flex flex-col lg:flex-row justify-between mt-8 space-y-2 lg:space-y-0">
               <div className="w-full mr-5">
                  <Input
                     placeholder="Pesquisar por unidade"
                     icon={<Search className="h-5 w-full text-slate-500" />}
                     isIconButton={false}

                     className="w-full"
                  />
               </div>
               <SelectSession />
            </div>

            <div className="mt-4">
               <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unit.map((unit, index) => (
                     <div key={index} className="mb-4">
                        <Link href={`/revision/unit/${unit.unit_id}`} passHref>
                           <Button
                              variant="default"
                              className="h-[21.25rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-gray-100 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                              aria-label={`Acessar a revisão ${unit.title}, do nível nível ${unit.session}`}
                           >
                              <div className="absolute top-6 flex flex-col items-start justify-start space-y-2">
                                 <span className="text-[#272727] text-sm font-medium z-10">Sessão:</span>
                                 <span className="text-[#272727] text-2xl font-semibold z-10">{unit.session}</span>
                                 <span className="text-[#272727] text-sm font-medium z-10">Unidade:</span>
                                 <span className="text-[#272727] text-2xl lg:text-3xl font-semibold z-10">{unit.title}</span>
                              </div>
                              <span className="absolute -bottom-9 lg:-bottom-8 right-0 text-green-500/45 lg:text-green-500 text-[12rem] lg:text-[11rem] font-bold leading-none opacity-20 transition-opacity duration-300 group-hover:opacity-100 tracking-tight">
                                 {unit.session}
                              </span>
                           </Button>
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </FeedWrapper>
      </div>
   )
}

export default RevisionUnit;