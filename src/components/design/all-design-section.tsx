import { useState, useEffect } from "react";
import { DesignCard } from "../design-card";
import { Search, ChevronRight, ChevronLeft } from "lucide-react"
import type { ElementProps } from "../../props/element"
import { Div } from "../autorender/autorender";
import Dropdown from "../dropdown";
import DesignDataProps from "../data/designs.json"

export default function AllDesignSection (props?: ElementProps) {
    const [designCategories, setDesignCategories] = useState(["Semua", ...[...new Set(DesignDataProps.map(item => item.kategori))].sort()].map(item => {
        return {title: item, active: item === "Semua" ? true : false};
    }));
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>(""); 
    const maxInOnePage = 9;
    const [arrSlice, setArrSlice] = useState({
        from: 0,
        to: maxInOnePage
    });
    const [maxPage, setMaxPage] = useState(Math.ceil(DesignDataProps.length / maxInOnePage) || 1);
    const [currentPage, setCurrentPage] = useState(1);
    let typingTimeout: ReturnType<typeof setTimeout>;

    const setCategoryState = (index: number) => {
        setDesignCategories(prev =>
            prev.map((item, i) => ({
                ...item,
                active: i === index
            }))
        );
        setArrSlice({
            from: 0,
            to: maxInOnePage
        });
        setCurrentPage(1);
    }

    const getActiveState = () => {
        return designCategories.find(item => item.active)?.title || "Semua";
    }

    const searchByKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        clearTimeout(typingTimeout);

        typingTimeout = setTimeout(() => {
            setSearchKeyword(value);
            setArrSlice({
                from: 0,
                to: maxInOnePage
            });
            setCurrentPage(1);
        }, 500);
    };

    const activeCategory = getActiveState();

    let filteredDesigns = DesignDataProps.filter(designData => {
        const matchCategory = activeCategory === "Semua" || designData.kategori === activeCategory;
        const matchKeyword = searchKeyword === "" || designData.title.toLowerCase().includes(searchKeyword.toLowerCase()) || designData.description.toLowerCase().includes(searchKeyword.toLowerCase());

        return matchCategory && matchKeyword;
    });

    if (sortOption === "desc") filteredDesigns = [...filteredDesigns].sort((a, b) => b.rating - a.rating);
    else if (sortOption === "asc") filteredDesigns = [...filteredDesigns].sort((a, b) => a.rating - b.rating);
    else if (sortOption === "A-to-z") filteredDesigns = [...filteredDesigns].sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOption === "z-to-A") filteredDesigns = [...filteredDesigns].sort((a, b) => b.title.localeCompare(a.title));

    useEffect(() => {
        setMaxPage(Math.ceil(filteredDesigns.length / maxInOnePage) || 1);
    }, [filteredDesigns])

    const changePage = (direction: "prev" | "next") => {
        if (direction === "next") {
            setCurrentPage(prev => prev + 1);
            setArrSlice(prev => {
                const nextTo = prev.to + maxInOnePage;

                return {
                    from: prev.from + maxInOnePage,
                    to: nextTo < filteredDesigns.length ? nextTo : filteredDesigns.length
                }
            })
        }
        else {
            setCurrentPage(prev => prev - 1);
            setArrSlice(prev => {
                const prevTo = prev.to - maxInOnePage;
                const prevToMod = prev.to % maxInOnePage;

                return {
                    from: prev.from - maxInOnePage,
                    to: prevTo > 0 && prevTo < filteredDesigns.length ? (prevToMod === 0 ? prevTo : prev.to - prevToMod) : filteredDesigns.length
                }
            })
        }
    }

    const paginationIconProps = {
        color: "var(--color-zinc-100)",
        className: "size-full pointer-events-none",
        strokeWidth: 1.6
    }

    return (
        <section
            className="relative w-screen grow overflow-hidden flex flex-col items-center justify-center"
            {...props}
        >
            <div className="z-10 flex items-center justify-center overflow-hidden w-full px-8 py-5 bg-zinc-900 border-b-2 border-t-2 border-zinc-800/50">
                <Div 
                    className="w-full h-full flex items-center justify-center" 
                    style={{ width: "100%", height: "100%" }}
                >
                    <div className="gap-6 flex flex-col lg:flex-row items-center justify-between max-w-[1400px] w-full">
                        <span className="max-w-100 lg:max-w-60 xl:max-w-100 w-full h-12 px-4 rounded-lg overflow-hidden bg-zinc-800 border-2 border-zinc-700/50 flex items-center justify-start gap-2">
                            <Search 
                                color="var(--color-zinc-200)"
                                className="size-5 shrink-0"
                            />
                            <input 
                                type="text"
                                className="grow h-full outline-none roboto-regular text-md text-zinc-100 flex items-center justify-center leading-none" 
                                placeholder="Cari desain"
                                onChange={searchByKeyword}
                            ></input>
                        </span>
                        <span className="flex flex-col lg:flex-row items-center justify-end gap-6 h-full w-full lg:grow max-w-full overflow-hidden">
                            <span className="flex items-center justify-center gap-3 h-full flex-wrap">
                                {designCategories.map((category, index) => {
                                    return (
                                        <button 
                                            key={index}
                                            className={`group relative overflow-hidden shrink-0 px-5 py-3 rounded-full flex items-center justify-center ${category.active ? "bg-amber-700" : "bg-zinc-800"} cursor-pointer`}
                                            onClick={() => {if (!category.active) setCategoryState(index)}}
                                        >
                                            <p className="z-1 roboto-regular text-md text-zinc-100 leading-none pointer-events-none">{category.title}</p>
                                            <span className={`w-full h-full top-0 left-0 absolute bg-gradient-to-b ${category.active ? "from-amber-600" : "from-zinc-700"} to-transparent opacity-[0.25] group-hover:opacity-[0.75] transition-all duration-100 ease-out`}></span>
                                        </button>
                                    )
                                })}
                            </span>
                            <Dropdown 
                                dropdown={[
                                    {
                                        title: "Rating tertinggi",
                                        callback: () => setSortOption("desc")
                                    },
                                    {
                                        title: "Rating terendah",
                                        callback: () => setSortOption("asc")
                                    },
                                    {
                                        title: "Nama A-z",
                                        callback: () => setSortOption("A-to-z")
                                    },
                                    {
                                        title: "Nama z-A",
                                        callback: () => setSortOption("z-to-A")
                                    }
                                ]}
                            />
                        </span>
                    </div>
                </Div>
            </div>
            <div className="w-screen grow flex items-center justify-center">
                {filteredDesigns.length > 0 ? (
                    <Div className="w-full max-w-[1400px] h-fit min-h-80 flex flex-col items-center justify-center gap-12 px-8 md:px-12 pb-18 pt-16">
                        <div className="w-full h-full flex flex-wrap items-center justify-center gap-8 overflow-hidden">
                            {filteredDesigns.slice(arrSlice.from, arrSlice.to).map((designData, index) => (
                                    <DesignCard key={index} {...designData} />
                            ))}
                        </div>
                        <div className="w-fit h-fit flex items-center justify-center gap-4">
                            <button 
                                className={`group relative overflow-hidden shrink-0 size-[42px] p-[8px] rounded-full flex items-center justify-center bg-amber-700 ${arrSlice.from !== 0 ? "opacity-[1]" : "opacity-[0.5] pointer-events-none"} cursor-pointer`}
                                onClick={() => changePage("prev")}
                            >
                                <ChevronLeft {...paginationIconProps} />
                                <span className={`w-full h-full top-0 left-0 absolute bg-gradient-to-b from-amber-600 to-transparent opacity-[0.25] group-hover:opacity-[0.75] transition-all duration-100 ease-out`}></span>
                            </button>
                            <p className="roboto-regular text-md text-center text-zinc-200 leading-none">Page {currentPage} of {maxPage}</p>
                            <button 
                                className={`group relative overflow-hidden shrink-0 size-[42px] p-[8px] rounded-full flex items-center justify-center bg-amber-700 ${arrSlice.to < filteredDesigns.length ? "opacity-[1]" : "opacity-[0.5] pointer-events-none"} cursor-pointer`}
                                onClick={() => changePage("next")}
                            >
                                <ChevronRight {...paginationIconProps} />
                                <span className={`w-full h-full top-0 left-0 absolute bg-gradient-to-b from-amber-600 to-transparent opacity-[0.25] group-hover:opacity-[0.75] transition-all duration-100 ease-out`}></span>
                            </button>
                        </div>
                    </Div>
                ) : (
                    <Div className="flex w-fit h-fit items-center justify-center">
                        <p className="text-center text-zinc-400 text-lg roboto-regular">Tidak ada hasil yang ditermukan</p>
                    </Div>
                )}
            </div>
        </section>
    )
}