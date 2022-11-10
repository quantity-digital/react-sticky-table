import { CSSProperties } from "react";
export interface TableColumn<T> {
    data: T;
    config: {
        width: string;
        isSticky: boolean;
    };
}
export declare type HeaderComponent<T> = (props: {
    columns: TableCellColumn<T>[];
    style: CSSProperties;
}) => JSX.Element;
export declare type RowComponent<T, U> = (props: {
    row: T;
    columns: TableCellColumn<U>[];
    style: CSSProperties;
}) => JSX.Element;
interface TableCellColumn<T> extends TableColumn<T> {
    props: {
        style: CSSProperties;
        key: string;
    };
}
interface Props<T, U> {
    rows: T[];
    columns: TableColumn<U>[];
    style?: CSSProperties;
    headerComponent: HeaderComponent<U>;
    rowComponent: RowComponent<T, U>;
    className?: string;
}
export declare const DataTable: <T extends unknown, U extends unknown>({ rows, columns, style, headerComponent, rowComponent, className, }: Props<T, U>) => JSX.Element;
export {};
