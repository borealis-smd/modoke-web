"use client";

import React, { useCallback, useEffect } from "react";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { usePathname, useRouter } from "next/navigation";
import { BreadcrumbProvider, useBreadcrumb } from "./BreadcrumbContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import api from "@/lib/axios";

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

  const {
    setIsAlertOpen,
    setBreadcrumbChangeTo,
    lessonLabel,
    setLessonLabel,
    isFinished,
  } = useBreadcrumb();

  useEffect(() => {
    const fetchLesson = async () => {
      const lessonId = currentPath.split("/")[2];
      const { data: lesson } = await api.get(
        `/lesson/id?lesson_id=${lessonId}`
      );
      setLessonLabel(lesson.lesson_title);
    };

    fetchLesson();
  }, [setLessonLabel]);

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

  const handleReturnTo = () => {
    const links = [
      { href: "/definition" },
      { href: "/application" },
      { href: "/code" },
      { href: "/questions" },
    ];

    const activeIndex = links.findIndex((link) => link.href === activeHref);
    const previousIndex = activeIndex - 1;

    if (links[activeIndex].href === "/questions") {
      setIsAlertOpen(true);
      setBreadcrumbChangeTo(links[previousIndex].href);
      return;
    }

    if (activeIndex === -1) {
      router.push("/learn");
    }

    if (previousIndex < 0) {
      router.push("/learn");
      return;
    }

    const previousLink = links[previousIndex];
    handleExit(previousLink.href);
  };

  return (
    <div className="mx-24 py-14">
      {lessonLabel && (
        <div className="flex items-center gap-5 mb-4">
          <div className="cursor-pointer" onClick={handleReturnTo}>
            {activeHref === "/questions" && isFinished ? (
              <CloseIcon sx={{ width: 32, height: 32 }} aria-label="Fechar" />
            ) : (
              <ArrowBackIcon
                sx={{ width: 32, height: 32 }}
                aria-label="Voltar"
              />
            )}
          </div>

          <BreadcrumbComponent
            activeHref={activeHref}
            onData={handleBreadcrumbPageChange}
          />
        </div>
      )}
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
