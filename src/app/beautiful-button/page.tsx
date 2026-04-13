import { ButtonHTMLAttributes } from "react"
import styles from "./styles.module.css"

function BeatifulButton({
    children,
    ...props
}: {
    children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={styles.btn}
            {...props}
        >
            {children}
        </button>
    );
}

export default function Page() {
    return (
        <div className="bg-button flex justify-center items-center min-h-screen">
            <BeatifulButton>
                Кнопка
            </BeatifulButton>
        </div>
    )
}