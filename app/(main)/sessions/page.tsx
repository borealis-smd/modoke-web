import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Sessons = {
   id: number;
   title: string;
   levels_WCAG: string;
};

const sessons: Sessons[] = [
   { id: 1, title: "Iniciante", levels_WCAG: "A" },
   { id: 2, title: "Intermediário", levels_WCAG: "AA" },
   { id: 3, title: "Avançado", levels_WCAG: "AAA" },
];

const SessonsPage = () => {
   return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
         <FeedWrapper>
            <div className="pt-5">
               <div
                  className="bg-green-700 w-full h-[8rem] lg:h-[10.5rem] flex items-center text-white px-6 py-5 rounded-lg"
                  role="banner"
                  aria-labelledby="session-header"
               >
                  <h1 id="session-header" className="text-2xl lg:text-4xl font-semibold">
                     Sessões
                  </h1>
               </div>

               <div className="mt-6">
                  {sessons.map((sesson, index) => (
                     <div key={index} className="mb-4">
                        <Link href={`/sessions/${sesson.id}/unit`} passHref>
                           <Button
                              variant="default"
                              className="h-[8.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-gray-100 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                              aria-label={`Acessar a sessão ${sesson.title}, nível WCAG ${sesson.levels_WCAG}`}
                           >
                              <span className="text-[#272727] text-2xl font-medium z-10">{sesson.title}</span>
                              <span className="absolute right-0 text-green-500/45 lg:text-green-500 text-[11rem] lg:text-[13.9375rem] font-bold leading-none opacity-20 transition-opacity duration-300 group-hover:opacity-100 tracking-tight">
                                 {sesson.levels_WCAG}
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
};

export default SessonsPage;
