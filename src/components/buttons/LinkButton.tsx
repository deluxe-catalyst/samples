"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const underlineVariants: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

export function LinkButton({ href, children, className = "" }: LinkButtonProps) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 },
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="inline-block"
    >
      <Link href={href} className={`text-xl relative ${className}`}>
        {children}
        <motion.span
          className="absolute left-0 bottom-0 h-0.5 w-full origin-left bg-black"
          variants={underlineVariants}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </Link>
    </motion.div>
  );
}