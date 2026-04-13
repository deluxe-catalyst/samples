import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
    `group cursor-pointer inline-flex items-center justify-center h-10 px-4 gap-1
        rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-[#c3c3c3]
        bg-[#ebebeb] hover:not-disabled:bg-[#f4f4f4] active:not-disabled:bg-[#e1e1e1] active:not-disabled:text-[#696969]
        disabled:*:text-[#696969]
    `,
    {
        variants: {
            variant: {
                redBorder: "border-2 not-disabled:border-[#dc241f]",
                red: "bg-[#ca140b]! hover:not-disabled:bg-[#e73128]! active:not-disabled:bg-[#a9130b]! text-white active:not-disabled:text-[#e2aaa9]! border-none",
                green: "bg-[#6d9636]! hover:not-disabled:bg-[#85b445]! active:not-disabled:bg-[#5f822a]! text-white active:not-disabled:text-[#c6d8ad]! border-none",
                greenBorder: "border-2 not-disabled:border-[#6e9735]"
            },
        },

    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const TestButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

TestButton.displayName = "TestButton";

export { TestButton, buttonVariants };