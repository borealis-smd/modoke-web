import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@mui/icons-material/Google";

interface Props {
  children: React.ReactNode;
}

function EnterLayout({ children }: Props) {
  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-1/2 bg-slate-300"></div>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <Link className="absolute top-16 right-16 cursor-pointer" href="/">
            <CloseIcon sx={{ width: 32, height: 32 }} aria-label="Fechar" />
          </Link>
          <div className="max-w-[536px] w-full text-lg">
            {children}
            <div className="flex flex-col justify-center gap-10">
              <div className="flex items-center justify-center gap-3">
                <div className="h-[2px] max-w-[176px] w-full bg-gray-400"></div>
                <p className="text-slate-500">Ou continue com</p>
                <div className="h-[2px] max-w-[176px] w-full bg-gray-400"></div>
              </div>
              <div className="w-full text-center">
                <Button className="w-20 h-20 rounded-full p-5">
                  <GoogleIcon sx={{ width: 46, height: 46 }} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnterLayout;
