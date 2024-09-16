import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

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
          <div className="max-w-[536px] w-full text-lg">{children}</div>
        </div>
      </div>
    </>
  );
}

export default EnterLayout;
