import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
;
const getGridTemplateColumns = ({ columns, }) => columns.map((column) => column.config.width).join(" ");
const getTotalWidth = ({ columns }) => [columns]
    .map((columns) => columns.map((column) => column.config.width))
    .map((columns) => columns.join(" + "))
    .map((calcString) => `calc(${calcString})`)
    .join();
const DataTableRow = ({ row, columns, rowComponent, totalWidth, rowIndex, }) => {
    const style = {
        display: "grid",
        gridTemplateColumns: getGridTemplateColumns({ columns }),
        width: totalWidth,
    };
    const tableCellColumns = columns.map((column, i) => (Object.assign(Object.assign({}, column), { props: {
            key: `col-${i}-row-${rowIndex}`,
            style: Object.assign({}, (column.config.isSticky
                ? {
                    position: "sticky",
                    zIndex: 1,
                    left: 0,
                }
                : {})),
        } })));
    return rowComponent({ columns: tableCellColumns, row, style });
};
const DataTableHeaderRow = ({ columns, headerRowComponent, totalWidth, }) => {
    const style = {
        display: "grid",
        position: "sticky",
        top: 0,
        gridTemplateColumns: getGridTemplateColumns({ columns }),
        width: totalWidth,
        zIndex: 2,
    };
    const tableCellColumns = columns.map((column, i) => (Object.assign(Object.assign({}, column), { props: {
            key: `header-${i}`,
            style: Object.assign({}, (column.config.isSticky
                ? {
                    position: "sticky",
                    zIndex: 1,
                    left: 0,
                    top: 0,
                }
                : {})),
        } })));
    return headerRowComponent({ columns: tableCellColumns, style });
};
export const DataTable = ({ rows, columns, style = {}, headerComponent, rowComponent, className, }) => {
    const totalRowWidth = getTotalWidth({ columns });
    const Rows = rows.map((row, i) => (_jsx(DataTableRow, { rowIndex: i, row: row, columns: columns, rowComponent: rowComponent, totalWidth: totalRowWidth }, `row-${i}`)));
    const Header = (_jsx(DataTableHeaderRow, { columns: columns, headerRowComponent: headerComponent, totalWidth: totalRowWidth }));
    return (_jsxs("div", Object.assign({ className: `${className !== null && className !== void 0 ? className : ""}`, style: Object.assign(Object.assign({}, style), { overflow: "auto" }) }, { children: [Header, Rows] })));
};
