import { Fragment, useState } from "react";
import { useStickyTable } from "react-sticky-table";

export function HookDemo() {
  const columns = [
    {
      title: "Brødtype",
      config: {
        isSticky: true,
        width: "300px",
      },
    },
    {
      title: "Mandag",
      config: {
        isSticky: false,
        width: "120px",
      },
    },
    {
      title: "Tirsdag",
      config: {
        isSticky: false,
        width: "120px",
      },
    },
    {
      title: "Onsdag",
      config: {
        isSticky: false,
        width: "120px",
      },
    },
    {
      title: "Torsdag",
      config: {
        isSticky: false,
        width: "120px",
      },
    },
    {
      title: "Fredag",
      config: {
        isSticky: false,
        width: "120px",
      },
    },
    {
      title: "Lørdag",
      config: {
        isSticky: false,
        width: "120px",
      },
    },
    {
      title: "Søndag",
      config: {
        isSticky: false,
        width: "120px",
      },
    },
  ];

  const tableConfig = useStickyTable({
    columns: columns.map(({ config }) => config),
  });

  const [rows, setRows] = useState<string[][]>([
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rundstykker", "0", "0", "0", "0", "0", "0", "0"],
    ["Franskbrød", "0", "0", "0", "0", "0", "0", "0"],
    ["Rugbrød", "0", "0", "0", "0", "0", "0", "0"],
  ]);

  const setValue = (row: number, colNum: number, value: string) => {
    const newRows = [...rows];
    const newRow = [...newRows[row]];

    newRow[colNum] = value;

    newRows[row] = newRow;

    setRows(newRows);
  };

  return (
    <div className="App">
      <h1>The Table</h1>
      <div
        style={{
          height: "500px",
          ...tableConfig.table.style,
        }}
      >
        <div style={tableConfig.row.sticky.style}>
          {columns.map(({ title }, colNum) => (
            <div
              style={{
                backgroundColor: "#bada55",
                ...tableConfig.cells.sticky[colNum].style,
              }}
            >
              {title}
            </div>
          ))}
        </div>
        {rows.map((cells, rowNum) => (
          <div
            style={
              rowNum === 4 ? tableConfig.row.sticky.style : tableConfig.row.scrolling.style
            }
          >
            {cells.map((value, colNum) => (
              <Fragment key={colNum}>
                {colNum === 0 && (
                  <div
                    style={{
                      backgroundColor: "#bada55",
                      ...tableConfig.cells.scrolling[colNum].style,
                    }}
                  >
                    {value}
                  </div>
                )}
                {colNum > 0 && (
                  <div style={tableConfig.cells.scrolling[colNum].style}>
                    <input
                      value={value}
                      onChange={(e) => setValue(rowNum, colNum, e.target.value)}
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
