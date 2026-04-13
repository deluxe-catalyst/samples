import { TextareaHTMLAttributes } from "react";

export function FieldText(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="px-3 py-1 w-full focus:outline-none bg-surface-100"
      style={{boxShadow: "inset 0px 1px 2px 1px rgba(0, 0, 0, 0.15)"}}
      {...props}
    />
  );
}