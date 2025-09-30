import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Filter } from "lucide-react";

type DropdownProps = {
    title: string;
    callback: () => void;
}

interface DropdownComponentProps {
    dropdown: DropdownProps[];
    width?: number | string;
    height?: number | string;
    activeState?: number;
    gap?: number;
    transitionDuration?: number;
    textAlignment?: "center" | "left" | "right" | "justify"
    props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

export default function Dropdown ({
    dropdown,
    width = 240,
    height = "100%",
    activeState = 0,
    gap = 8,
    transitionDuration = 500,
    textAlignment = "left",
    props
} : DropdownComponentProps) {
    const [activeIndex, setActiveIndex] = useState<number>(activeState);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const motherButtonRef = useRef<HTMLSpanElement>(null);
    const childrenContainerRef = useRef<HTMLSpanElement>(null);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const changeDropdownPos = useCallback(() => {
        const motherButtonElement = motherButtonRef.current;
        const childrenContainerElement = childrenContainerRef.current;

        if (motherButtonElement && childrenContainerElement) {
            const motherRect = motherButtonElement.getBoundingClientRect();

            childrenContainerElement.style.top = `${motherRect.top + window.scrollY + motherRect.height + gap}px`;
            childrenContainerElement.style.left = `${motherRect.left + window.scrollX}px`;
            childrenContainerElement.style.width = `${motherRect.width}px`;
        }
    }, [gap]);

    useEffect(() => {
        const updateStates = () => {
            setWindowWidth(window.innerWidth);
            changeDropdownPos();
        }

        updateStates();

        window.addEventListener("resize", updateStates);

        return () => window.removeEventListener("resize", updateStates);
    }, [changeDropdownPos]);

    const changeDropdownState = (newState?: boolean) => {
        changeDropdownPos();

        if (!newState) {
            if (dropdownOpen) setDropdownOpen(false);
            else setDropdownOpen(true);
        }
        else setDropdownOpen(newState);
    }

    return (
        <>
            <span 
                className={`py-2 px-4 rounded-lg bg-zinc-800 max-w-100 border-2 border-zinc-700/50 flex items-center justify-between gap-4 cursor-pointer`} 
                style={{ 
                    width: windowWidth < 1024 ? "100%" : (typeof width === "number" ? `${width}px` : width), 
                    height: typeof height === "number" ? `${height}px` : height 
                }}
                ref={motherButtonRef}
                onClick={() => changeDropdownState()}
                {...props}
            >
                <span className="w-fit h-full flex items-center justify-center gap-3">
                    <Filter 
                        className="size-[17px] shrink-0"
                        color="var(--color-zinc-100)"
                        strokeWidth={1.6}
                    />
                    <h4 className="roboto-regular text-zinc-300 leading-none text-md select-none text-nowrap truncate">{dropdown[activeIndex].title}</h4>
                </span>
                <ChevronDown 
                    className={`size-6 transition-transform duration-${transitionDuration} ease-out ${dropdownOpen && "-rotate-z-180"}`}
                    color="var(--color-zinc-100)"
                    strokeWidth={1.6}
                />
            </span>
            {createPortal(
                <span 
                    className={`absolute flex flex-col overflow-hidden w-full ${dropdownOpen ? "p-1 gap-1" : "p-0 gap-0"} items-end justify-center rounded-lg border-2 ${dropdownOpen ? "border-zinc-700/50 bg-zinc-800" : "border-transparent bg-transparent"} top-0 left-0 z-50 transition-[padding,max-height,border] duration-${transitionDuration} ease-out`}
                    style={{ maxHeight: `${dropdownOpen ? 100 : 0}vh` }}
                    ref={childrenContainerRef}
                >
                    {dropdown.map((dropdownData, index) => {
                        return (
                            <span 
                                className={`py-3 px-4 w-full cursor-pointer rounded-lg roboto-regular text-${textAlignment} text-nowrap truncate text-md text-zinc-100 leading-none ${index === activeIndex ? "bg-amber-600/25 hover:bg-amber-600/50" : "bg-transparent hover:bg-zinc-700/50"} transition-all duration-200 ease-out ${dropdownOpen ? "opacity-[1]" : "opacity-[0]"}`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    changeDropdownState(false);
                                    dropdownData.callback();
                                }}
                            >
                                {dropdownData.title}
                            </span>
                        )
                    })}
                </span>,
                document.body
            )}
        </>
    )
}