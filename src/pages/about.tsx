import Header from "../components/header"
import TitleSection from "../components/title-section"
import { DescSection } from "../components/about/desc-section"
import { VisionMissionSection } from "../components/about/vision-mission-section"
import Footer from "../components/footer"

export default function About () {
    return (
        <div className="w-screen h-fit overflow-hidden scroll-smooth bg-zinc-900/25">
            <Header />
            <TitleSection 
                title="Tentang WebinKuy"
                description="Kenali WebinKuy lebih dekat melalui deskripsi singkat, visi, dan misi kami dalam menghadirkan layanan pembuatan website yang modern dan terpercaya."
            />
            <DescSection />
            <VisionMissionSection />
            <Footer />
        </div>
    )
}