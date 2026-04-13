import { TestButton } from "@/components/inputs/TestButton";
import { ArrowDownToLine, ArrowUpFromLine, ChevronRight, Pencil, Printer, X } from "lucide-react";

export default function Page() {
    return (
        <div className="flex flex-col size-full min-h-screen justify-center items-center gap-6">
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <TestButton>
                        Просмотреть
                    </TestButton>
                    <TestButton disabled>
                        Просмотреть
                    </TestButton>
                </div>
                <div className="flex flex-col gap-2">
                    <TestButton variant="redBorder">
                        Просмотреть
                    </TestButton>
                    <TestButton disabled variant="redBorder">
                        Просмотреть
                    </TestButton>
                </div>
                <div className="flex flex-col gap-2">
                    <TestButton variant="red">
                        Просмотреть
                    </TestButton>
                    <TestButton disabled variant="red">
                        Просмотреть
                    </TestButton>
                </div>
                <div className="flex flex-col gap-2">
                    <TestButton className="pr-1 ps-2! gap-0!">
                        Просмотреть
                        <ChevronRight width={16} className="text-[#dc241f] group-active:text-[#a95e5c]" />
                    </TestButton>
                    <TestButton className="pr-1 ps-2! gap-0!" disabled>
                        Просмотреть
                        <ChevronRight width={16} className="text-[#dc241f] group-active:text-[#a95e5c]" />
             
                    </TestButton>
                </div>
                <div className="flex flex-col gap-2">
                    <TestButton variant="green">
                        Просмотреть
                    </TestButton>
                    <TestButton variant="green" disabled>
                        Просмотреть
                    </TestButton>
                </div>
                <div className="flex flex-col gap-2">
                    <TestButton variant="greenBorder">
                        Просмотреть
                    </TestButton>
                    <TestButton disabled variant="greenBorder">
                        Просмотреть
                    </TestButton>
                </div>
            </div>
            <div className="flex gap-4">
                <TestButton>
                    <Pencil size='16' />
                    Редактировать
                </TestButton>
                <TestButton>
                    <ArrowUpFromLine size='16' />
                    Выгрузить в Excel
                </TestButton>
                <TestButton>
                    <X size='16' />
                    Удалить список
                </TestButton>
                <TestButton>
                    <Printer size='16' />
                    Pacпечатать
                </TestButton>
                <TestButton>
                    <ArrowDownToLine size='16' />
                    Загрузить из файла
                </TestButton>
            </div>
        </div>
    )
}