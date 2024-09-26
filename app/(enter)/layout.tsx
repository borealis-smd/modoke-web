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
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="absolute top-16 left-16 cursor-pointer"
        onClick={() => handleExit()}
      >
        <CloseIcon sx={{ width: 32, height: 32 }} aria-label="Fechar" />
      </div>
      <div className="max-w-[536px] w-full text-lg">{children}</div>
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
