import type { CSSProperties } from "react";

interface VMCardProps {
    title: string;
    paragraph: string;
    className?: string;
    style?: CSSProperties;
    props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

export function VisionMissionCard ({
    title,
    paragraph,
    className,
    style,
    ...props
} : VMCardProps) {
    return (
        <span 
            className={`flex flex-col items-center justify-start gap-4 w-full flex-1 ${className}`}
            style={style}
            {...props}
        >
            <h1 className="roboto-medium text-center text-xl leading-none text-zinc-100">{title}</h1>
            <p className="roboto-regular text-center text-md text-zinc-200 whitespace-wrap">{paragraph}</p>
        </span>
    )
}