import { useState, useEffect, forwardRef, type RefObject } from "react";

interface PixelBackgroundProps {
    boxSize?: number;
    props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const PixelBackground = forwardRef<HTMLElement, PixelBackgroundProps>(({boxSize = 36, props}, ref) => {
    const gridDefaultSize = boxSize;
    const [gridRowsCols, setGridRowsCols] = useState({
        cols: 0,
        rows: 0,
    });
    const [totalRowsCols, setTotalRowsCols] = useState(0);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    useEffect(() => {
        const updateGridRowsCols = () => {
            const heroSectionElement = (ref as RefObject<HTMLElement>).current;
    
            if (heroSectionElement) {
                const newCols = Math.ceil(
                    heroSectionElement.clientWidth / gridDefaultSize
                );
                const newRows = Math.ceil(
                    heroSectionElement.clientHeight / gridDefaultSize
                );
    
                setGridRowsCols({
                    cols: newCols,
                    rows: newRows,
                });
                setTotalRowsCols(newCols * newRows);
            }
        };
    
        updateGridRowsCols();
    
        window.addEventListener("resize", updateGridRowsCols);
    
        return () => window.removeEventListener("resize", updateGridRowsCols);
    }, [ref, gridDefaultSize]);
    
    const isNeighbor = (index: number, hoverIndex: number, layer: number) => {
        const { cols } = gridRowsCols;
        const row = Math.floor(index / cols);
        const col = index % cols;
        const hoverRow = Math.floor(hoverIndex / cols);
        const hoverCol = hoverIndex % cols;
    
        const dr = Math.abs(row - hoverRow);
        const dc = Math.abs(col - hoverCol);
    
        if (layer == 1) return (dr <= 0 && dc <= 1) || (dr <= 1 && dc <= 0);
        else if (layer == 2) return (dr == 1 && dc == 1) || (dr == 1 && dc == 1);
        else if (layer == 3) return (dr <= 0 && dc == 2) || (dr == 2 && dc <= 0);
    };

    return (
        <div
            className="z-5 absolute w-full h-full top-0 left-0 grid"
            style={{
                gridTemplateColumns: `repeat(${gridRowsCols.cols}, ${gridDefaultSize}px)`,
                gridTemplateRows: `repeat(${gridRowsCols.rows}, ${gridDefaultSize}px)`,
            }}
            {...props}
        >
            {Array.from({ length: totalRowsCols }).map((_, index) => {
                let bgClass = "bg-amber-500/0";
                let bgDelay = "delay-0";
                let shadow = "shadow-[0_0_10px_5px_white] shadow-amber-500/0"

                if (hoverIndex !== null) {
                    if (hoverIndex === index) {
                        bgClass = "bg-amber-600/45";
                        bgDelay = "delay-25"; 
                        shadow = "shadow-[0_0_15px_0px_white] shadow-amber-600/30"
                    }
                    else if (isNeighbor(index, hoverIndex, 1)) {
                        bgClass = "bg-amber-600/20";
                        bgDelay = "delay-150";
                        shadow = "shadow-[0_0_15px_0px_white] shadow-amber-600/20"
                    }
                    else if (isNeighbor(index, hoverIndex, 2)) {
                        bgClass = "bg-amber-600/10";
                        bgDelay = "delay-50";
                        shadow = "shadow-[0_0_15px_0px_white] shadow-amber-600/10"
                    }
                    else if (isNeighbor(index, hoverIndex, 3)) {
                        bgClass = "bg-amber-600/10";
                        bgDelay = "delay-300";
                        shadow = "shadow-[0_0_15px_0px_white] shadow-amber-600/10"
                    }
                }

                return (
                    <span
                        key={index}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        className={`border border-amber-500/10 transition-all duration-200 ease-out ${bgClass} ${bgDelay} ${shadow}`}
                    />
                );
            })}
        </div>
    )
});

export default PixelBackground;