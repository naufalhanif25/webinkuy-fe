import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface HelpAccordionProps {
    title: string;
    paragraph: string[];
}

export default function HelpAccordion({ title, paragraph }: HelpAccordionProps) {
    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

    const setAccordionState = () => {
        if (accordionOpen) setAccordionOpen(false);
        else setAccordionOpen(true);
    };

    return (
        <div className="z-1 flex flex-col items-center justify-center bg-zinc-800/50 backdrop-blur-lg px-8 w-240 rounded-xl border-2 border-zinc-800">
            <span 
                className="flex items-center justify-between w-full h-fit py-5 cursor-pointer"
                onClick={setAccordionState}
            >
                <h1 className="roboto-medium text-lg text-zinc-100 leading-none">
                    {title}
                </h1>
                <ChevronDown
                    color="var(--color-zinc-100)"
                    strokeWidth={1.6}
                    className={`size-7 ${accordionOpen && "-rotate-z-180"} transition-transform duration-500 ease-out`}
                />
            </span>
            <span className={`${accordionOpen ? "h-[2px] w-full opacity-[1]" : "h-0 w-0 opacity-[0]"} rounded-full bg-zinc-400/50 transition-[width_opacity] duration-250 ease-out`}></span>
            <span
                className={`flex flex-col items-start justify-center ${accordionOpen ? "py-5 gap-2" : "py-0 gap-0"} overflow-y-auto w-full transition-all duration-500 ease-out`}
                style={{ maxHeight: accordionOpen ? "320px" : "0px" }}
            >
                {accordionOpen && paragraph.map((text, index) => (
                    <p
                        key={index}
                        className="roboto-regular text-md text-zinc-300"
                    >
                        {text}
                    </p>
                ))}
            </span>
        </div>
    );
}
