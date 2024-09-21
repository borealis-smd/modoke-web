import { Banner } from "@/components/banner";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Session = {
   id: number;
   title: string;
   levels_WCAG: string;
};

const sessions: Session[] = [
   { id: 1, title: "Iniciante", levels_WCAG: "A" },
   { id: 2, title: "Intermediário", levels_WCAG: "AA" },
   { id: 3, title: "Avançado", levels_WCAG: "AAA" },
];

const SessionsPage = () => {
   return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
         <FeedWrapper>
            <div className="pt-5">
               <Banner title="Sessões" variant="session" />

               <div className="mt-6">
                  {sessions.map((session) => (
                     <div key={session.id} className="mb-4">
                        <Link href={`/sessions/${session.id}/unit`} passHref>
                           <Button
                              variant="default"
                              className="h-[8.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                              aria-label={`Acessar a sessão ${session.title}, nível WCAG ${session.levels_WCAG}`}
                              title={`Acessar a sessão ${session.title}, nível WCAG ${session.levels_WCAG}`}
                           >
                              <span className="text-[#272727] text-2xl font-medium z-10">{session.title}</span>
                              <span
                                 aria-hidden="true"
                                 className="absolute -bottom-9 lg:-bottom-8 right-0 lg:text-[11rem] font-bold leading-none opacity-20 tracking-tight text-secondary/45 lg:text-secondary400 transition-opacity duration-300 group-hover:opacity-100"
                              >
                                 {session.levels_WCAG}
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

export default SessionsPage;
