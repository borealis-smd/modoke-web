import Link from "next/link";
import Image from "next/image";

import Logo from "./../assets/modoke2.svg";

import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { Home, BookOpen, User, ShoppingBag, Settings } from "lucide-react"; // Importar todos os ícones

const sidebarItems = [
   { label: "Início", href: "/learn", icon: <Home className="mr-5" width={24} height={24} /> },
   { label: "Revisão", href: "/revision", icon: <BookOpen className="mr-5" width={24} height={24} /> },
   { label: "Perfil", href: "/profile", icon: <User className="mr-5" width={24} height={24} /> },
   { label: "Petshop", href: "/petshop", icon: <ShoppingBag className="mr-5" width={24} height={24} /> },
   { label: "Configurações", href: "/settings", icon: <Settings className="mr-5" width={24} height={24} /> },
];
type Props = {
   className?: string;
}

export const Sidebar = ({ className }: Props) => {
   return (
      <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
         <Link href="/">
            <div className="pt-12 pl-4 pb-7 flex items-center gap-x-3">
               <Image src={Logo} height={150} width={150} alt="Logo modoke"/>

               {/*<h1 className="text-3xl font-extrabold text-green-800 tracking-wide">
                  modoke
               </h1>*/}
            </div>
         </Link>

         <div className="flex flex-col gap-y-2 flex-1">
            {sidebarItems.map((item) => (
               <SidebarItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
               />
            ))}
         </div>
      </div>
   )
}