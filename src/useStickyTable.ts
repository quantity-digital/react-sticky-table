import { CSSProperties } from "react";

type TableConfig = {
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

type ColumnConfig = { width: string; isSticky: boolean };

export type Config = {
  columns: ColumnConfig[];
};

export const useStickyTable = (config: Config): TableConfig => {
  const totalWidth = getTotalWidth({ columns: config.columns });

  const tableStyles: CSSProperties = {
    overflow: "scroll",
  };

  // Possible optimization: Use CSS vars instead of inlining styles on each row
  const rowStylesScrolling: CSSProperties = {
    display: "grid",
    gridTemplateColumns: getGridTemplateColumns({ columns: config.columns }),
    width: totalWidth,
  };

  const cellStylesScrolling = config.columns.map((column) => ({
    style: {
      ...(column.isSticky
        ? {
            position: "sticky",
            zIndex: 1,
            left: 0,
          }
        : {}),
    } as CSSProperties,
  }));

  // Possible optimization: Use CSS vars instead of inlining styles on each row
  const rowStylesSticky: CSSProperties = {
    display: "grid",
    position: "sticky",
    top: 0,
    gridTemplateColumns: getGridTemplateColumns({ columns: config.columns }),
    width: totalWidth,
    zIndex: 2,
  };

  const cellStylesSticky = config.columns.map((column) => ({
    style: {
      ...(column.isSticky
        ? {
            position: "sticky",
            zIndex: 1,
            left: 0,
            top: 0,
          }
        : {}),
    } as CSSProperties,
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

// Get the total width of all the columns to get the correct scroll values
const getTotalWidth = ({ columns }: { columns: ColumnConfig[] }): string =>
  // Laymans Functor
  [columns]
    // Get the width of each column
    .map((columns) => columns.map((column) => column.width))
    // Make a string that sums each value
    .map((columns) => columns.join(" + "))
    // Wrap in a calc() wrapper
    .map((calcString) => `calc(${calcString})`)
    // Back to a string again
    .join();

// Get the template-columns value for each table row
const getGridTemplateColumns = ({
  columns,
}: {
  columns: ColumnConfig[];
}): string => columns.map((column) => column.width).join(" ");
