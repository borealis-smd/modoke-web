import * as React from "react";
import { cn } from "@/lib/utils";

const inputStyles = "block w-full px-4 py-2 rounded-xl text-sm font-medium text-slate-500 bg-transparent border border-slate-300 focus:border-teal-500 focus:ring focus:ring-teal-500/25 focus:outline-none";
const containerStyles = "relative flex items-center";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  name?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void; // Função para lidar com o clique do ícone
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, type = "text", icon, onIconClick, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(type === "password");

    const handleIconClick = () => {
      setIsPasswordVisible(!isPasswordVisible);
      if (onIconClick) {
        onIconClick();
      }
    };

    return (
      <div className={containerStyles}>
        <input
          className={cn(inputStyles, className, {
            "pr-10": icon, // Adiciona padding extra à direita se houver ícone
          })}
          ref={ref}
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          {...props}
          aria-label={props["aria-label"]}
        />
        {icon && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleIconClick}
            aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
          >
            {icon}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
