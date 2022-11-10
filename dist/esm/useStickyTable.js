export const useStickyTable = (config) => {
    const totalWidth = getTotalWidth({ columns: config.columns });
    const tableStyles = {
        overflow: "scroll",
    };
    const rowStylesScrolling = {
        display: "grid",
        gridTemplateColumns: getGridTemplateColumns({ columns: config.columns }),
        width: totalWidth,
    };
    const cellStylesScrolling = config.columns.map((column) => ({
        style: Object.assign({}, (column.isSticky
            ? {
                position: "sticky",
                zIndex: 1,
                left: 0,
            }
            : {})),
    }));
    const rowStylesSticky = {
        display: "grid",
        position: "sticky",
        top: 0,
        gridTemplateColumns: getGridTemplateColumns({ columns: config.columns }),
        width: totalWidth,
        zIndex: 2,
    };
    const cellStylesSticky = config.columns.map((column) => ({
        style: Object.assign({}, (column.isSticky
            ? {
                position: "sticky",
                zIndex: 1,
                left: 0,
                top: 0,
            }
            : {})),
    }));
    return {
        table: {
            style: tableStyles,
        },
        row: {
            sticky: {
                style: rowStylesSticky,
            },
            scrolling: {
                style: rowStylesScrolling,
            },
        },
        cells: {
            sticky: cellStylesSticky,
            scrolling: cellStylesScrolling,
        },
    };
};
const getTotalWidth = ({ columns }) => [columns]
    .map((columns) => columns.map((column) => column.width))
    .map((columns) => columns.join(" + "))
    .map((calcString) => `calc(${calcString})`)
    .join();
const getGridTemplateColumns = ({ columns, }) => columns.map((column) => column.width).join(" ");
