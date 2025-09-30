import Header from "../components/header"
import TitleSection from "../components/title-section"
import OrderSection from "../components/order/order-section"
import Footer from "../components/footer"

export default function Order () {
    return (
        <div className="w-screen h-fit flex flex-col items-stretch min-h-screen overflow-hidden scroll-smooth bg-zinc-900/25">
            <Header />
            <TitleSection 
                title="Pesan Layanan"
                description="WebinKuy menghadirkan solusi digital yang profesional untuk mendukung bisnis dan personal branding Anda. Pesan layanan sesuai kebutuhan Anda secara mudah dan cepat di WebinKuy."
            />
            <OrderSection />
            <Footer />
        </div>
    )
}