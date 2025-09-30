import { useRef } from "react";
import PixelBackground from "./pixel-background";
import type { CSSProperties } from "react";
import { Div } from "./autorender/autorender";

interface TitleSectionProps {
    title: string;
    description: string;
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
    props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export default function TitleSection ({
    title,
    description,
    className,
    children,
    style,
    ...props
} : TitleSectionProps) {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section
            className={`relative overflow-hidden w-screen min-h-125 max-h-fit flex items-center justify-center px-16 lg:px-32 pt-36 pb-26 ${className}`}
            style={style}
            ref={containerRef}
            {...props}
        >
            <Div className="w-full h-full flex items-center justify-center pointer-events-none">
                <div className="z-10 flex flex-col items-center justify-center gap-6">
                    <h1 className="roboto-semibold text-5xl leading-14 text-zinc-100 text-center max-w-[800px]">
                        {title}
                    </h1>
                    <p className="roboto-regular text-lg text-zinc-100 max-w-[800px] text-center">
                        {description}
                    </p>
                    {children}
                </div>
            </Div>
            <PixelBackground ref={containerRef} />
        </section>
    )
}