"use client";

import { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { InputHTMLAttributes } from "react";

export function FieldInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="px-3 py-1 w-full focus:outline-none shadow"
      style={{ boxShadow: "inset 0px 1px 2px 1px rgba(0, 0, 0, 0.15)" }}
      {...props}
    />
  );
}

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

export function ColorPicker({ value = "#0000ff" }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(value);

  const handleChange = (colorResult: ColorResult) => {
    const newColor = colorResult.hex;
    setColor(newColor);
  };

  return (
    <div className="relative">
      <div
        className="px-3 py-1 w-fit cursor-pointer flex items-center shadow h-8"
        style={{ boxShadow: "inset 0px 1px 2px 1px rgba(0, 0, 0, 0.15)" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="w-10 h-5 border border-gray-300"
          style={{ backgroundColor: color }}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1">
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <SketchPicker
            color={color}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}