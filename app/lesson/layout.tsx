"use client";

import React, { useCallback, useEffect } from "react";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { usePathname, useRouter } from "next/navigation";
import { BreadcrumbProvider, useBreadcrumb } from "./BreadcrumbContext";

interface Props {
  children: React.ReactNode;
}

function LessonPageContent({ children }: Props) {
  const router = useRouter();
  const [activeHref, setActiveHref] = React.useState("");

  const currentPath = usePathname();

  useEffect(() => {
    let path = currentPath.substring(currentPath.lastIndexOf("/"));
    setActiveHref(path);
  }, [currentPath]);

  const handleExit = (path: string = "/learn") => {
    if (path === "/learn") {
      router.push(path);
    } else {
      const basePath = currentPath.substring(0, currentPath.lastIndexOf("/"));
      const newPath = `${basePath}/${path}`;
      router.push(newPath);
    }
  };

  const { setIsAlertOpen, setBreadcrumbChangeTo } = useBreadcrumb();

  const handleBreadcrumbPageChange = useCallback(
    (data: { activeLinkHref: string; changeTo: string }) => {
      if (data.activeLinkHref === "/questions") {
        setIsAlertOpen(true);
        setBreadcrumbChangeTo(data.changeTo);
      } else {
        handleExit(data.changeTo);
      }
    },
    [setBreadcrumbChangeTo, setIsAlertOpen]
  );

  return (
    <div className="mx-24 py-14">
      <BreadcrumbComponent
        activeHref={activeHref}
        onData={handleBreadcrumbPageChange}
      />
      {children}
    </div>
  );
}

function LessonPage({ children }: Props) {
  return (
    <BreadcrumbProvider>
      <LessonPageContent>{children}</LessonPageContent>
    </BreadcrumbProvider>
  );
}

export default LessonPage;
