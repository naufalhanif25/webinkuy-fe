import { ArrowUp } from "lucide-react"
import { motion } from "framer-motion";

export default function BackToTop () {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <motion.div 
            className="z-100 group fixed overflow-hidden cursor-pointer right-4 bottom-4 p-2 size-[45px] rounded-full bg-amber-700 flex items-center justify-center border-2 border-amber-600/50 hover:-translate-y-1 active:-translate-y-0 transition-all ease-out duration-200 shadow-[0_0_10px_5px_white] shadow-amber-500/15 hover:shadow-[0_0_15px_5px_white] hover:shadow-amber-500/25"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0 }}
            onClick={scrollToTop}
        >
            <ArrowUp 
                color="var(--color-zinc-100)"
                className="z-1 size-full active:translate-y-[2px] transition-transform duration-200 ease-out"
                strokeWidth={1.6}
            />
            <span className="absolute w-full h-full left-0 top-0 bg-gradient-to-b from-amber-600/75 to-amber-600/25"></span>
        </motion.div>
    )
}