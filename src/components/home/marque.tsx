import { useEffect, useRef, forwardRef } from "react";
import type { ElementProps } from "../../props/element";
import { Div } from "../autorender/autorender";

interface MarqueElementProps {
    icon: React.ReactElement;
    title: string;
}

type MarqueProps = {
    elements: MarqueElementProps[];
    direction?: "left" | "right";
} & ElementProps

const Marque = forwardRef<HTMLDivElement, MarqueProps>(({elements, direction = "left", ...props}, ref) => {
    const marqueContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = marqueContainerRef.current;

        if (!container) return;

        let animationFrame: number;
        let scrollAmount = (direction === "left" ? 0 : container.scrollWidth / 2);
        const speed = 1;

        const step = () => {
            if (!container) return;

            scrollAmount += (direction === "left" ? speed : -speed);
            container.scrollLeft = scrollAmount;

            if (direction === "left" && scrollAmount >= container.scrollWidth / 2) { 
                scrollAmount = 0;
                container.scrollLeft = 0;
            }
            else if (direction === "right" && scrollAmount <= 0) { 
                scrollAmount = container.scrollWidth / 2;
                container.scrollLeft = container.scrollWidth / 2;
            }

            animationFrame = requestAnimationFrame(step);
        };

        animationFrame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrame);
    }, [direction]);

    return (
        <section
            className="w-screen overflow-hidden"
            ref={ref}
        >
            <div
                ref={marqueContainerRef}
                className="z-20 relative flex items-center gap-6 py-5 px-8 w-screen bg-zinc-900 overflow-hidden border-b-2 border-t-2 border-zinc-800/50"
                {...props}
            >
                <Div className="flex w-max gap-16">
                    {elements.concat(elements).map((element, index) => (
                        <div
                            key={index}
                            className="flex shrink-0 items-center justify-center gap-4"
                        >
                            <span className="flex items-center justify-center p-3 bg-zinc-800 rounded-full border-2 border-zinc-700/50">
                                {element.icon}
                            </span>
                            <span className="flex flex-col items-start justify-center text-zinc-100 text-left gap-1">
                                <h1 className="roboto-regular text-lg leading-none whitespace-nowrap">
                                    {element.title}
                                </h1>
                            </span>
                        </div>
                    ))}
                </Div>
            </div>
        </section>
    );
})

export default Marque
