'use client';

import { ArrowLeft } from "lucide-react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();
    return (
        <Button className="gap-2" onClick={() => router.back()}>
            <ArrowLeft />
            Назад
        </Button>
    )
}