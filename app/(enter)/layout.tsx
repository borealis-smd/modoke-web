"use client";

import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TestProvider } from "./TestContext";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

function EnterLayout({ children }: Props) {
  const router = useRouter();

  const token = useSession().data?.user.jwt;
  if (token) {
    router.push("/learn");
  }

  const [activeHref, setActiveHref] = React.useState("");
  const currentPath = usePathname();
  useEffect(() => {
    let path = currentPath.substring(currentPath.lastIndexOf("/"));
    setActiveHref(path);
  }, [currentPath]);

  return (
    <>
      <TestProvider>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <Link
              className={cn(
                "absolute top-16 cursor-pointer",
                activeHref === "/test" ||
                  (activeHref === "/feedback" && "left-16"),
                activeHref !== "/test" &&
                  activeHref !== "/feedback" &&
                  "right-16"
              )}
              href="/"
            >
              <CloseIcon sx={{ width: 32, height: 32 }} aria-label="Fechar" />
            </Link>
            <div className="max-w-[536px] w-full text-lg">{children}</div>
          </div>
        </div>
      </TestProvider>
    </>
  );
}

export default EnterLayout;
