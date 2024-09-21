import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

export const SelectSession = () => {
   return (
      <Select>
         <SelectTrigger className="w-full lg:w-[280px] h-[2.8125rem] font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-0" >
            <SelectValue placeholder="Sessão"/>
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="iniciante">Iniciante (A)</SelectItem>
            <SelectItem value="intermediario">Intermediário (AA)</SelectItem>
            <SelectItem value="avancado">Avançado (AAA)</SelectItem>
         </SelectContent>
      </Select>
   );
};
