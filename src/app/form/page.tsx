'use client';

import { Checkbox } from "@/components/inputs/Checkbox";
import { ColorPicker } from "@/components/inputs/ColorPicker";
import { FieldInput } from "@/components/inputs/FieldInput"
import { FieldText } from "@/components/inputs/FieldText";
import { Radio } from "@/components/inputs/Radio";
import { useState } from "react";

function Form() {
    const [radio, setRadio] = useState(false);
    const [checkbox, setCheckbox] = useState(false);

    return (
        <div className="w-fit">
            <div className="flex justify-between gap-10 pb-6 items-center ">
                <h1 className="font-semibold text-secondary-100 text-3xl [text-shadow:0px_1px_0_rgba(255,255,255,0.8),1px_1px_2px_rgba(0,0,0,0.15)]">
                    Заполните поля
                </h1>
                <h2 className="font-semibold text-secondary-100 text-xl [text-shadow:0px_1px_0_rgba(255,255,255,0.8),1px_1px_2px_rgba(0,0,0,0.15)]">
                    ну пожалуйста
                </h2>
            </div>

            <div className="relative">
                <div className="absolute -bottom-1.5 left-2 right-2 h-full bg-surface-100 shadow-md z-20" />
                <div
                    style={{ boxShadow: '0px 22px 3px -20px rgba(0,0,0, 0.3), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    className="absolute -bottom-2.5 left-4 right-4 h-full bg-surface-100 z-10"
                />

                <form
                    className="relative bg-surface-100 shadow-md w-170 py-8 border border-[rgba(0,0,0,0.15)] z-30"
                    onSubmit={e => e.preventDefault()}
                >
                    <div className="flex mb-6">
                        <div className="w-4/12" />
                        <h3 className="text-2xl text-secondary-100 font-medium">Основное</h3>
                    </div>

                    {/* Поле: Имя */}
                    <div className="flex items-center mb-4">
                        <div className="w-4/12 flex justify-end pr-6">
                            <label className="text-gray-700 font-medium">
                                Имя
                            </label>
                        </div>
                        <div className="w-6/12">
                            <FieldInput name="name" placeholder="Введите имя" />
                        </div>
                    </div>

                    {/* Выбор цвета */}
                    <div className="flex items-center mb-4">
                        <div className="w-4/12 flex justify-end pr-6">
                            <label className="text-gray-700 font-medium">
                                Цвет вашего настроения
                            </label>
                        </div>
                        <div className="w-6/12">
                            <ColorPicker />
                        </div>
                    </div>

                    {/* Комментарий */}
                    <div
                        style={{ boxShadow: '0px 52px 15px -50px rgba(0, 0, 0, 0.1)' }}
                        className="bg-linear-to-b from-[#fff7c4] to-[#fff6bc] border-t border-t-white border-b border-b-[#e8e1b0]"
                    >
                        <div className="flex pb-2 pt-4">
                            <div className="w-4/12" />
                            <h3 className="text-2xl text-secondary-100 font-medium">Дополнительное</h3>
                        </div>
                        <div className="flex mb-4 py-2">
                            <div className="w-4/12 flex justify-end pr-6">
                                <label htmlFor="comment" className="text-gray-700 font-medium pt-1">
                                    Комментарий
                                </label>
                            </div>
                            <div className="w-6/12">
                                <FieldText
                                    id="comment"
                                    rows={3}
                                    name="comment"
                                    placeholder={`Напишите хоть что-нибудь.
Если хотите, конечно.`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Кнопка отправки */}
                    <div className="flex">
                        <div className="w-4/12" />
                        <div className="flex flex-col mt-8 w-6/12">
                            <div className="flex flex-col gap-2 pb-4">
                                <div className="flex gap-2">
                                    <Radio
                                        onChange={() => setRadio(prev => !prev)}
                                        checked={radio}
                                        name="radio"
                                    />
                                    <label className="text-gray-700 text-sm">
                                        Ну а тут просто лежит радиобатон
                                    </label>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Checkbox
                                        onChange={() => setCheckbox(prev => !prev)}
                                        checked={checkbox}
                                        name="checkbox"
                                    />
                                    <label className="text-gray-700 text-sm pr-10">
                                        Соглашаюсь на всё, что бы вы не придумали и осознаю,
                                        что это может означать <span className="underline text-blue-700">что угодно</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    boxShadow: "inset 0px -1px 2px rgba(0, 0, 0, 0.55), 0px 15px 6px -10px rgba(0, 0, 0, 0.2)",
                                }}
                                className="cursor-pointer w-fit transition-transform text-surface-100 font-semibold text-lg bg-linear-to-b from-gradient-up to-grtadient-down rounded px-5 py-2 hover:scale-98"
                            >
                                Отправить все мои данные
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <div
            style={{ backgroundImage: "url('/assets/paper.webp')" }}
            className="size-full h-screen bg-cover flex flex-col items-center justify-center"
        >
            <Form />
        </div>
    )
}