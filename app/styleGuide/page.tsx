"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import React from "react";
import useState from "react";

const ButtonsPage = () => {
   const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

   return (
      <>
         <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
            <h1>Buttons</h1>
            <Button>Default</Button>
            <Button variant={"primary"}>Primary</Button>
            <Button variant={"primaryOutline"}>Primary Outline</Button>
            <Button variant={"secondary"}>Secondary</Button>
            <Button variant={"secondaryOutline"}>Secondary Outline</Button>
            <Button variant={"danger"}>Danger</Button>
            <Button variant={"dangerOutline"}>Danger Outline</Button>
            <Button variant={"super"}>Super</Button>
            <Button variant={"superOutline"}>Super Outline</Button>
            <Button variant={"ghost"}>Ghost</Button>
            <Button variant={"sidebar"}>Sidebar</Button>
            <Button variant={"sidebarOutline"}>Sidebar Outline</Button>
            <Button variant={"locked"}>Locked</Button>
            <Button variant={"lesson"}>Lesson</Button>
            <Button variant={"guide"}>Lesson</Button>
         </div>
         <div className="p-4 space-y-4 flex flex-col max-w-[400px]">
            <h1>Input</h1>
            <Input placeholder="Digite seu texto aqui" />
            <Input
               type="password"
               placeholder="Digite sua senha"
               icon={
                  isPasswordVisible ? (
                     <EyeOffIcon className="h-5 w-5 text-slate-500" />
                  ) : (
                     <EyeIcon className="h-5 w-5 text-slate-500" />
                  )
               }
               onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
         </div>
      </>
   )
}

export default ButtonsPage