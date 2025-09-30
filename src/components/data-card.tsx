export function DataCard ({
    icon,
    value,
    title,
} : {
    icon: React.ReactElement;
    value: string;
    title: string;
}) {
    return (
        <span className="w-full sm:w-fit max-w-full sm:max-w-[320px] flex items-center justify-center bg-zinc-800 p-4 rounded-full border-2 border-zinc-700/50">
            <span className="relative overflow-hidden flex items-center justify-center size-14 bg-amber-700 rounded-full p-3 border-2 border-amber-600/50">
                {icon}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-600/75 to-transparent"></span>
            </span>
            <span className="flex flex-col items-center justify-center gap-2 px-4">
                <h1 className="roboto-medium text-2xl leading-none text-zinc-100 text-center whitespace-nowrap">{value}</h1>
                <h2 className="roboto-regular text-md leading-none text-zinc-100/80 text-wrap text-center">{title}</h2>
            </span>
        </span>
    )
}