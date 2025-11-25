import { Crown, BadgeCheck } from "lucide-react";
import { type NavigateFunction } from "react-router-dom";
import priceList from "./data/pricelist.json";

interface PriceListProps {
    navigate: NavigateFunction;
    callbacks?: (() => void)[]
}

export function getPriceList ({
    navigate,
    callbacks = [
        () => navigate("/order"),
        () => navigate("/order"),
        () => navigate("/order")
    ]
} : PriceListProps) {
    const tagIconProps = {
        className: "size-[18px] z-1",
        strokeWidth: 1.6,
        color: "var(--color-zinc-100)",
    };

    return priceList.map((item, index) => ({
        ...item,
        icon: index === 0 ? <Crown {...tagIconProps} /> : index === 1 ? <BadgeCheck {...tagIconProps} /> : null,
        callback: callbacks[index] ? callbacks[index] : () => {}
    }))
}