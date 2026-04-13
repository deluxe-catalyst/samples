import { InputHTMLAttributes } from "react";

export function FieldInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="px-3 py-1 w-full focus:outline-none"
      style={{boxShadow: "inset 0px 1px 2px 1px rgba(0, 0, 0, 0.15)"}}
      {...props}
    />
  );
}