import Link from "next/link";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import ArrowBack from "@mui/icons-material/ArrowBack";

type Props = {
   title_unit: string;
   content: string;
};

const units: Props[] = [
   {
      title_unit: "Código",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur urna id turpis varius, eget gravida turpis consectetur."
   }
];

const RevisionUnit = () => {
   return (
      <div className="flex flex-row-reverse gap-12 px-6">
         <FeedWrapper>
            <Link href="/revision" passHref>
               <Button variant="secondary" className="flex" aria-label="Voltar para a lista de revisões">
                  <ArrowBack className="mr-2" />
                  Voltar
               </Button>
            </Link>

            {units.map((unit) => (
               <article key={unit.title_unit} className="mt-8 bg-white p-4 lg:p-8 border-2 border-slate-300/50 rounded-lg">
                  <h1 className="text-xl lg:text-2xl font-semibold mb-4 text-primary">
                     Unidades: {unit.title_unit}
                  </h1>
                  <p className="text-sm lg:text-base">{unit.content}</p>
               </article>
            ))}
         </FeedWrapper>
      </div>
   );
};

export default RevisionUnit;
