import { CSSProperties } from "react";

// --- Types ---

/** The table column definition */
export interface TableColumn<T> {
	data: T;
	config: {
		width: string;
		isSticky: boolean;
	};
}

export type HeaderComponent<T> = (props: {
  columns: TableCellColumn<T>[];
  style: CSSProperties;
}) => JSX.Element;

export type RowComponent<T, U> = (props: {
  row: T;
  columns: TableCellColumn<U>[];
  style: CSSProperties;
}) => JSX.Element;

// For the row render-component we supply styles to be applied to each cell for correct sticky behavior
interface TableCellColumn<T> extends TableColumn<T> {
  props: { style: CSSProperties; key: string };
};

// --- Utility functions ---

// Get the template-columns value for each table row
const getGridTemplateColumns = <T extends any>({
  columns,
}: {
  columns: TableColumn<T>[];
}): string => columns.map((column) => column.config.width).join(" ");

// Get the total width of all the columns to get the correct scroll values
const getTotalWidth = <T extends any>({ columns }: { columns: TableColumn<T>[] }): string =>
  // Laymans Functor
  [columns]
    // Get the width of each column
    .map((columns) => columns.map((column) => column.config.width))
    // Make a string that sums each value
    .map((columns) => columns.join(" + "))
    // Wrap in a calc() wrapper
    .map((calcString) => `calc(${calcString})`)
    // Back to a string again
    .join();

// --- Sub-components ---

// Render each row with the supplied component with calculated styles
const DataTableRow = <T extends any, U extends any>({
  row,
  columns,
  rowComponent,
  totalWidth,
  rowIndex,
}: {
  row: T;
  columns: TableColumn<U>[];
  rowComponent: RowComponent<T, U>;
  totalWidth: string;
  rowIndex: number;
}) => {
  // Possible optimization: Use CSS vars instead of inlining styles on each row
  const style: CSSProperties = {
    display: "grid",
    gridTemplateColumns: getGridTemplateColumns({ columns }),
    width: totalWidth,
  };

  // We add pre-computed styles here for the table cells
  const tableCellColumns: TableCellColumn<U>[] = columns.map((column, i) => ({
    ...column,
    props: {
      key: `col-${i}-row-${rowIndex}`,
      style: {
        ...(column.config.isSticky
          ? {
              position: "sticky",
              zIndex: 1,
              left: 0,
            }
          : {}),
      },
    },
  }));

  return rowComponent({ columns: tableCellColumns, row, style });
};

// Render the table header with the supplied header component with calculated styles
const DataTableHeaderRow =  <T extends any>({
  columns,
  headerRowComponent,
  totalWidth,
}: {
  columns: TableColumn<T>[];
  headerRowComponent: HeaderComponent<T>;
  totalWidth: string;
}) => {
  // Possible optimization: Use CSS vars instead of inlining styles on each row
  const style: CSSProperties = {
    display: "grid",
    position: "sticky",
    top: 0,
    gridTemplateColumns: getGridTemplateColumns({ columns }),
    width: totalWidth,
    zIndex: 2,
  };

  // We add pre-computed styles here for the table cells
  const tableCellColumns: TableCellColumn<T>[] = columns.map((column, i) => ({
    ...column,
    props: {
      key: `header-${i}`,
      style: {
        ...(column.config.isSticky
          ? {
              position: "sticky",
              zIndex: 1,
              left: 0,
              top: 0,
            }
          : {}),
      },
    },
  }));

  return headerRowComponent({ columns: tableCellColumns, style });
};

interface Props<T, U> {
  rows: T[];
  columns: TableColumn<U>[];
  style?: CSSProperties;
  headerComponent: HeaderComponent<U>;
  rowComponent: RowComponent<T, U>;
  className?: string;
}

export const DataTable = <T extends any, U extends any>({
  rows,
  columns,
  style = {},
  headerComponent,
  rowComponent,
  className,
}: Props<T, U>) => {
  const totalRowWidth = getTotalWidth({ columns });

  // Render the rows with the supplied (render prop) row component
  const Rows = rows.map((row, i) => (
    <DataTableRow
      rowIndex={i}
      row={row}
      columns={columns}
      rowComponent={rowComponent}
      totalWidth={totalRowWidth}
      key={`row-${i}`}
    />
  ));

  // Render the header with the supplied (render prop) header component
  const Header = (
    <DataTableHeaderRow
      columns={columns}
      headerRowComponent={headerComponent}
      totalWidth={totalRowWidth}
    />
  );

  return (
    <div
      className={`${className ?? ""}`}
      style={{ ...style, overflow: "auto" }}
    >
      {Header}
      {Rows}
    </div>
  );
};
