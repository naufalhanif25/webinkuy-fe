import { Div } from "../autorender/autorender";

export function DescSection () {
    return (
        <section className="w-screen h-fit flex overflow-hidden items-center justify-center bg-zinc-900 border-b-2 border-t-2 border-zinc-800/50">
            <Div className="w-screen h-fit flex items-center justify-center py-12 px-8 lg:px-16">
                <div className="w-full max-w-[1024px] flex flex-col items-center justify-center gap-4">
                    <h1 className="roboto-medium text-2xl text-zinc-100 text-center leading-none">Deskripsi</h1>
                    <p className="roboto-regular text-lg text-zinc-200 text-center whitespace-wrap">
                        WebinKuy adalah layanan pembuatan website berkualitas, cepat, dan terjangkau yang menargetkan UMKM lokal, freelancer, dan individu untuk bertransformasi menjadi usaha digital. 
                        Dengan dukungan desain modern, fitur interaktif, dan pengalaman pengguna yang ramah, WebinKuy berkomitmen membantu setiap klien menghadirkan identitas online yang profesional serta mendukung perkembangan bisnis mereka di era digital.
                    </p>
                </div>
            </Div>
        </section>
    )
}