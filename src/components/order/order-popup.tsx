import "../../faro";

export default function OrderPopup ({ onClick }: { onClick: () => void }) {
    return (
        <div className="w-screen h-screen fixed z-999 bg-black/50 top-0 left-0 flex items-center justify-center backdrop-blur-xs">
            <div className="max-w-120 min-w-80 mx-16 h-fit bg-zinc-900 border-2 border-zinc-800/50 rounded-2xl p-12 flex flex-col gap-10">
                <span className="flex flex-col gap-6 w-full h-fit">
                    <h1 className="text-center text-zinc-100 text-2xl leading-none roboto-medium">Pesanan Berhasil Dibuat</h1>
                    <p className="text-center text-zinc-100 text-md roboto-regular">
                        Kami sudah mengirimkan detail pesanan ke email Anda.
                        Silakan periksa kotak masuk email Anda.
                    </p>
                </span>
                <span className="w-full flex items-center justify-center px-4">
                    <button 
                        data-faro-user-action-name="close-popup"
                        className="group relative overflow-hidden py-2 px-4 h-fit w-full gap-2 bg-amber-700 border-2 border-amber-600/50 transition-colors duration-200 ease-out cursor-pointer shrink-0 rounded-full flex items-center justify-center"
                        onClick={onClick}
                    >
                        <h3 className="z-1 roboto-regular text-md text-zinc-100 leading-none pointer-events-none">Tutup</h3>
                        <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-amber-600 to-transparent opacity-[0.25] group-hover:opacity-[0.75] transition-all duration-100 ease-out"></span>
                    </button>
                </span>
            </div>
        </div>
    );
}