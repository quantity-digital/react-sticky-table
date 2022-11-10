import {
  DataTable,
  HeaderComponent,
  RowComponent,
  TableColumn,
} from "react-sticky-table/dist/esm/DataTable";

const createRange = (length: number) => {
  return Array.from(Array(length).keys());
};

/** The data for a row */
type Row = {
  rowId: string;
};


type Column = {
  title: string;
}

const MyHeaderComponent: HeaderComponent<Column> = ({ columns, style }) => (
  <div style={style}>
    {columns.map(({ props, config, data: {title} }) => (
      <div
        {...props}
        style={{
          ...props.style,
          backgroundColor: config.isSticky ? "#bada55" : "#fff",
        }}
      >
        {title}
      </div>
    ))}
  </div>
);

const MyRowComponent: RowComponent<Row, Column> = ({ row, style, columns }) => (
  <div style={style}>
    {columns.map(({ props, config, data: { title } }) => (
      <div
        {...props}
        style={{
          ...props.style,
          backgroundColor: config.isSticky ? "#bada55" : "none",
        }}
      >
        {props.key}
      </div>
    ))}
  </div>
);

export function ComponentDemo() {
  const columns: TableColumn<Column>[] = createRange(30).map((num) => ({
    config: {
      isSticky: num === 1,
      width: "200px",
    },
    data: {
      title: `Column ${num} header`
    }
  }));

  const rows: Row[] = createRange(100).map((num) => ({
    rowId: `This is row #${num+1}`
  }));

  return (
    <div className="App">
      <DataTable
        style={{ height: "500px" }}
        columns={columns}
        headerComponent={MyHeaderComponent}
        rowComponent={MyRowComponent}
        rows={rows}
      />
    </div>
  );
}
