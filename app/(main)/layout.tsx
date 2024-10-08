"use client";

import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { MainProvider } from "./MainContext";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MainProvider>
        <MobileHeader />
        <Sidebar className="hidden lg:flex" />
        <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
          <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
        </main>
      </MainProvider>
    </>
  );
};

export default MainLayout;
