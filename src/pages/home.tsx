import Header from "../components/header"
import HeroSection from "../components/home/hero-section"
import Marque from "../components/home/marque"
import CardSection from "../components/home/card-section"
import DataSection from "../components/home/data-section"
import DesignsSection from "../components/home/designs-section"
import BackToTop from "../components/back-to-top"
import PriceSection from "../components/home/price-section"
import { HelpSection } from "../components/home/help-section"
import Footer from "../components/footer"
import { 
    CircleDollarSign, 
    Zap, 
    LockKeyhole, 
    Smartphone, 
    Brush, 
    Search, 
    Rocket, 
    Globe 
} from "lucide-react";
import { useRef } from "react"

export default function Home () {
    const iconProps = {
        color: "var(--color-amber-500)",
        className: "size-7",
        strokeWidth: 1.6
    };
    const marqueRerf = useRef<HTMLDivElement>(null);

    return (
        <div className="w-screen h-fit overflow-hidden scroll-smooth bg-zinc-900/25">
            <Header />
            <HeroSection ref={marqueRerf} />
            <Marque 
                ref={marqueRerf}
                elements={[
                    { 
                        icon: <CircleDollarSign {...iconProps} />,
                        title: "Harga Terjangkau"
                    },
                    { 
                        icon: <Zap {...iconProps} />,
                        title: "Performa Cepat"
                    },
                    { 
                        icon: <LockKeyhole {...iconProps} />,
                        title: "Keamanan Terjamin"
                    },
                    { 
                        icon: <Smartphone {...iconProps} />,
                        title: "Mobile Friendly"
                    },
                    { 
                        icon: <Search {...iconProps} />,
                        title: "SEO Tinggi"
                    },
                    { 
                        icon: <Brush {...iconProps} />,
                        title: "Desain Profesional"
                    },
                    { 
                        icon: <Rocket {...iconProps} />,
                        title: "Mudah Go Digital"
                    },
                    { 
                        icon: <Globe {...iconProps} />,
                        title: "Akses Tanpa Batas"
                    }
                ]} 
            />
            <CardSection />
            <DataSection />
            <DesignsSection />
            <PriceSection />
            <HelpSection />
            <Footer />
            <BackToTop />
        </div>
    )
}