import { CSSProperties } from "react";
declare type TableConfig = {
    table: {
        style: CSSProperties;
    };
    row: {
        sticky: {
            style: CSSProperties;
        };
        scrolling: {
            style: CSSProperties;
        };
    };
    cells: {
        sticky: {
            style: CSSProperties;
        }[];
        scrolling: {
            style: CSSProperties;
        }[];
    };
};
declare type ColumnConfig = {
    width: string;
    isSticky: boolean;
};
export declare type Config = {
    columns: ColumnConfig[];
};
export declare const useStickyTable: (config: Config) => TableConfig;
export {};
