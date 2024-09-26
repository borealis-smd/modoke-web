import Image from "next/image"

import Logo from "@/public/assets/modoke.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const headerLinks = [
   { label: "Home", href: "/#home" },
   { label: "Acessibilidade", href: "/#acessibility" },
   { label: "Projeto", href: "/#modoke" },
];

export const Header = () => {
   return (
      <header className="h-20 w-full  py-[1rem] px-2 lg:px-[5.9375rem] flex justify-between items-center">
         <Image src={Logo} height={46} width={133} alt="Logo modoke" />

         <ul className="flex space-x-4 items-center">
            {headerLinks.map((item, index) => (
               <li key={index} className="text-[#454546] font-medium hover:text-secondary-foreground leading-2 hidden lg:block">
                  <a href={item.href}>{item.label}</a>
               </li>
            ))}
            <li>
               <Link href="/signin">
                  <Button
                     type="button"
                     variant="primary"
                     className="text-white font-medium w-[7.8125rem]"
                  >
                     Entrar
                  </Button>
               </Link>
            </li>
         </ul>
      </header>
   )
}