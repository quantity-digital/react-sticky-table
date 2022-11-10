"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
;
var getGridTemplateColumns = function (_a) {
    var columns = _a.columns;
    return columns.map(function (column) { return column.config.width; }).join(" ");
};
var getTotalWidth = function (_a) {
    var columns = _a.columns;
    return [columns]
        .map(function (columns) { return columns.map(function (column) { return column.config.width; }); })
        .map(function (columns) { return columns.join(" + "); })
        .map(function (calcString) { return "calc(".concat(calcString, ")"); })
        .join();
};
var DataTableRow = function (_a) {
    var row = _a.row, columns = _a.columns, rowComponent = _a.rowComponent, totalWidth = _a.totalWidth, rowIndex = _a.rowIndex;
    var style = {
        display: "grid",
        gridTemplateColumns: getGridTemplateColumns({ columns: columns }),
        width: totalWidth,
    };
    var tableCellColumns = columns.map(function (column, i) { return (__assign(__assign({}, column), { props: {
            key: "col-".concat(i, "-row-").concat(rowIndex),
            style: __assign({}, (column.config.isSticky
                ? {
                    position: "sticky",
                    zIndex: 1,
                    left: 0,
                }
                : {})),
        } })); });
    return rowComponent({ columns: tableCellColumns, row: row, style: style });
};
var DataTableHeaderRow = function (_a) {
    var columns = _a.columns, headerRowComponent = _a.headerRowComponent, totalWidth = _a.totalWidth;
    var style = {
        display: "grid",
        position: "sticky",
        top: 0,
        gridTemplateColumns: getGridTemplateColumns({ columns: columns }),
        width: totalWidth,
        zIndex: 2,
    };
    var tableCellColumns = columns.map(function (column, i) { return (__assign(__assign({}, column), { props: {
            key: "header-".concat(i),
            style: __assign({}, (column.config.isSticky
                ? {
                    position: "sticky",
                    zIndex: 1,
                    left: 0,
                    top: 0,
                }
                : {})),
        } })); });
    return headerRowComponent({ columns: tableCellColumns, style: style });
};
var DataTable = function (_a) {
    var rows = _a.rows, columns = _a.columns, _b = _a.style, style = _b === void 0 ? {} : _b, headerComponent = _a.headerComponent, rowComponent = _a.rowComponent, className = _a.className;
    var totalRowWidth = getTotalWidth({ columns: columns });
    var Rows = rows.map(function (row, i) { return ((0, jsx_runtime_1.jsx)(DataTableRow, { rowIndex: i, row: row, columns: columns, rowComponent: rowComponent, totalWidth: totalRowWidth }, "row-".concat(i))); });
    var Header = ((0, jsx_runtime_1.jsx)(DataTableHeaderRow, { columns: columns, headerRowComponent: headerComponent, totalWidth: totalRowWidth }));
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "".concat(className !== null && className !== void 0 ? className : ""), style: __assign(__assign({}, style), { overflow: "auto" }) }, { children: [Header, Rows] })));
};
exports.DataTable = DataTable;
