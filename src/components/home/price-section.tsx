import type { ElementProps } from "../../props/element";
import { Div } from "../autorender/autorender";
import PriceCard from "../price-card";
import { useNavigate } from "react-router-dom";
import { getPriceList } from "../price-list";

export default function PriceSection(props?: ElementProps) {
    const navigate = useNavigate();
    const priceList = getPriceList({navigate});

    return (
        <section
            className="relative flex flex-col items-center justify-center w-screen h-fit gap-10 pt-14 pb-17 px-8 backdrop-blur-lg bg-zinc-900 border-b-2 border-t-2 border-zinc-800/50"
            {...props}
        >
            <Div className="z-10 flex flex-col items-center justify-center gap-8">
                <h1 className="text-center text-zinc-100 text-4xl leading-none roboto-medium">
                    Harga Jasa WebinKuy
                </h1>
                <p className="text-center text-zinc-100 text-lg roboto-regular max-w-[1024px]">
                    WebinKuy menawarkan harga jasa yang transparan, terjangkau,
                    dan sesuai dengan kebutuhan Anda. Setiap paket dirancang
                    untuk memberi nilai terbaik dan mendukung perkembangan
                    bisnis.
                </p>
            </Div>
            <Div
                className="z-10 w-full h-fit flex flex-wrap items-center justify-center gap-6"
                style={{ width: "100%" }}
            >
                {priceList.map((priceData, index) => {
                    return (
                        <PriceCard 
                            key={index}
                            {...priceData} 
                        />
                    )
                })}
            </Div>
        </section>
    );
}
