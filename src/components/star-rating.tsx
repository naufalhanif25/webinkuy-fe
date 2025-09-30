import { Star } from "lucide-react";

interface RatingProps {
    value: number;
    max?: number;
    size?: number;
    className?: string;
}

export function Rating({ 
    value, 
    max = 5,
    size = 4,
    className,
} : RatingProps) {
    return (
        <div className={`flex items-center justify-center gap-1 ${className}`}>
            {Array.from({ length: max }, (_, index) => {
                const starValue = index + 1;
                const clipPercentage = value >= starValue ? 0 : (starValue - value) * 100;

                return (
                    <div 
                        key={index} 
                        className={`relative flex items-center justify-center size-${size}`}
                    >
                        <Star
                            className="absolute size-full inset-0 text-zinc-700"
                            fill="currentColor"
                        />
                        <Star
                            className="absolute size-full inset-0 text-amber-500"
                            fill="currentColor"
                            style={{
                                clipPath: `inset(0 ${clipPercentage}% 0 0)`,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}
