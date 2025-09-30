import { 
    Instagram,
    Phone,
    MapPin,
    Mail
} from "lucide-react";
import type { ElementProps } from "../props/element";
import { Div } from "./autorender/autorender";

interface Contacts {
    icon: React.ReactElement;
    title: string;
}

export default function Footer (props?: ElementProps) {
    const iconProps = {
        className: "size-4 z-2 group-hover:-rotate-z-[15deg] transition-transform duration-200 ease-out pointer-events-none",
        strokeWidth: 1.6, 
        color: "var(--color-zinc-100)"
    }
    const contectList: Contacts[] = [
        {
            icon: <Instagram {...iconProps} />,
            title: "@webinkuy"
        },
        {
            icon: <Phone {...iconProps} />,
            title: "+62 821 8191 6822"
        },
        {
            icon: <Mail {...iconProps} />,
            title: "admin@webinkuy.com"
        },
        {
            icon: <MapPin {...iconProps} />,
            title: "Banda Aceh"
        }
    ]

    return (
        <footer 
            className="relative w-screen px-12 py-8 gap-8 backdrop-blur-lg bg-zinc-900 border-t-2 border-zinc-800/50 flex flex-col md:flex-row items-start md:items-center justify-between"
            {...props}    
        >
            <Div className="z-10 flex flex-col w-full md:w-fit items-start justify-center gap-6">
                <span className="flex flex-col items-start justify-center gap-3">
                    <span className="tracking-wide text-left text-zinc-100 text-xl leading-none cursor-pointer select-none flex items-center justify-start">
                        <h1 className="roboto-regular">Webin</h1>
                        <h1 className="roboto-semibold">Kuy</h1>
                    </span>
                    <span className="w-full h-[1px] bg-amber-600/75 shadow-[0_0_5px_3px_white] shadow-amber-500/15 rounded-full"></span>
                    <p className="roboto-regular text-zinc-100 text-md max-w-[500px]">
                        WebinKuy adalah layanan pembuatan website berkualitas, cepat, dan terjangkau 
                        yang menargetkan UMKM lokal, freelancer, dan individu untuk bertransformasi 
                        menjadi usaha digital.
                    </p>
                </span>
                <p className="roboto-regular whitespace-nowrap text-zinc-300 leading-none text-md">&copy; 2025. All rights reserved</p>
            </Div>
            <Div className="z-10 flex flex-col w-full md:w-fit items-start justify-center gap-2">
                {contectList.map((contact, index) => {
                    return (
                        <span 
                            key={index} 
                            className="group flex items-center justify-center gap-3 cursor-pointer"
                        >
                            <span className="relative overflow-hidden flex items-center justify-center rounded-full p-2 bg-amber-700 border-2 border-amber-600/50 transition-colors duration-200 ease-out">
                                {contact.icon}
                                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-600 to-transparent opacity-[0.25] group-hover:opacity-[0.75] transition-all duration-100 ease-out"></span>
                            </span>
                            <p className="text-zinc-200 whitespace-nowrap roboto-regular text-md">{contact.title}</p>
                        </span>
                    )
                })}
            </Div>
        </footer>
    )
}