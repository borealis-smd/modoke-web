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
         <SelectTrigger className="w-full lg:w-[180px] bg-green-700 text-white hover:bg-green-700/80 focus:ring-0" >
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
