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
    <div className="top-[60px] px-8 py-4 bg-green-700 rounded-xl flex items-center justify-between w-full text-neutral-100 z-40 lg:sticky lg:top-[40px]">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <h2 className="text-[0.875rem] font-medium lg:text-md">
            {" "}
            {section},{" "}
          </h2>
          <h2 className="text-[0.875rem] font-medium lg:text-md">{unit}</h2>
        </div>
        <h1 className="font-semibold text-xl lg:text-3xl">{theme}</h1>
      </div>
      <Link href={"/sections"}>
        <Button
          size="sm"
          variant={"guide"}
          className="lg:flex lg:h-14 font-semibold"
        >
          <Notebook
            className="h-5 w-5 stroke-2 mr-2 lg:h-7 lg:w-7 "
            aria-hidden="true"
          />
          <span>GUIA</span>
        </Button>
      </Link>
    </div>
  );
};
