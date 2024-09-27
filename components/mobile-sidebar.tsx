"use client";

import { Menu, X } from 'lucide-react';
import {
   Sheet,
   SheetContent,
   SheetTrigger
} from '@/components/ui/sheet';
import { Sidebar } from '@/components/sidebar';
import { useEffect, useRef, useState } from 'react';

export const MobileSidebar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const sidebarRef = useRef<HTMLDivElement>(null);

   const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
         setIsOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
      };
   }, []);

   return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
         <SheetTrigger onClick={() => setIsOpen(true)}>
            <Menu className="text-white" />
         </SheetTrigger>
         <SheetContent className="bg-white p-0 z-[100]" side="left" ref={sidebarRef}>
            <div className="flex justify-end items-center p-4">
               <button onClick={() => setIsOpen(false)}>
                  <X className="text-black" />
               </button>
            </div>
            <Sidebar />
         </SheetContent>
      </Sheet>
   );
}
