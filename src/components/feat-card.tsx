import type { CSSProperties } from "react";

interface FeatCardProps {
    icon: React.ReactElement;
    title: string;
    description: string;
    style?: CSSProperties;
}

export function FeatCard({ icon, title, description, style }: FeatCardProps) {
    return (
        <div 
            className="px-6 py-6 w-full sm:w-[400px] flex flex-col items-center justify-center gap-6 bg-zinc-800/50 backdrop-blur-lg rounded-2xl border-2 border-amber-600/75 shadow-[0_0_15px_5px_white] shadow-amber-500/25"
            style={style}
        >
            <span className="size-14 flex items-center justify-center">
                {icon}
            </span>
            <span className="flex flex-col items-center justify-center gap-4">
                <h2 className="roboto-medium text-xl leading-none text-zinc-100 text-left whitespace-nowrap text-center">
                    {title}
                </h2>
                <p className="roboto-regular text-md text-zinc-100 text-wrap text-center">
                    {description}
                </p>
            </span>
        </div>
    );
}