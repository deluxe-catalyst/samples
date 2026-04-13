"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", checked, disabled, ...props }, ref) => {
    const id = useId();

    return (
      <label
        htmlFor={id}
        className={`inline-flex items-center gap-2 cursor-pointer select-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        <div className="relative size-4">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <div
            className={`absolute inset-0 rounded-md transition-colors duration-200 border ${
              checked
                ? "bg-primary-100 border-primary-150"
                : "bg-white border-secondary-200 hover:border-gray-600"
            } ${disabled ? "border-gray-300 bg-gray-100" : ""}`}
          />
          <svg
            className={`absolute inset-0 m-auto w-3 h-3 text-primary-200 transition-all duration-200 ease-out ${
              checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 8 6 13 13 3" />
          </svg>
        </div>
        {label && <span className="text-gray-700">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";