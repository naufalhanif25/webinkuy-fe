import type { CSSProperties } from "react";

interface SparkBGProps {
    className?: string;
    sparkClass?: string;
    style?: CSSProperties;
    ref?: React.RefObject<HTMLDivElement>;
    color?: string;
    total?: number;
    size?: number;
    onClick?: () => void;
}

export function SparkBackground ({
    className,
    sparkClass,
    style,
    ref,
    color,
    total,
    size
} : SparkBGProps) {
    color = color || "#ffffff";
    total = total || 100;
    size = size || 3;

    return (
        <div 
            className={className} 
            style={style} 
            ref={ref}
        >
            {Array.from({ length: total }).map((_, index) => {
                return (
                    <span 
                        key={index}
                        className={`absolute rounded-full spark-animation ${sparkClass}`}
                        style={{ 
                            backgroundColor: color,
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 7}s`,
                            animationDuration: `${1 + Math.random() * 3}s`,
                        }}
                    ></span>
                )
            })}
        </div>
    )
}