import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { Unit } from "./unit";

const LearnPage = () => {
   return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
         <FeedWrapper>
            <Header unit="Unidade 1" section="Sessão A" theme="Conteúdo" />
            {/* Fazer um map aqui puxando a API */}
            <Unit />
         </FeedWrapper>
      </div>
   )
}

export default LearnPage;