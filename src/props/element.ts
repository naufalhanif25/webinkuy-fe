import type { CSSProperties } from "react";

export interface ElementProps {
    style?: CSSProperties;
    onClick?: () => void;
}