import Header from "../components/header"
import TitleSection from "../components/title-section"
import AllDesignSection from "../components/design/all-design-section"
import Footer from "../components/footer"

export default function Design () {
    return (
        <div className="w-screen h-fit flex flex-col items-stretch min-h-screen overflow-hidden scroll-smooth bg-zinc-900/25">
            <Header />
            <TitleSection 
                title="Desain Unggulan"
                description="WebinKuy menghadirkan desain website yang modern, interaktif, dan mudah digunakan, dengan sentuhan kreatifitas serta kualitas yang disesuaikan dengan kebutuhan Anda."
            />
            <AllDesignSection />
            <Footer />
        </div>
    )
}