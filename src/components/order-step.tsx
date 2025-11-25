import { Check } from "lucide-react";

interface OrderStepProps {
    iconActive: React.ReactElement;
    iconNotActive: React.ReactElement;
    title: string;
    active?: boolean;
    done?: boolean;
    className?: string;
    childrenClassName?: string;
    textClassName?: string;
    props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

export function OrderStepCard ({
    iconActive,
    iconNotActive,
    title,
    active = false,
    done = false,
    className,
    childrenClassName,
    textClassName,
    ...props
} : OrderStepProps) {
    const iconProps = {
        className: "size-6 z-1",
        color: "var(--color-zinc-100)",
        strokeWidth: 1.6
    }

    return (
        <span 
            className={`flex items-center justify-center gap-4 transition-all duration-200 ease-out ${className}`}
            {...props}
        >
            <span className={`relative overflow-hidden size-14 flex items-center justify-center rounded-full p-3 overflow-hidden shrink-0 ${active ? "bg-amber-700 border-2 border-amber-600/50" : "bg-zinc-800 border-2 border-zinc-700"} transition-all duration-200 ease-out ${childrenClassName}`}>
                {done ? (
                    <Check {...iconProps} />
                ) : (
                    active ? iconActive : iconNotActive
                )}
                {(!done && active) && <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-600 to-transparent opacity-[0.5]"></span>}
            </span>
            <h2 className={`roboto-regular text-lg text-center leading-none text-zinc-100 ${textClassName}`}>{title}</h2>
        </span>
    )
}