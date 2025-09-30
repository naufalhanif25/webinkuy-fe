import { Div } from "../autorender/autorender"
import { SparkBackground } from "../spark-bg"
import HelpAccordion from "../help-accordion"
import type { ElementProps } from "../../props/element"
import HelpData from "../data/faq.json"

export function HelpSection (props?: ElementProps) {
    return (
        <section 
            className="relative w-screen overflow-hidden px-8 md:px-12 pb-20 pt-18 flex flex-col items-center justify-center gap-14 overflow-hidden"
            {...props}
        >
            <Div className="flex items-center justify-center">
                <div className="z-10 flex flex-col items-center justify-center gap-8">
                    <h1 className="text-center text-zinc-100 text-4xl leading-none roboto-medium">
                        Tutorial dan Pertanyaan Populer
                    </h1>
                    <p className="text-center text-zinc-100 text-lg roboto-regular max-w-[1024px]">
                        Pelajari cara menggunakan layanan WebinKuy dengan cepat melalui panduan singkat, 
                        serta temukan jawaban dari permasalahan Anda melalui pertanyaan yang sering diajukan.
                    </p>
                </div>
            </Div>
            <Div className="flex flex-col items-center jutify-center gap-4">
                {HelpData.map((data, index) => {
                    return (
                        <HelpAccordion 
                            key={index}
                            {...data} 
                        />
                    )
                })}
            </Div>
            <SparkBackground 
                className="absolute top-0 left-0 w-full h-full opacity-[0.75]"
                total={25}
                color="var(--color-amber-500)"
                size={3}
                sparkClass="shadow-[0_0_5px_5px_white] shadow-amber-500/20"
            />
        </section>
    )
}