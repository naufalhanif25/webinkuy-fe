import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";

type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    animationName?: "move-from-bottom" | "move-from-top" | "move-from-left" | "move-from-right";
    initialPos?: number;
    animatePos?: number;
    timingFunction?: Easing;
    duration?: number;
    delay?: number;
    initialHeight?: number;
    renderMode?: "once" | "always";
};

export function Div({
    children,
    className,
    animationName = "move-from-bottom",
    initialPos = 50,
    animatePos = 0,
    timingFunction = "easeOut",
    duration = 1,
    delay = 0,
    initialHeight = 10,
    renderMode = "once",
    ...props
} : DivProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [renderState, setRenderState] = useState<boolean>(false);
    const [firstRender, setFirstRender] = useState<boolean>(false);
    const framerAnimations = {
        "move-from-bottom": {
            initial: { opacity: 0, y: initialPos },
            animate: { opacity: 1, y: animatePos },
            exit: { opacity: 0, y: initialPos },
            transition: { duration: duration, ease: timingFunction, delay }
        },
        "move-from-top": {
            initial: { opacity: 0, y: -initialPos },
            animate: { opacity: 1, y: animatePos },
            exit: { opacity: 0, y: -initialPos },
            transition: { duration: duration, ease: timingFunction, delay }
        },
        "move-from-left": {
            initial: { opacity: -initialPos, y: 0 },
            animate: { opacity: 1, y: animatePos },
            exit: { opacity: -initialPos, y: 0 },
            transition: { duration: duration, ease: timingFunction, delay }
        },
        "move-from-right": {
            initial: { opacity: initialPos, y: 0 },
            animate: { opacity: 1, y: animatePos },
            exit: { opacity: initialPos, y: 0 },
            transition: { duration: duration, ease: timingFunction, delay }
        }
    }

    useEffect(() => {
        const targetElement = elementRef.current;

        if (!targetElement || (firstRender && renderMode === "once")) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const isIntersecting = entry.isIntersecting;

                    setRenderState(isIntersecting);
                    if (isIntersecting) setFirstRender(true);
                });
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(targetElement);

        return () => observer.disconnect();
    }, [firstRender, renderMode]);

    return (
        <div 
            ref={elementRef} 
            className={`min-h-${initialHeight}`}
            {...props} 
        >
            {renderState && (
                <motion.div 
                    className={className}
                    {...framerAnimations[animationName]}
                >
                    {children}
                </motion.div>
            )}
        </div>
    );
}
