import Header from "../components/header"
import TitleSection from "../components/title-section"
import Footer from "../components/footer"

export default function Other () {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col overflow-hidden scroll-smooth bg-zinc-900/25">
            <Header />
            <TitleSection 
                title="Error 404 - Halaman Tidak Ditemukan"
                description="Mohon maaf, saat ini halaman yang Anda tuju tidak ditemukan. Halaman mungkin sudah dipindahkan, dihapus, atau alamat yang dimasukkan tidak sesuai. Silakan kembali ke halaman utama atau gunakan menu navigasi yang tersedia untuk menemukan informasi yang Anda butuhkan."
                style={{ flexGrow: 1 }}
            />
            <Footer />
        </div>
    )
}