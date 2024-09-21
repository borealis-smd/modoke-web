"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { EyeIcon, EyeOffIcon, LogOut } from "lucide-react";

const Settings = () => {
   const [isOldPasswordVisible, setIsOldPasswordVisible] = React.useState(false);
   const [isNewPasswordVisible, setIsNewPasswordVisible] = React.useState(false);

   return (
      <div className="flex flex-col gap-8 px-6">
         <FeedWrapper>
            <h1 className="text-4xl font-bold mb-9 mt-7 text-primary">Configurações</h1>
            <div className="flex flex-col">
               <h1 className="text-xl font-semibold mb-6 text-primary/80 border-b-2 pb-3">
                  Recuperação da Senha
               </h1>
               <div className="flex flex-col gap-4 lg:w-3/6">
                  <label htmlFor="oldPassword" className="text-lg font-medium">Senha antiga:</label>
                  <div className="relative">
                     <Input
                        id="oldPassword"
                        type={isOldPasswordVisible ? "text" : "password"}
                        placeholder="Digite sua senha antiga"
                        aria-label="Senha antiga"
                        className="pr-10"
                     />
                     <button
                        type="button"
                        aria-label={isOldPasswordVisible ? "Esconder senha" : "Mostrar senha"}
                        className="absolute inset-y-0 right-0 flex items-center px-3"
                        onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                     >
                        {isOldPasswordVisible ? (
                           <EyeOffIcon className="h-5 w-5 text-slate-500" />
                        ) : (
                           <EyeIcon className="h-5 w-5 text-slate-500" />
                        )}
                     </button>
                  </div>

                  <label htmlFor="newPassword" className="text-lg font-medium">Senha nova:</label>
                  <div className="relative">
                     <Input
                        id="newPassword"
                        type={isNewPasswordVisible ? "text" : "password"}
                        placeholder="Digite sua nova senha"
                        aria-label="Nova senha"
                        className="pr-10"
                     />
                     <button
                        type="button"
                        aria-label={isNewPasswordVisible ? "Esconder senha" : "Mostrar senha"}
                        className="absolute inset-y-0 right-0 flex items-center px-3"
                        onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                     >
                        {isNewPasswordVisible ? (
                           <EyeOffIcon className="h-5 w-5 text-slate-500" />
                        ) : (
                           <EyeIcon className="h-5 w-5 text-slate-500" />
                        )}
                     </button>
                  </div>
                  <Button variant="secondary" className="w-full lg:w-1/3">
                     Salvar
                  </Button>
               </div>


               <h1 className="mt-10 text-xl font-semibold mb-6 text-primary/80 border-b-2 pb-3">
                  Outros
               </h1>

               <Button variant="dangerOutline" className="w-[10rem] justify-start hover:bg-red-50">
                  <LogOut className="mr-2" />
                  Sair
               </Button>
            </div>
         </FeedWrapper>
      </div>
   );
};

export default Settings;
