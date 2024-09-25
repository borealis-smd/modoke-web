import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  selectedValue: string;
  onChange: (value: string) => void;
}

export const SelectSession = ({ selectedValue, onChange }: Props) => {
  return (
    <Select value={selectedValue} onValueChange={onChange}>
      <SelectTrigger className="w-full lg:w-[280px] h-[2.8125rem] font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-0">
        <SelectValue placeholder="Seção" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Iniciante (A)</SelectItem>
        <SelectItem value="2">Intermediário (AA)</SelectItem>
        <SelectItem value="3">Avançado (AAA)</SelectItem>
      </SelectContent>
    </Select>
  );
};
