"use client";

import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

function EnterLayout({ children }: Props) {
  const router = useRouter();

  const token = useSession().data?.user.jwt;
  if (token) {
    router.push("/learn");
  }

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
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
