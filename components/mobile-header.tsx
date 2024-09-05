// MobileHeader.tsx
import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-green-900 border-b top-0 w-full  fixed"> {/* Aumente o z-index */}
      <MobileSidebar />
    </nav>
  );
};
