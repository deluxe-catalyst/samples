'use client';

import { usePathname } from "next/navigation";
import { BackButton } from "./buttons/BackButton";

export function BaseLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            {pathname !== "/" &&
                <div className="fixed p-4 transition-none z-100" >
                    <BackButton />
                </div>
            }
            {children}
        </>
    )
}
