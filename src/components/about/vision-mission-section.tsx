import { VisionMissionCard } from "./vission-mision-card";
import { Div } from "../autorender/autorender";
import type { CSSProperties } from "react"

interface VMSectionProps {
    className?: string;
    style?: CSSProperties;
    props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}

export function VisionMissionSection ({
    className,
    style,
    ...props
} : VMSectionProps) {
    return (
        <section 
            className={`w-screen h-fit flex overflow-hidden items-center justify-center ${className}`}
            style={style}
            {...props}
        >
            <Div className="w-screen h-fit flex items-center justify-center py-18 px-8 lg:px-16">
                <div className="w-full max-w-[1024px] h-fit flex flex-col md:flex-row items-stretch justify-center gap-4">
                    <VisionMissionCard 
                        title="Visi WebinKuy"
                        paragraph="Menjadi mitra terpercaya dalam mendukung transformasi digital UMKM lokal, freelancer, dan individu dengan menyediakan website yang modern, profesional, serta mudah diakses oleh semua kalangan."
                        className="bg-zinc-800/50 border-2 border-zinc-700/50 px-6 py-7 rounded-xl"
                    />
                    <VisionMissionCard 
                        title="Misi WebinKuy"
                        paragraph="Menghadirkan layanan pembuatan website yang cepat, terjangkau, dan berkualitas, membantu pengguna memperkuat identitas digital, memberikan solusi kreatif sesuai kebutuhan, serta mendorong pertumbuhan usaha melalui teknologi yang relevan dan ramah pengguna."
                        className="bg-zinc-800/50 border-2 border-zinc-700/50 px-6 py-7 rounded-xl"
                    />
                </div>
            </Div>
        </section>
    )
}