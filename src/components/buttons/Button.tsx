import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center shadow-md text-zinc-50 bg-black rounded-full font-semibold py-2 px-4 cursor-pointer transition-transform hover:scale-95", 
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}