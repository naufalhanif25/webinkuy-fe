import { Div } from "../autorender/autorender"
import { DesignCard } from "../design-card"
import { SparkBackground } from "../spark-bg"
import designDataProps from "../data/designs.json"
import type { ElementProps } from "../../props/element"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function DesignsSection (props?: ElementProps) {
    const designData = designDataProps.slice(0, 3);
    const navigate = useNavigate();

    return (
        <section 
            className="relative w-screen overflow-hidden px-8 md:px-12 pb-22 pt-20 flex flex-col items-center justify-center gap-14 overflow-hidden"
            {...props}
        >
            <Div className="flex items-center justify-center">
                <div className="z-10 flex flex-col items-center justify-center gap-8">
                    <h1 className="text-center text-zinc-100 text-4xl leading-none roboto-medium">
                        Karya Unggulan WebinKuy
                    </h1>
                    <p className="text-center text-zinc-100 text-lg roboto-regular max-w-[1024px]">
                        WebinKuy berpengalaman dalam menciptakan desain website modern, interaktif, 
                        dan ramah pengguna, dengan kualitas dan kreativitas yang sesuai kebutuhan klien.
                    </p>
                </div>
            </Div>
            <Div className="flex flex-col items-center jutify-center gap-14">
                <div className="z-10 w-full h-fit flex flex-wrap items-center justify-center gap-8">
                    {designData.map((designData, index) => {
                        return (
                            <DesignCard 
                                key={index} 
                                {...designData} 
                            />
                        )
                    })}
                </div>
                <button 
                    className="group relative overflow-hidden z-10 roboto-regular text-md text-center text-amber-500 hover:text-zinc-100 px-6 py-2 rounded-full cursor-pointer bg-zinc-900 hover:bg-amber-700 border-2 border-amber-600 hover:border-amber-600/50 shadow-[0_0_10px_5px_white] hover:shadow-[0_0_15px_5px_white] shadow-amber-500/15 hover:shadow-amber-500/25 flex items-center justfiy-center gap-2 transition-all duration-200 ease-out"
                    onClick={() => navigate("/design")}
                >
                    <p className="z-1 pointer-events-none">Lihat lebih banyak</p>
                    <ArrowRight 
                        className="size-5 z-1 group-hover:translate-x-1 pointer-events-none transition-all duration-200 ease-out"
                        strokeWidth={1.6}
                    />
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-600/75 to-amber-600/0 opacity-[0] group-hover:opacity-[1] transition-all duration-200 ease-out"></span>
                </button>
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