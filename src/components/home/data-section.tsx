import { 
    Smile,
    Star,
    TrendingUp,
    Store
} from "lucide-react";
import type { ElementProps } from "../../props/element";
import { DataCard } from "../data-card";
import { Div } from "../autorender/autorender";
import designData from "../data/designs.json";

export default function DataSection (props?: ElementProps) {
    const cardIconProps = {
        color: "var(--color-zinc-100)",
        className: "size-full z-1",
        strokeWidth: 1.6,
    };
    const totalHappyClient = designData.filter(data => data.rating >= 3).length;
    const totalMarket = Math.round((designData.reduce((sum, item) => sum + item.impact, 0) / designData.length) * 100);
    const totalImpact = Math.round((designData.reduce((sum, item) => sum + item.rating * 2, 0) / designData.length) * 10);
    const totalRating = (designData.reduce((sum, item) => sum + item.rating, 0) / designData.length).toFixed(1);

    return (
        <section 
            className="relative flex flex-col items-center justify-center w-screen h-fit gap-10 pt-12 pb-13 px-8 backdrop-blur-lg bg-zinc-900 border-b-2 border-t-2 border-zinc-800/50" 
            {...props}
        >
            <Div className="z-10 flex flex-col items-center justify-center gap-8">
                <h1 className="text-center text-zinc-100 text-4xl leading-none roboto-medium">Mengapa WebinKuy Terpercaya?</h1>
                <p className="text-center text-zinc-100 text-lg roboto-regular max-w-[1024px]">
                    Kepercayaan tumbuh dari hasil nyata. WebinKuy dipercaya karena telah 
                    menghadirkan solusi yang terbukti membantu Anda mencapai kepuasan, 
                    meningkatkan penjualan, serta mendukung perkembangan usaha lokal. 
                </p>
            </Div>
            <Div className="z-10 w-full h-fit flex flex-wrap items-center justify-center gap-6">
                <DataCard 
                    icon={<Smile {...cardIconProps} />}
                    value={`${totalHappyClient}+`}
                    title="Klien merasa puas"
                />
                <DataCard 
                    icon={<TrendingUp {...cardIconProps} />}
                    value={`${totalMarket}%`}
                    title="Penjualan Meningkat"
                />
                <DataCard 
                    icon={<Store {...cardIconProps} />}
                    value={`${totalImpact}%`}
                    title="Usaha lokal terbantu"
                />
                <DataCard 
                    icon={<Star {...cardIconProps} />}
                    value={`${totalRating}/5.0`}
                    title="Penilaian pengguna"
                />
            </Div>
        </section>
    )
}