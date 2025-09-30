import { Crown, BadgeCheck } from "lucide-react";
import { type NavigateFunction } from "react-router-dom";

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

    return (
        [
            {
                title: "Bisnis Kecil",
                price: 1500000,
                discount: 1250000,
                features: [
                    "Desain modern, sederhana, dan ringan",
                    "SEO optimal untuk visibilitas Google",
                    "Responsif di semua perangkat",
                    "Integrasi kontak & media sosial",
                ],
                tag: "Terlaris",
                icon: <Crown {...tagIconProps} />,
                description:
                    "Website sederhana berskala kecil, cocok untuk bisnis kecil, freelancer, dan individu yang ingin go digital.",
                callback: callbacks[0] ? callbacks[0] : () => {},
            },
            {
                title: "Bisnis Menengah",
                price: 3750000,
                discount: 3200000,
                features: [
                    "Desain profesional dengan kustomisasi",
                    "SEO lanjutan & optimasi kecepatan",
                    "Integrasi form, blog, & galeri",
                    "Analitik & laporan performa dasar",
                ],
                tag: "Terbaik",
                icon: <BadgeCheck {...tagIconProps} />,
                description:
                    "Solusi bisnis menengah yang ingin tampil lebih profesional dan memperluas jangkauan pasar melalui digitalisasi.",
                callback: callbacks[1] ? callbacks[1] : () => {},
            },
            {
                title: "Bisnis Profesional",
                price: 7200000,
                discount: 6500000,
                features: [
                    "Desain premium dengan kustomisasi penuh",
                    "SEO advanced & integrasi marketing tools",
                    "Fitur e-commerce lengkap",
                    "Keamanan tingkat lanjut & backup rutin",
                ],
                description:
                    "Website berskala besar untuk bisnis profesional yang mengutamakan keamanan tinggi dan kendali penuh.",
                callback: callbacks[2] ? callbacks[2] : () => {},
            },
        ]
    )
}