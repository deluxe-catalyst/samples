"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: ReactNode;
    className?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, className = "", checked, disabled, ...props }, ref) => {
        const id = useId();

        return (
            <label
                htmlFor={id}
                className={`inline-flex items-center gap-2 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""
                    } ${className}`}
            >
                <div className="relative size-4">
                    <input
                        ref={ref}
                        id={id}
                        type="radio"
                        checked={checked}
                        disabled={disabled}
                        className="sr-only"
                        {...props}
                    />
                    <div
                        className={`absolute inset-0 rounded-full border transition-colors duration-200 bg-white ${checked
                                ? "border-primary-200"
                                : "border-secondary-200 hover:border-primary-150"
                            } ${disabled ? "border-gray-300" : ""}`}
                    />
                    <div
                        className={`absolute inset-1 rounded-full bg-primary-200 transition-all duration-200 ease-out ${checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
                            }`}
                    />
                </div>
                {label && <span className="text-gray-700">{label}</span>}
            </label>
        );
    }
);

Radio.displayName = "Radio";