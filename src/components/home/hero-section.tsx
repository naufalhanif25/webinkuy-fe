import { useRef, forwardRef, type RefObject } from "react";
import { ArrowRight } from "lucide-react";
import type { ElementProps } from "../../props/element";
import { Div } from "../autorender/autorender";
import PixelBackground from "../pixel-background";

const HeroSection = forwardRef<HTMLDivElement, ElementProps>((props, ref) =>  {
    const heroSectionRef = useRef<HTMLElement>(null);

    const scrollToExplore = () => {
        const cardElement = (ref as RefObject<HTMLDivElement>).current;
        const cardElementOffsetBottom = cardElement.offsetTop;

        if (cardElement) {
            window.scrollTo({
                top: cardElementOffsetBottom,
                behavior: "smooth"
            })
        }
    };

    return (
        <section
            className="relative w-screen min-h-180 max-h-fit flex items-center justify-center px-16 lg:px-32 pt-34 pb-24"
            ref={heroSectionRef}
            {...props}
        >
            <Div className="w-full h-full flex items-center justify-center pointer-events-none">
                <div className="z-10 flex flex-col items-center justify-center gap-10">
                    <span className="flex flex-col items-center justify-center gap-6 w-full">
                        <span className="flex flex-col items-center justify-center gap-4">
                            <p className="roboto-regular text-left text-xl leading-none text-zinc-100 text-center max-w-[640px]">
                                Selamat datang di WebinKuy
                            </p>
                            <h1 className="roboto-semibold text-5xl leading-14 text-zinc-100 text-center max-w-[800px]">
                                Digitalisasikan aja usahamu, biar makin hits!
                            </h1>
                        </span>
                        <p className="roboto-regular text-lg text-zinc-100 max-w-[800px] text-center">
                            WebinKuy hadir untuk membantu UMKM, usaha kecil,
                            hingga personal brand tampil profesional di dunia
                            digital. Mulai perjalanan online-mu dengan website
                            modern, cepat, dan harga terjangkau.
                        </p>
                    </span>
                    <span className="flex items-center justify-center gap-4">
                        <button 
                            className="relative overflow-hidden group active:translate-y-1 pointer-events-auto transition-transform duration-200 ease-out shadow-[0_0_10px_5px_white] shadow-amber-500/20 hover:shadow-[0_0_20px_5px_white] hover:shadow-amber-500/25 rounded-full px-8 py-2 bg-amber-700 backdrop-blur-lg border-2 border-amber-600/75 hover:border-amber-600/50 transition-all duration-100 ease-out cursor-pointer flex items-center justify-center gap-2"
                            onClick={scrollToExplore}
                        >
                            <p className="z-1 roboto-regular text-center text-zinc-100 text-md pointer-events-none">Jelajahi sekarang</p>
                            <ArrowRight
                                color="var(--color-amber-100)"
                                strokeWidth={2}
                                className="size-5 z-1 group-hover:translate-x-1 pointer-events-none transition-transform duration-200 ease-out"
                            />
                            <span className="z-0 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-600/25 to-transparent group-hover:from-amber-600/75 transition-all duration-200 ease-out"></span>
                        </button>
                    </span>
                </div>
            </Div>
            <PixelBackground ref={heroSectionRef} />
        </section>
    );
})

export default HeroSection;
