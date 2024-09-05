"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
   label: string;
   href: string;
   icon: JSX.Element;
}

export const SidebarItem = ({ label, href, icon }: Props) => {
   const pathname = usePathname();
   const active = pathname === href;

   return (
      <Button
         variant={active ? "sidebarOutline" : "sidebar"}
         className="justify-start h-[52px]"
      >
         <Link href={href} className="flex items-center space-x-2 w-full">
            {icon}
            {label}
         </Link>
      </Button>
   )
}