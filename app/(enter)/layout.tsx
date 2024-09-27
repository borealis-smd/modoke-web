"use client";

import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TestProvider, useTest } from "./TestContext";

interface Props {
  children: React.ReactNode;
}

function EnterLayoutContent({ children }: Props) {
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

  const { setIsAlertOpen } = useTest();

  const handleExit = () => {
    if (activeHref === "/test" || activeHref === "/feedback") {
      setIsAlertOpen(true);
      return;
    }
    router.push("/");
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col items-center justify-center">
        <div
          className="w-[70rem] absolute top-16 right-16 cursor-pointer text-end"
          onClick={() => handleExit()}
        >
          <CloseIcon sx={{ width: 32, height: 32 }} aria-label="Fechar" />
        </div>
        <div className="min-w-[39.75rem] text-lg -mt-5">{children}</div>
      </div>
    </div>
  );
}

function EnterLayout({ children }: Props) {
  return (
    <TestProvider>
      <EnterLayoutContent>{children}</EnterLayoutContent>
    </TestProvider>
  );
}

export default EnterLayout;
