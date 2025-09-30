interface PriceProps {
    title: string;
    price: number;
    discount?: number;
    description?: string;
    features: string[];
    tag?: string;
    icon?: React.ReactElement;
    className?: string;
    callback: () => void;
}

export default function PriceCard ({
    title,
    price,
    discount,
    description,
    features,
    tag,
    icon,
    className,
    callback
} : PriceProps) {
    const priceFormated = new Intl.NumberFormat("id-ID").format(price);
    const discountFormated = discount ? new Intl.NumberFormat("id-ID").format(discount) : null;

    return (
        <div className={`flex flex-col items-start justify-center py-6 px-8 w-full sm:w-100 max-w-full gap-6 rounded-2xl bg-zinc-800 border-2 border-2 border-zinc-700/50 ${className}`}>
            <div className="flex flex-col w-full items-start justify-center gap-5">
                <span className="flex h-8 items-center justify-between gap-4 w-full">
                    <h1 className="roboto-medium text-xl text-zinc-100 text-left leading-none">{title}</h1>
                    {tag && (
                        <span className="relative overflow-hidden h-full px-5 rounded-full bg-amber-700 flex items-center justify-center gap-2">
                            <h3 className="z-1 roboto-regular text-md text-zinc-100 text-left leading-none">{tag}</h3>
                            {icon}
                            <span className="w-full h-full absolute left-0 top-0 bg-gradient-to-b from-amber-600/75 to-amber-600/25 blink-animation"></span>
                        </span>
                    )}
                </span>
                <span className="flex flex-col items-start justify-center gap-2">
                    {discountFormated && <h2 className="roboto-regular text-2xl text-zinc-200 text-left leading-none">Rp {discountFormated}</h2>}
                    <h2 className={`roboto-regular text-left leading-none ${discountFormated ? "line-through text-lg text-zinc-200/50" : "text-2xl text-zinc-200"}`}>Rp {priceFormated}</h2>
                </span>
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-4">
                <p className="roboto-regular text-md text-wrap text-zinc-200">{description}</p>
                {features.length > 0 && (
                    <span className="w-full flex flex-col items-start justify-center gap-2 text-zinc-200">
                        <h4 className="roboto-medium text-md leading-none">Keunggulan</h4>
                        <ul className="roboto-regular text-md text-wrap">
                            {features.map((feature, index) => {
                                return (
                                    <li key={index}>- {feature}</li>
                                )
                            })}
                        </ul>
                    </span>
                )}
            </div>
            <div className="w-full flex items-center justify-center">
                <button 
                    className="group relative overflow-hidden py-2 px-6 h-fit gap-2 bg-amber-700 border-2 border-amber-600/50 transition-colors duration-200 ease-out cursor-pointer shrink-0 rounded-full flex items-center justify-center"
                    onClick={callback}
                >
                    <h3 className="z-1 roboto-regular text-md text-zinc-100 leading-none pointer-events-none">Pesan sekarang</h3>
                    <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-amber-600 to-transparent opacity-[0.25] group-hover:opacity-[0.75] transition-all duration-100 ease-out"></span>
                </button>
            </div>
        </div>
    )
}