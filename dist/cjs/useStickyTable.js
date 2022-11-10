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
exports.useStickyTable = void 0;
var useStickyTable = function (config) {
    var totalWidth = getTotalWidth({ columns: config.columns });
    var tableStyles = {
        overflow: "scroll",
    };
    var rowStylesScrolling = {
        display: "grid",
        gridTemplateColumns: getGridTemplateColumns({ columns: config.columns }),
        width: totalWidth,
    };
    var cellStylesScrolling = config.columns.map(function (column) { return ({
        style: __assign({}, (column.isSticky
            ? {
                position: "sticky",
                zIndex: 1,
                left: 0,
            }
            : {})),
    }); });
    var rowStylesSticky = {
        display: "grid",
        position: "sticky",
        top: 0,
        gridTemplateColumns: getGridTemplateColumns({ columns: config.columns }),
        width: totalWidth,
        zIndex: 2,
    };
    var cellStylesSticky = config.columns.map(function (column) { return ({
        style: __assign({}, (column.isSticky
            ? {
                position: "sticky",
                zIndex: 1,
                left: 0,
                top: 0,
            }
            : {})),
    }); });
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
exports.useStickyTable = useStickyTable;
var getTotalWidth = function (_a) {
    var columns = _a.columns;
    return [columns]
        .map(function (columns) { return columns.map(function (column) { return column.width; }); })
        .map(function (columns) { return columns.join(" + "); })
        .map(function (calcString) { return "calc(".concat(calcString, ")"); })
        .join();
};
var getGridTemplateColumns = function (_a) {
    var columns = _a.columns;
    return columns.map(function (column) { return column.width; }).join(" ");
};
