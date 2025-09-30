import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react";

interface ButtonProps {
    title: string;
    endpoint: string;
    callback: () => void
}

interface ScreenSizeProps {
    width: number;
    height: number;
}

export default function Header () {
    const navigate = useNavigate();
    const buttons: ButtonProps[] = [
        { title: "Desain", endpoint: "/design", callback: () => navigate("/design") },
        { title: "Pesan", endpoint: "", callback: () => navigate("/order") },
        { title: "Tentang", endpoint: "", callback: () => navigate("/about") }
    ];
    const [screenSize, setScreenSize] = useState<ScreenSizeProps>({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [phoneHeaderState, setPhoneHeaderState] = useState<boolean>(false);

    const openCloseHeaderState = () => {
        if (phoneHeaderState) setPhoneHeaderState(false);
        else setPhoneHeaderState(true);
    }

    useEffect(() => {
        const getScreenSize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight
            });

            if (window.innerWidth > 640) setPhoneHeaderState(false);
        }

        getScreenSize();

        window.addEventListener("resize", getScreenSize);

        return () => window.removeEventListener("resize", getScreenSize);
    }, [])

    return (
        <header className="fixed top-0 left-0 pt-4 w-full gap-4 z-100 flex flex-col items-center justify-center px-4 md:px-8">
            <div className="relative w-full px-8 md:px-12 rounded-full h-16 bg-zinc-900 border-2 border-amber-600/75 shadow-[0_0_15px_5px_white] shadow-amber-500/25 flex items-center justify-between overflow-hidden">
                <span 
                    className="z-10 tracking-wide text-left text-zinc-100 text-xl leading-none cursor-pointer select-none flex items-center justify-start"
                    onClick={() => navigate("/")}
                >
                    <h1 className="roboto-regular">Webin</h1>
                    <h1 className="roboto-semibold">Kuy</h1>
                </span>
                {screenSize.width > 640 ? (
                    <span className="z-10 flex items-center justify-center gap-6">
                    {buttons.map((button, index) => {
                        return (
                            <button 
                                key={index}
                                className="group translate-y-[2px] roboto-regular text-md text-zinc-100 leading-none cursor-pointer text-center flex flex-col items-center justify-center gap-[6px]"
                                onClick={button.callback}
                            >
                                {button.title}
                                {button.endpoint === window.location.pathname ? (
                                    <span className="w-full transition-all duration-200 ease-out h-[1px] rounded-full bg-amber-500/80 shadow-[0_0_5px_5px_white] shadow-amber-500/10"></span>
                                ) : (
                                    <span className="w-0 group-hover:w-full transition-all duration-200 ease-out h-[1px] rounded-full bg-amber-500/80 shadow-[0_0_5px_5px_white] shadow-amber-500/0 group-hover:shadow-amber-500/10"></span>
                                )}
                            </button>
                        )
                    })}
                </span>
                ) : (
                    <span className="z-10 flex items-center justify-center">
                        {!phoneHeaderState ? (
                            <Menu 
                                className="size-6 cursor-pointer" 
                                color="var(--color-zinc-100)" 
                                onClick={openCloseHeaderState} 
                                strokeWidth={2}
                            />
                        ) : (
                            <X 
                                className="size-6 cursor-pointer" 
                                color="var(--color-zinc-100)" 
                                onClick={openCloseHeaderState}
                                strokeWidth={2}
                            />
                        )}
                    </span>
                )}
            </div>
            <div 
                className={`w-full rounded-4xl bg-zinc-900 backdrop-blur-lg backdrop-brightness-80 shadow-[0_0_15px_5px_white] shadow-amber-500/25 border-2 border-amber-600/75 flex items-center justify-center transition-all duration-300 ease-out overflow-hidden ${!phoneHeaderState || screenSize.width > 640 ? "opacity-[0]" : "opacity-[1]"}`}
                style={{
                    maxHeight: `${!phoneHeaderState || screenSize.width > 640 ? "0px" : "320px"}`,
                }}
            >
                <div 
                    className="w-full h-fit flex flex-col items-center justify-center transition-all duration-300 ease-out p-2 gap-2"
                    style={{ opacity: `${!phoneHeaderState || screenSize.width > 640 ? "0" : "1"}` }}
                >
                    {buttons.map((button, index) => {
                        return (
                            <button
                                key={index}
                                className={`w-full py-4 ${button.endpoint === window.location.pathname ? "bg-amber-600/25" : "bg-transparent hover:bg-zinc-800"} transition-all duration-200 ease-out leading-none rounded-full roboto-regular text-md text-zinc-100 cursor-pointer text-center`}
                                onClick={() => {
                                    button.callback();
                                    setPhoneHeaderState(false);
                                }}
                            >
                                {button.title}
                            </button>
                        )
                    })}
                </div>
            </div>
        </header>
    )
}