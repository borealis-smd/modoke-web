"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const inputStyles =
  "block w-full px-4 py-2 rounded-md text-md font-medium text-slate-500 bg-transparent border border-slate-300 focus:border-teal-500 focus:ring focus:ring-teal-500/25 focus:outline-none";
const containerStyles = "relative";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  name?: string;
  icon?: React.ReactNode; // Ícone opcional
  onIconClick?: () => void; // Função para lidar com o clique do ícone (se houver)
  isIconButton?: boolean; // Define se o ícone deve ser um botão ou apenas visual
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, placeholder, type = "text", icon, onIconClick, ...props },
    ref
  ) => {
    return (
      <div className={containerStyles}>
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
            <div className="h-[60%] w-[3px] bg-gray-300 ml-2"></div>
          </div>
        )}
        <input
          className={cn(
            inputStyles,
            className,
            {
              "pl-14": icon, // Adiciona padding extra à direita se houver ícone
            },
            "border-[3px]"
          )}
          ref={ref}
          type={type}
          placeholder={placeholder}
          {...props}
          aria-label={props["aria-label"]}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
