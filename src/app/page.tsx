"use client";

import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/buttons/LinkButton";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20,
      mass: 0.8,
    },
  },
};

export default function Home() {
  const pathname = usePathname();
  const projectMap = [
    { href: "/text", label: "Текст" },
    { href: "/form", label: "Форма" },
    { href: "/buttons", label: "Кнопки" },
    { href: "/scheme", label: "Схема" },
    { href: "/showcase", label: "Витрина" },
    { href: "/blackpage", label: "Черная страница" },
    { href: "/beautiful-button", label: "Красивая кнопка" },
    { href: "/beautiful-switch", label: "Красивый свитч" },
  ];

  return (
    <div className="flex flex-col w-screen flex-1 items-center justify-center font-sans">
      <main className="size-full flex flex-col items-center width-limiter">
        <h1 className="text-center max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black py-7">
          Тестовые задания 1.0.1
        </h1>
        <motion.div
          key={pathname}
          className="flex flex-col items-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projectMap.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <LinkButton href={item.href}>{item.label}</LinkButton>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}