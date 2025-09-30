import type { CSSProperties } from "react";

type BaseProps = {
    placeholder: string;
    icon: React.ReactElement;
    className?: string;
    value?: string | number;
    inputClassName?: string;
    type?: string;
    inputStyle?: CSSProperties;
};

type InputProps = (BaseProps & {inputType?: "input"} & React.InputHTMLAttributes<HTMLInputElement>) | (BaseProps & {inputType: "textarea"} & React.TextareaHTMLAttributes<HTMLTextAreaElement>);

export function Input ({
    placeholder,
    icon,
    className,
    value,
    inputClassName,
    inputType = "input",
    type = "text",
    inputStyle,
    ...props
}: InputProps) {
    return (
        <span
            className={`p-4 gap-3 bg-zinc-800/50 border-2 border-zinc-700/50 rounded-lg flex items-center justify-start ${className}`}
        >
            {icon}
            {inputType === "input" ? (
                <input 
                    type={type} 
                    className={`grow h-fit text-zinc-100 text-md outline-none ${inputClassName}`}
                    value={value}
                    style={inputStyle}
                    placeholder={placeholder}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            )   : (
                <textarea
                    className={`grow h-fit text-zinc-100 text-md outline-none ${inputClassName}`}
                    value={value}
                    style={inputStyle}
                    placeholder={placeholder}
                    {...(props as React.InputHTMLAttributes<HTMLTextAreaElement>)}
                />
            )}
        </span>
    )
}