import { FeatCard } from "../feat-card";
import { 
    Home, 
    UserRound, 
    Computer
} from "lucide-react";
import type { ElementProps } from "../../props/element";
import { SparkBackground } from "../spark-bg";
import { Div } from "../autorender/autorender";

export default function CardSection(props?: ElementProps) {
    const cardIconProps = {
        className: "size-full",
        color: "var(--color-amber-500)",
        strokeWidth: 1,
    };

    return (
        <section 
            className="relative w-screen px-8 md:px-12 pb-24 pt-20 flex flex-col items-center justify-center gap-14 overflow-hidden"
            {...props}
        >
            <Div className="flex items-center justify-center">
                <div className="z-10 flex flex-col items-center justify-center gap-8">
                    <h1 className="text-center text-zinc-100 text-4xl leading-none roboto-medium">
                        Solusi Unggulan WebinKuy
                    </h1>
                    <p className="text-center text-zinc-100 text-lg roboto-regular max-w-[1024px]">
                        WebinKuy berkomitmen untuk membantu para pelaku usaha 
                        bertransformasi ke dunia digital agar dapat
                        menjangkau pasar yang lebih luas dengan cara yang efektif,
                        modern, dan terpercaya.
                    </p>
                </div>
            </Div>
            <Div className="w-full h-fit flex items-center justify-center">
                <div className="z-10 w-full h-fit flex flex-wrap items-center justify-center gap-6">
                    <FeatCard
                        icon={<Home {...cardIconProps} />}
                        title="UMKM Lokal"
                        description="Meningkatkan daya saing UMKM melalui website profesional yang terjangkau."
                    />
                    <FeatCard
                        icon={<Computer {...cardIconProps} />}
                        title="Freelancer"
                        description="Membangun portofolio digital yang menarik untuk mendukung personal branding."
                    />
                    <FeatCard
                        icon={<UserRound {...cardIconProps} />}
                        title="Individu"
                        description="Memberikan identitas digital yang modern untuk kebutuhan personal maupun komunitas."
                    />
                </div>
            </Div>
            <SparkBackground 
                className="absolute top-0 left-0 w-full h-full opacity-[0.75]"
                total={25}
                color="var(--color-amber-500)"
                size={3}
                sparkClass="shadow-[0_0_5px_5px_white] shadow-amber-500/20"
            />
        </section>
    );
}
