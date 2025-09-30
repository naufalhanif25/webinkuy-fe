import { Rating } from "./star-rating";
import { 
    UserRound, 
    Github,
    Link,
    Star
} from "lucide-react";

interface DesignCardProps {
    imagePath: string;
    title: string;
    description: string;
    username: string;
    userTestimoni: string;
    githubUrl?: string;
    webUrl?: string;
    rating?: number;
    props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

export function DesignCard ({
    imagePath,
    title,
    description,
    username,
    userTestimoni,
    githubUrl,
    webUrl,
    rating,
    ...props
} : DesignCardProps) {
    const iconProps = {
        className: "size-full",
        color: "var(--color-zinc-100)",
        strokeWidth: 1.6
    }
    const buttonClassNames = "size-[18px] z-1 group-hover:-rotate-z-[15deg] pointer-events-none transition-transform duration-200 ease-out"

    return (
        <div className="p-4 shrink-0 w-full sm:w-100 rounded-2xl bg-zinc-800/50 backdrop-blur-lg border-2 border-amber-600/75 flex flex-col items-center justify-center gap-6 shadow-[0_0_15px_5px_white] shadow-amber-500/25" {...props}>
            <div className="z-10 group rounded-xl h-auto sm:h-60 w-full overflow-hidden flex items-center justify-center relative">
                <img 
                    src={imagePath}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <span className="w-full h-full overflow-hidden absolute top-0 left-0 bg-amber-900/50 backdrop-blur-xs backdrop-brightness-[80%] flex flex-col items-center justify-center gap-4 p-8 translate-y-[100%] opacity-[0] group-hover:translate-y-0 group-hover:opacity-[1] transition-all duration-500 ease-out">
                    <h1 className="roboto-medium text-xl text-zinc-100 leading-none">{title}</h1>
                    <p className="roboto-regular text-md text-zinc-100 text-wrap text-center truncate">{description}</p>
                </span>
            </div>
            <div className="z-10 flex flex-col items-center justify-center w-full gap-4">
                <div className="flex w-full items-start justify-start gap-4">
                    <span className="rounded-full p-3 bg-zinc-800 border-2 border-zinc-700/50 size-12 shrink-0">
                        <UserRound 
                            {...iconProps} 
                            color="var(--color-zinc-300)" 
                        />
                    </span>
                    <span className="flex grow overflow-hidden flex-col items-start justify-center gap-2 min-w-0">
                        <span className="w-full shrink-0 flex items-center justify-between gap-3">
                            <h2 className="roboto-medium text-md text-zinc-300 leading-none truncate">@{username}</h2>
                            <span className="h-[1px] grow bg-zinc-600 rounded-full"></span>
                            <span className="flex h-fit items-end justify-center gap-2">
                                <Rating 
                                    className="hidden sm:flex"
                                    value={rating || 0} 
                                />
                                <Star 
                                    className="size-4 inset-0 text-amber-500 block sm:hidden"
                                    fill="currentColor"
                                />
                                <p className="roboto-regular text-sm text-zinc-400 leading-none whitespace-nowrap">{rating?.toFixed(1) || 0} / 5.0</p>
                            </span>
                        </span>
                        <p className="roboto-regular text-md text-zinc-100 text-wrap truncate">{userTestimoni}</p>
                    </span>
                </div>
                {(githubUrl || webUrl) && (
                    <span className="w-full flex items-center justify-center gap-3">
                        <span className="h-[1px] grow bg-zinc-600 rounded-full"></span>
                        <span className="flex w-fit item-center justify-center gap-2">
                            {[
                                {
                                    icon: <Github {...iconProps} className={buttonClassNames} />,
                                    url: githubUrl,
                                    name: "GitHub"
                                },
                                {
                                    icon: <Link {...iconProps} className={buttonClassNames} />,
                                    url: webUrl,
                                    name: "Sumber"
                                }
                            ].map((button, index) => {
                                if (button.url) {
                                    return (
                                        <button 
                                            key={index}
                                            className="group relative overflow-hidden py-2 px-4 h-fit gap-2 bg-amber-700 border-2 border-amber-600/50 transition-colors duration-200 ease-out cursor-pointer shrink-0 rounded-full flex items-center justify-center"
                                            onClick={() => window.open(button.url, "_blank")}
                                        >
                                            {button.icon}
                                            <h3 className="z-1 roboto-regular text-md text-zinc-100 leading-none pointer-events-none">{button.name}</h3>
                                            <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-amber-600 to-transparent opacity-[0.25] group-hover:opacity-[0.75] transition-all duration-100 ease-out"></span>
                                        </button>
                                    )
                                }
                            })}
                        </span>
                    </span>
                )}
            </div>
        </div>
    )
}