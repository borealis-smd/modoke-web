import Link from "next/link";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import ArrowBack from "@mui/icons-material/ArrowBack";

type Props = {
   title_unit: string;
   content: string;
}

const unit: Props[] = [
   {
      title_unit: "Código",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur urna id turpis varius, eget gravida turpis consectetur."
   }
]


const RevisionUnit = () => {
   return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
         <FeedWrapper>
            <Link href="/revision">
               <Button variant={"primary"} className="flex">
                  <ArrowBack className="mr-2" />
                  Voltar
               </Button>
            </Link>

            {unit.map((unit, index) => (
               <div key={index} className="mt-8 bg-white p-8 border-2 border-slate-300/50 rounded-lg">
                  <h1 className="text-2xl font-medium mb-4">Unidades: {unit.title_unit}</h1>
                  <span>{unit.content}</span>
               </div>
            ))}

         </FeedWrapper>
      </div>
   )
}

export default RevisionUnit;