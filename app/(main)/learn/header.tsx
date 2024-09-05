// Header.tsx
import { Button } from "@/components/ui/button";
import { Notebook } from "lucide-react";
import Link from "next/link";

type Props = {
  section: string;
  unit: string;
  theme: string;
};

export const Header = ({ unit, section, theme }: Props) => {
  return (
    <div className="sticky top-0 px-8 py-4 t-[50px] bg-green-700 rounded-xl flex items-center justify-between mb-5 text-neutral-100 z-50">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <h2 className="text-[0.875rem] font-semibold lg:text-md">
            {section},
          </h2>
          <h2 className="text-[0.875rem] font-semibold lg:text-md">{unit}</h2>
        </div>
        <h1 className="font-bold text-xl lg:text-3xl">{theme}</h1>
      </div>
      <Link href={"/sessions"}>
        <Button
          size="sm"
          variant={"secondary"}
          className="bg-transparent border-green-900/15 lg:flex hover:bg-green-600/50 lg:h-14 border-2 border-b-4 active-b-2"
        >
          <Notebook className="h-5 w-5 stroke-2 mr-2 lg:h-7 lg:w-7" aria-hidden="true" />
          <span>GUIA</span>
        </Button>
      </Link>
    </div>
  );
};
