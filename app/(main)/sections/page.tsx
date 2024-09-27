"use client";

import { Banner } from "@/components/banner";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import useAuth from "@/lib/hooks/useAuth";
import { Section, SectionProgess } from "@/types/validators";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SectionsPage = () => {
  const token = useAuth();
  const userName = useSession().data?.user?.name;

  const [userSection, setUserSection] = useState<SectionProgess>();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchSections = async () => {
      const { data: sections } = await api.get("/section/");
      setSections(sections);

      const { data: userSection } = await api.get("/section/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserSection(userSection);
    };

    fetchSections();
  }, [token]);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <FeedWrapper>
        <div className="pt-5">
          <Banner title="Seções" variant="revision" name={userName} />

          <div className="mt-6">
            {sections &&
              userSection &&
              sections.map((section) => (
                <div key={section.section_id} className="mb-4">
                  {section.section_id > userSection.Section.section_id ? (
                    <div>
                      <Button
                        variant="default"
                        className="h-[8.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                        aria-label={`Acessar a sessão ${section.section_title}, nível WCAG ${section.section_title}`}
                        title={`Acessar a sessão ${section.section_title}, nível WCAG ${section.section_title}`}
                        disabled
                      >
                        <span className="text-[#272727] text-2xl font-medium z-10">
                          {section.section_description}
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-9 lg:-bottom-8 right-0 lg:text-[11rem] font-bold leading-none opacity-20 tracking-tight text-secondary/45 lg:text-secondary400 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          {section.section_title}
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <Link
                      href={`/sections/${section.section_id}/unit`}
                      passHref
                    >
                      <Button
                        variant="default"
                        className="h-[8.6875rem] w-full flex justify-between items-center relative overflow-hidden group hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                        aria-label={`Acessar a sessão ${section.section_title}, nível WCAG ${section.section_title}`}
                        title={`Acessar a sessão ${section.section_title}, nível WCAG ${section.section_title}`}
                      >
                        <span className="text-[#272727] text-2xl font-medium z-10">
                          {section.section_description}
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-9 lg:-bottom-8 right-0 lg:text-[11rem] font-bold leading-none opacity-20 tracking-tight text-secondary/45 lg:text-secondary400 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          {section.section_title}
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default SectionsPage;
