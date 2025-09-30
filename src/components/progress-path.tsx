interface ProgressPathProps {
    color?: string;
    baseColor?: string;
    progress?: number;
    animationDuration?: number;
    props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

export function ProgressPath ({
    color = "var(--color-amber-600)",
    baseColor = "var(--color-zinc-800)",
    progress = 0,
    animationDuration = 500,
    ...props
} : ProgressPathProps) {
    return (
        <span 
            className="grow h-1 flex items-start justify-center relative"
            style={{ backgroundColor: baseColor }}
            {...props}
        >
            <span 
                className={`max-w-full min-w-0 h-full absolute top-0 left-0 transition-all duration-${animationDuration} ease-out`}
                style={{ 
                    backgroundColor: color,
                    width: `${progress}%` 
                }}
            ></span>
        </span>
    )
}